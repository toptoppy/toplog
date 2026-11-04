package com.app

import com.app.api.dto.*
import com.app.config.AppConfig
import com.app.domain.model.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class ApiIntegrationTest {

    companion object {
        @BeforeAll
        @JvmStatic
        fun setupDb() {
            Database.connect(
                url = "jdbc:h2:mem:api_integration_test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
                driver = "org.h2.Driver"
            )
            transaction {
                SchemaUtils.create(
                    Users,
                    Blogs,
                    Posts,
                    PostVariants,
                    Tags,
                    PostTags,
                    MediaTable,
                    Webhooks,
                    WebhookDeliveries,
                    Subscribers,
                    Newsletters,
                    PageViews,
                    BlogMembers,
                    BlogInvites,
                    Comments,
                    PostRevisions
                )
            }
        }
    }

    private fun createTestConfig(tempDir: File): AppConfig {
        return AppConfig(
            dbUrl = "jdbc:h2:mem:api_integration_test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
            dbUser = "sa",
            dbPass = "",
            dbPoolSize = 5,
            jwtSecret = "very-secure-test-secret-key-32-chars-long",
            jwtIssuer = "blogs-backend-test",
            jwtAudience = "blogs-console-test",
            jwtRealm = "BlogsTest",
            jwtExpirationMs = 3600000L,
            uploadsDir = tempDir.absolutePath,
            baseDomain = "localhost",
            aiApiKey = null,
            aiBaseUrl = "https://openrouter.ai/api/v1",
            aiModel = "google/gemini-2.0-flash-001"
        )
    }

    @Test
    fun testAuthenticationWorkflow(@TempDir tempDir: File) = testApplication {
        val testConfig = createTestConfig(tempDir)
        application {
            configureApp(testConfig, initDb = false, startScheduler = false)
        }

        val client = createClient {
            install(ContentNegotiation) {
                json(Json { ignoreUnknownKeys = true })
            }
        }

        // 1. Register new user
        val registerResponse = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody(RegisterRequest("alice@toppy.dev", "password123", "Alice"))
        }
        assertEquals(HttpStatusCode.Created, registerResponse.status)
        val authResult = registerResponse.body<AuthResponse>()
        assertEquals("alice@toppy.dev", authResult.user.email)
        assertNotNull(authResult.token)

        // 2. Successful Login
        val loginResponse = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody(LoginRequest("alice@toppy.dev", "password123"))
        }
        assertEquals(HttpStatusCode.OK, loginResponse.status)
        val loginResult = loginResponse.body<AuthResponse>()
        val token = loginResult.token
        assertTrue(token.isNotBlank())

        // 3. Failed Login (Wrong password returns 400 Bad Request via StatusPages)
        val failResponse = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody(LoginRequest("alice@toppy.dev", "wrong-password"))
        }
        assertEquals(HttpStatusCode.BadRequest, failResponse.status)

        // 4. Authenticated /me endpoint
        val meResponse = client.get("/api/auth/me") {
            header(HttpHeaders.Authorization, "Bearer $token")
        }
        assertEquals(HttpStatusCode.OK, meResponse.status)
        val meUser = meResponse.body<UserDto>()
        assertEquals("alice@toppy.dev", meUser.email)

        // 5. Unauthenticated /me endpoint
        val unauthResponse = client.get("/api/auth/me")
        assertEquals(HttpStatusCode.Unauthorized, unauthResponse.status)
    }

    @Test
    fun testPostCrudSeoAndOgPreviewWorkflow(@TempDir tempDir: File) = testApplication {
        val testConfig = createTestConfig(tempDir)
        application {
            configureApp(testConfig, initDb = false, startScheduler = false)
        }

        val client = createClient {
            install(ContentNegotiation) {
                json(Json { ignoreUnknownKeys = true })
            }
        }

        // 1. Register and get token
        val regRes = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody(RegisterRequest("author@toppy.dev", "password123", "Author"))
        }
        val token = regRes.body<AuthResponse>().token

        // 2. Create Blog owned by user
        val createBlogRes = client.post("/api/console/blogs") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody(CreateBlogRequest(subdomain = "author-blog", title = "Author Blog"))
        }
        assertEquals(HttpStatusCode.Created, createBlogRes.status)
        val createdBlog = createBlogRes.body<BlogDto>()
        val blogId = createdBlog.id

        // 3. Create Post
        val createPostRes = client.post("/api/console/blogs/$blogId/posts") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody(
                CreatePostRequest(
                    title = "Integration Test Post",
                    slug = "integration-test-post",
                    languageCode = "en",
                    isFeatured = false,
                    isPage = false
                )
            )
        }
        assertEquals(HttpStatusCode.Created, createPostRes.status)
        val createdPost = createPostRes.body<PostDto>()
        val postId = createdPost.id

        // 4. Update Post Variant to PUBLISHED
        val updateVariantRes = client.put("/api/console/blogs/$blogId/posts/$postId/variants/en") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody(
                UpdateVariantRequest(
                    slug = "integration-test-post",
                    title = "Integration Test Post",
                    description = "A well-tested post for verification",
                    contentJson = "{}",
                    contentHtml = "<p>Integration test post content body.</p>",
                    status = PostStatus.PUBLISHED
                )
            )
        }
        assertEquals(HttpStatusCode.OK, updateVariantRes.status)
        val variant = updateVariantRes.body<PostVariantDto>()
        assertEquals("integration-test-post", variant.slug)
        assertEquals(PostStatus.PUBLISHED, variant.status)

        // 5. Update Canonical URL on Post Base Settings
        val updateBaseRes = client.put("/api/console/blogs/$blogId/posts/$postId") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody(
                UpdatePostRequest(
                    isFeatured = true,
                    canonicalUrl = "https://external.dev/original-article"
                )
            )
        }
        assertEquals(HttpStatusCode.OK, updateBaseRes.status)
        val updatedPost = updateBaseRes.body<PostDto>()
        assertTrue(updatedPost.isFeatured)
        assertEquals("https://external.dev/original-article", updatedPost.canonicalUrl)

        // 6. Test Real-time OG Card Preview endpoint (Drafts / Published)
        val ogPreviewRes = client.get("/api/console/blogs/$blogId/posts/$postId/og-preview?language=en") {
            header(HttpHeaders.Authorization, "Bearer $token")
        }
        assertEquals(HttpStatusCode.OK, ogPreviewRes.status)
        assertEquals("image/svg+xml", ogPreviewRes.contentType()?.withoutParameters()?.toString())
        val svgBody = ogPreviewRes.bodyAsText()
        assertTrue(svgBody.contains("<svg"), "OG Preview should return valid SVG card")
        assertTrue(svgBody.contains("Integration Test Post"), "OG Preview SVG should contain post title")

        // 7. Test Public RSS Feed Delivery
        val feedRes = client.get("/rss.xml") {
            header(HttpHeaders.Host, "author-blog.localhost")
        }
        assertEquals(HttpStatusCode.OK, feedRes.status)
        val feedBody = feedRes.bodyAsText()
        assertTrue(feedBody.contains("<feed xmlns=\"http://www.w3.org/2005/Atom\">"))
        assertTrue(feedBody.contains("Integration Test Post"))

        // 8. Test Public Sitemap Delivery
        val sitemapRes = client.get("/sitemap.xml") {
            header(HttpHeaders.Host, "author-blog.localhost")
        }
        assertEquals(HttpStatusCode.OK, sitemapRes.status)
        val sitemapBody = sitemapRes.bodyAsText()
        assertTrue(sitemapBody.contains("<urlset xmlns="))
        assertTrue(sitemapBody.contains("integration-test-post"))

        // 9. Test Public Search Delivery
        val searchRes = client.get("/api/search?q=Integration") {
            header(HttpHeaders.Host, "author-blog.localhost")
        }
        assertEquals(HttpStatusCode.OK, searchRes.status)
        val searchResults = searchRes.body<SearchResponseDto>()
        assertTrue(searchResults.results.isNotEmpty())
        assertEquals("Integration Test Post", searchResults.results[0].title)

        // 10. Test Public Post HTML Page Render
        val postHtmlRes = client.get("/integration-test-post") {
            header(HttpHeaders.Host, "author-blog.localhost")
        }
        assertEquals(HttpStatusCode.OK, postHtmlRes.status)
        val postHtml = postHtmlRes.bodyAsText()
        assertTrue(postHtml.contains("Integration Test Post"))

        // 11. Test Custom Domain Configuration & DNS Verification
        val updateDomainRes = client.put("/api/console/blogs/$blogId") {
            header(HttpHeaders.Authorization, "Bearer $token")
            contentType(ContentType.Application.Json)
            setBody(UpdateBlogRequest(customDomain = "testblog.localhost"))
        }
        assertEquals(HttpStatusCode.OK, updateDomainRes.status)

        val verifyDomainRes = client.post("/api/console/blogs/$blogId/domain/verify") {
            header(HttpHeaders.Authorization, "Bearer $token")
        }
        assertEquals(HttpStatusCode.OK, verifyDomainRes.status)
        val verifyResult = verifyDomainRes.body<VerifyDomainResponse>()
        assertTrue(verifyResult.verified)
        assertEquals(DnsStatus.VERIFIED, verifyResult.dnsStatus)
        assertTrue(verifyResult.sslReady)
        assertEquals("ACTIVE", verifyResult.sslStatus)

        // 12. Test Caddy On-Demand TLS Internal Hook (/api/internal/check-domain)
        val checkSubdomainRes = client.get("/api/internal/check-domain?domain=author-blog")
        assertEquals(HttpStatusCode.OK, checkSubdomainRes.status)

        val checkVerifiedCustomDomainRes = client.get("/api/internal/check-domain?domain=testblog.localhost")
        assertEquals(HttpStatusCode.OK, checkVerifiedCustomDomainRes.status)

        val checkUnknownDomainRes = client.get("/api/internal/check-domain?domain=completely-unknown-domain.com")
        assertEquals(HttpStatusCode.NotFound, checkUnknownDomainRes.status)

        // 13. Test Public Headless Posts List (/api/public/posts)
        val publicPostsRes = client.get("/api/public/posts?subdomain=author-blog")
        assertEquals(HttpStatusCode.OK, publicPostsRes.status)
        val publicPosts = publicPostsRes.body<PublicPostsResponseDto>()
        assertTrue(publicPosts.total > 0)
        assertEquals("integration-test-post", publicPosts.posts[0].slug)
        assertEquals("Integration Test Post", publicPosts.posts[0].title)
        assertTrue(publicPosts.posts[0].isFeatured)

        // 14. Test Public Headless Post Detail (/api/public/posts/{slug})
        val publicPostDetailRes = client.get("/api/public/posts/integration-test-post?subdomain=author-blog")
        assertEquals(HttpStatusCode.OK, publicPostDetailRes.status)
        val postDetail = publicPostDetailRes.body<PublicPostDetailDto>()
        assertEquals("integration-test-post", postDetail.slug)
        assertEquals("Integration Test Post", postDetail.title)
        assertTrue(postDetail.contentHtml.contains("Integration test post content body"))
        assertEquals("https://external.dev/original-article", postDetail.canonicalUrl)
    }
}

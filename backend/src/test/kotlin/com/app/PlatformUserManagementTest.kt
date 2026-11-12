package com.app

import com.app.api.dto.*
import com.app.config.AppConfig
import com.app.domain.model.*
import io.ktor.client.call.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.testing.*
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.transactions.transaction
import org.jetbrains.exposed.sql.update
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

class PlatformUserManagementTest {

    companion object {
        @BeforeAll
        @JvmStatic
        fun setupDb() {
            Database.connect(
                url = "jdbc:h2:mem:user_mgmt_test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
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
            dbUrl = "jdbc:h2:mem:user_mgmt_test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
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
    fun testPlatformUserManagementAndAdminRemoval(@TempDir tempDir: File) = testApplication {
        val testConfig = createTestConfig(tempDir)
        application {
            configureApp(testConfig, initDb = false, startScheduler = false)
        }

        val client = createClient {
            install(ContentNegotiation) {
                json(Json { ignoreUnknownKeys = true })
            }
        }

        // 1. Seed Initial Platform Admin (Admin A)
        val adminReg = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody(RegisterRequest("admin-a@example.com", "password123", "Admin Alpha"))
        }
        assertEquals(HttpStatusCode.Created, adminReg.status)
        val adminAAuth = adminReg.body<AuthResponse>()
        val adminAId = adminAAuth.user.id

        // Promote Admin A to ADMIN in DB
        transaction {
            Users.update({ Users.id eq adminAId }) {
                it[Users.role] = UserRole.ADMIN.name
            }
        }

        // Re-login as Admin A to obtain JWT with ADMIN role
        val adminALogin = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody(LoginRequest("admin-a@example.com", "password123"))
        }
        assertEquals(HttpStatusCode.OK, adminALogin.status)
        val adminAToken = adminALogin.body<AuthResponse>().token

        // 2. Register regular author (Author User)
        val authorReg = client.post("/api/auth/register") {
            contentType(ContentType.Application.Json)
            setBody(RegisterRequest("author@example.com", "password123", "Author User"))
        }
        assertEquals(HttpStatusCode.Created, authorReg.status)
        val authorToken = authorReg.body<AuthResponse>().token

        // 3. Authorization Check: Author token must receive 403 Forbidden
        val forbiddenList = client.get("/api/console/users") {
            header(HttpHeaders.Authorization, "Bearer $authorToken")
        }
        assertEquals(HttpStatusCode.Forbidden, forbiddenList.status)

        // 4. Admin A lists users: 200 OK
        val adminList = client.get("/api/console/users") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
        }
        assertEquals(HttpStatusCode.OK, adminList.status)
        val users = adminList.body<List<PlatformUserSummaryDto>>()
        assertTrue(users.size >= 2)

        // 5. Admin A creates a second Admin (Admin B)
        val createAdminB = client.post("/api/console/users") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
            contentType(ContentType.Application.Json)
            setBody(CreatePlatformUserRequest("admin-b@example.com", "Admin Bravo", "password123", UserRole.ADMIN))
        }
        assertEquals(HttpStatusCode.Created, createAdminB.status)
        val adminBUser = createAdminB.body<PlatformUserSummaryDto>()
        val adminBId = adminBUser.id
        assertEquals(UserRole.ADMIN, adminBUser.role)

        // Admin B logs in and creates a blog
        val adminBLogin = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody(LoginRequest("admin-b@example.com", "password123"))
        }
        assertEquals(HttpStatusCode.OK, adminBLogin.status)
        val adminBToken = adminBLogin.body<AuthResponse>().token

        val createBlogRes = client.post("/api/console/blogs") {
            header(HttpHeaders.Authorization, "Bearer $adminBToken")
            contentType(ContentType.Application.Json)
            setBody(CreateBlogRequest(subdomain = "bravolog", title = "Bravo Publication"))
        }
        assertEquals(HttpStatusCode.Created, createBlogRes.status)
        val blogB = createBlogRes.body<BlogDto>()
        assertEquals(adminBId, blogB.ownerId)

        // 6. Security Invariant: Admin A cannot delete themself
        val selfDeleteRes = client.delete("/api/console/users/$adminAId") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
        }
        assertEquals(HttpStatusCode.BadRequest, selfDeleteRes.status)

        // 7. Security Invariant: Test password reset on Admin B
        val resetPassRes = client.put("/api/console/users/$adminBId/password") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
            contentType(ContentType.Application.Json)
            setBody(ResetUserPasswordRequest(newPassword = "new-secure-password-456"))
        }
        assertEquals(HttpStatusCode.OK, resetPassRes.status)

        // Verify login with old password fails
        val oldLoginRes = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody(LoginRequest("admin-b@example.com", "password123"))
        }
        assertEquals(HttpStatusCode.BadRequest, oldLoginRes.status)

        // Verify login with new password succeeds
        val newLoginRes = client.post("/api/auth/login") {
            contentType(ContentType.Application.Json)
            setBody(LoginRequest("admin-b@example.com", "new-secure-password-456"))
        }
        assertEquals(HttpStatusCode.OK, newLoginRes.status)

        // 8. Admin A deletes Admin B (with blog ownership reassigned to Admin A)
        val deleteAdminBRes = client.delete("/api/console/users/$adminBId") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
            contentType(ContentType.Application.Json)
            setBody(DeleteUserRequest(transferOwnershipToUserId = adminAId, confirmEmail = "admin-b@example.com"))
        }
        assertEquals(HttpStatusCode.OK, deleteAdminBRes.status)
        val deleteResponse = deleteAdminBRes.body<DeleteUserResponse>()
        assertTrue(deleteResponse.success)
        assertEquals(1, deleteResponse.blogsReassignedCount)

        // Verify Admin B is gone
        val getBRes = client.get("/api/console/users/$adminBId") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
        }
        assertEquals(HttpStatusCode.NotFound, getBRes.status)

        // Verify blog is now owned by Admin A
        val getBlogRes = client.get("/api/console/blogs/${blogB.id}") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
        }
        assertEquals(HttpStatusCode.OK, getBlogRes.status)
        val updatedBlog = getBlogRes.body<BlogDto>()
        assertEquals(adminAId, updatedBlog.ownerId)

        // 9. Security Invariant: Last Admin Protection
        // Attempting to delete Admin A (now the sole admin) must fail
        val lastAdminDeleteRes = client.delete("/api/console/users/$adminAId") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
        }
        assertEquals(HttpStatusCode.BadRequest, lastAdminDeleteRes.status)

        // Attempting to demote Admin A to AUTHOR must fail
        val demoteLastAdminRes = client.put("/api/console/users/$adminAId") {
            header(HttpHeaders.Authorization, "Bearer $adminAToken")
            contentType(ContentType.Application.Json)
            setBody(UpdatePlatformUserRequest(role = UserRole.AUTHOR))
        }
        assertEquals(HttpStatusCode.BadRequest, demoteLastAdminRes.status)
    }
}

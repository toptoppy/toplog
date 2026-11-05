package com.app.api.routing

import com.app.api.dto.CreateCommentResponse
import com.app.api.dto.PublicCreateCommentRequest
import com.app.api.dto.PublicPostDetailDto
import com.app.api.dto.PublicPostListItemDto
import com.app.api.dto.PublicPostsResponseDto
import com.app.api.dto.PublicSubscribeRequest
import com.app.api.dto.RecordPageViewRequest
import com.app.api.dto.SearchResponseDto
import com.app.config.AppConfig
import com.app.domain.model.Blog
import com.app.service.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.deliveryRoutes(
    blogService: BlogService,
    deliveryService: DeliveryService,
    postService: PostService,
    tagService: TagService,
    newsletterService: NewsletterService,
    analyticsService: AnalyticsService,
    commentService: CommentService,
    ogImageService: OgImageService,
    config: AppConfig
) {
    suspend fun resolveBlog(call: ApplicationCall): Blog? {
        val paramBlog = call.request.queryParameters["blog"]
            ?: call.request.queryParameters["subdomain"]
            ?: call.request.headers["X-Blog-Subdomain"]
        if (!paramBlog.isNullOrBlank()) {
            val bySub = blogService.findBySubdomain(paramBlog)
            if (bySub != null) return bySub
        }
        return blogService.findByHost(call.request.host(), config.baseDomain)
    }

    // Public Headless API: List published posts
    get("/api/public/posts") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        val lang = call.request.queryParameters["lang"]?.takeIf { it.lowercase() != "all" && it.isNotBlank() }
        val tag = call.request.queryParameters["tag"]
        val featured = call.request.queryParameters["featured"]?.toBooleanStrictOrNull()
        val limit = call.request.queryParameters["limit"]?.toIntOrNull()?.coerceIn(1, 100) ?: 50
        val offset = call.request.queryParameters["offset"]?.toLongOrNull()?.coerceAtLeast(0) ?: 0L

        val posts = postService.listPublicPosts(
            blogId = blog.id,
            languageCode = lang,
            tagSlug = tag,
            isFeatured = featured,
            limit = limit,
            offset = offset
        )

        call.respond(
            HttpStatusCode.OK,
            PublicPostsResponseDto(
                total = posts.size,
                posts = posts
            )
        )
    }

    // Public Headless API: Single post detail by slug
    get("/api/public/posts/{slug}") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        val slug = call.parameters["slug"]
            ?: return@get call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Slug required"))

        val lang = call.request.queryParameters["lang"]?.takeIf { it.lowercase() != "all" && it.isNotBlank() }
        val post = postService.getPublicPostBySlug(blog.id, slug, lang)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Post not found"))

        call.respond(HttpStatusCode.OK, post)
    }

    // Alias: /api/posts and /api/posts/{slug}
    get("/api/posts") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        val lang = call.request.queryParameters["lang"]?.takeIf { it.lowercase() != "all" && it.isNotBlank() }
        val tag = call.request.queryParameters["tag"]
        val featured = call.request.queryParameters["featured"]?.toBooleanStrictOrNull()
        val limit = call.request.queryParameters["limit"]?.toIntOrNull()?.coerceIn(1, 100) ?: 50
        val offset = call.request.queryParameters["offset"]?.toLongOrNull()?.coerceAtLeast(0) ?: 0L

        val posts = postService.listPublicPosts(
            blogId = blog.id,
            languageCode = lang,
            tagSlug = tag,
            isFeatured = featured,
            limit = limit,
            offset = offset
        )

        call.respond(
            HttpStatusCode.OK,
            PublicPostsResponseDto(
                total = posts.size,
                posts = posts
            )
        )
    }

    get("/api/posts/{slug}") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        val slug = call.parameters["slug"]
            ?: return@get call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Slug required"))

        val lang = call.request.queryParameters["lang"]?.takeIf { it.lowercase() != "all" && it.isNotBlank() }
        val post = postService.getPublicPostBySlug(blog.id, slug, lang)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Post not found"))

        call.respond(HttpStatusCode.OK, post)
    }

    // Public API: Dynamic Social Open Graph Card Image
    get("/api/og/{slug}") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound)

        val slug = call.parameters["slug"] ?: return@get call.respond(HttpStatusCode.BadRequest)
        val svg = ogImageService.renderOgSvg(blog, slug)
            ?: return@get call.respond(HttpStatusCode.NotFound)

        call.response.header(HttpHeaders.CacheControl, "public, max-age=86400")
        call.respondText(svg, ContentType("image", "svg+xml"))
    }
    // Public API: Reader Comments Submission
    post("/api/comments") {
        val blog = resolveBlog(call)
            ?: return@post call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        try {
            val req = call.receive<PublicCreateCommentRequest>()
            if (req.authorName.isBlank() || req.authorEmail.isBlank() || req.content.isBlank()) {
                return@post call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Name, email, and comment content are required"))
            }

            val comment = commentService.createPublicComment(blog.id, req)
            call.respond(
                HttpStatusCode.Created,
                CreateCommentResponse(
                    success = true,
                    message = "Thank you! Your comment has been submitted and is awaiting approval.",
                    comment = comment
                )
            )
        } catch (e: Exception) {
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Failed to post comment")))
        }
    }

    // Public API: Fetch Approved Comments for Post
    get("/api/posts/{postId}/comments") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        val postId = call.parameters["postId"]?.toLongOrNull()
            ?: return@get call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid postId"))

        val comments = commentService.listApprovedCommentsForPost(blog.id, postId)
        call.respond(HttpStatusCode.OK, comments)
    }
    // Public API: Page View Tracking Beacon
    post("/api/analytics/view") {
        val blog = resolveBlog(call)
            ?: return@post call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        try {
            val req = call.receive<RecordPageViewRequest>()
            val referrer = req.referrer ?: call.request.headers["Referer"]
            val userAgent = call.request.headers["User-Agent"]
            analyticsService.recordView(
                blogId = blog.id,
                postId = req.postId,
                path = req.path,
                referrer = referrer,
                userAgent = userAgent
            )
            call.respond(HttpStatusCode.OK, mapOf("ok" to true))
        } catch (e: Exception) {
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Failed to record view")))
        }
    }

    // Public API: Instant Search Endpoint (supports ?q=... and/or ?tag=...)
    get("/api/search") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, "Blog not found")

        val query = call.request.queryParameters["q"] ?: ""
        val tag = call.request.queryParameters["tag"]
        val results = postService.searchPublishedPosts(blog.id, query, tagSlug = tag)

        call.respond(
            HttpStatusCode.OK,
            SearchResponseDto(
                query = query,
                total = results.size,
                results = results
            )
        )
    }

    // Public API: Public Tags Listing with Article Counts
    get("/api/tags") {
        val blog = resolveBlog(call)
            ?: return@get call.respond(HttpStatusCode.NotFound, "Blog not found")

        val tags = tagService.listPublicTags(blog.id)
        call.respond(HttpStatusCode.OK, tags)
    }

    // Public API: Member Newsletter Subscribe Endpoint
    post("/api/subscribe") {
        val blog = resolveBlog(call)
            ?: return@post call.respond(HttpStatusCode.NotFound, "Blog not found")

        try {
            val req = call.receive<PublicSubscribeRequest>()
            val res = newsletterService.subscribe(blog.id, req.email, req.name)
            call.respond(HttpStatusCode.OK, res)
        } catch (e: Exception) {
            call.respond(
                HttpStatusCode.BadRequest,
                mapOf("error" to (e.message ?: "Subscription failed"))
            )
        }
    }

    head("/{path...}") {
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
            ?: return@head call.respond(HttpStatusCode.NotFound)
        call.respond(HttpStatusCode.OK)
    }

    get("/{path...}") {
        val path = "/" + (call.parameters.getAll("path")?.joinToString("/") ?: "")
        val host = call.request.host()

        // 1. Resolve Blog by Host Header
        val blog = blogService.findByHost(host, config.baseDomain)
            ?: return@get call.respondText(
                "<!DOCTYPE html><html><body><h1>404 Blog Not Found</h1><p>No blog mapped to $host</p></body></html>",
                contentType = ContentType.Text.Html,
                status = HttpStatusCode.NotFound
            )

        val scheme = call.request.headers["X-Forwarded-Proto"] ?: call.request.local.scheme
        val baseUrl = "$scheme://$host"

        // 2. Handle System & Theme Routes
        when {
            // Theme static assets (/assets/style.css, etc.)
            path.startsWith("/assets/") -> {
                val assetPath = path.removePrefix("/assets/")
                val resourcePath = "themes/${blog.themeName}/assets/$assetPath"
                val stream = this::class.java.classLoader.getResourceAsStream(resourcePath)
                if (stream != null) {
                    val bytes = stream.readBytes()
                    val contentType = when {
                        assetPath.endsWith(".css") -> ContentType.Text.CSS
                        assetPath.endsWith(".js") -> ContentType.Application.JavaScript
                        assetPath.endsWith(".png") -> ContentType.Image.PNG
                        assetPath.endsWith(".jpg") || assetPath.endsWith(".jpeg") -> ContentType.Image.JPEG
                        assetPath.endsWith(".svg") -> ContentType.Image.SVG
                        else -> ContentType.Application.OctetStream
                    }
                    call.respondBytes(bytes, contentType)
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }

            // Atom/RSS Feed
            path == "/feed.atom" || path == "/rss.xml" -> {
                val feed = deliveryService.generateFeed(blog, baseUrl)
                call.respondText(feed.content, ContentType.parse(feed.contentType))
            }

            // XML Sitemap
            path == "/sitemap.xml" -> {
                val sitemap = deliveryService.generateSitemap(blog, baseUrl)
                call.respondText(sitemap.content, ContentType.parse(sitemap.contentType))
            }

            // Full-Text Search Page (/search?q=...&tag=...)
            path == "/search" -> {
                val q = call.request.queryParameters["q"] ?: ""
                val tag = call.request.queryParameters["tag"]
                val results = postService.searchPublishedPosts(blog.id, q, tagSlug = tag)
                val view = deliveryService.renderSearch(blog, q, results, tagSlug = tag, baseUrl = baseUrl)
                call.respondText(view.content, ContentType.Text.Html)
            }

            // Unsubscribe Confirmation Page (/unsubscribe?token=...)
            path == "/unsubscribe" -> {
                val token = call.request.queryParameters["token"] ?: ""
                val success = if (token.isNotBlank()) newsletterService.unsubscribe(token) else false
                val view = deliveryService.renderUnsubscribe(blog, success, baseUrl = baseUrl)
                call.respondText(view.content, ContentType.Text.Html)
            }

            // Tag archive (/tag/news, etc.)
            path.startsWith("/tag/") -> {
                val tagSlug = path.removePrefix("/tag/").trim('/')
                val view = deliveryService.renderTag(blog, tagSlug, baseUrl = baseUrl)
                if (view != null) {
                    call.respondText(view.content, ContentType.Text.Html)
                } else {
                    call.respondText("Tag not found", status = HttpStatusCode.NotFound)
                }
            }

            // Blog Homepage (/)
            path == "/" || path.isEmpty() -> {
                val view = deliveryService.renderIndex(blog, baseUrl = baseUrl)
                call.respondText(view.content, ContentType.Text.Html)
            }

            // Single Post / Page by Slug (/{slug})
            else -> {
                val slug = path.trim('/')
                val view = deliveryService.renderPost(blog, slug, baseUrl = baseUrl)
                if (view != null) {
                    call.respondText(view.content, ContentType.Text.Html)
                } else {
                    call.respondText(
                        "<!DOCTYPE html><html><body><h1>404 Page Not Found</h1><p>The post '$slug' could not be found.</p><p><a href='/'>&larr; Back to home</a></p></body></html>",
                        contentType = ContentType.Text.Html,
                        status = HttpStatusCode.NotFound
                    )
                }
            }
        }
    }
}

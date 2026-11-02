package com.app.api.routing

import com.app.api.dto.CreateCommentResponse
import com.app.api.dto.PublicCreateCommentRequest
import com.app.api.dto.PublicSubscribeRequest
import com.app.api.dto.RecordPageViewRequest
import com.app.api.dto.SearchResponseDto
import com.app.config.AppConfig
import com.app.service.*
import io.ktor.http.*
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
    // Public API: Dynamic Social Open Graph Card Image
    get("/api/og/{slug}") {
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
            ?: return@get call.respond(HttpStatusCode.NotFound)

        val slug = call.parameters["slug"] ?: return@get call.respond(HttpStatusCode.BadRequest)
        val svg = ogImageService.renderOgSvg(blog, slug)
            ?: return@get call.respond(HttpStatusCode.NotFound)

        call.response.header(HttpHeaders.CacheControl, "public, max-age=86400")
        call.respondText(svg, ContentType("image", "svg+xml"))
    }
    // Public API: Reader Comments Submission
    post("/api/comments") {
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
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
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
            ?: return@get call.respond(HttpStatusCode.NotFound, mapOf("error" to "Blog not found"))

        val postId = call.parameters["postId"]?.toLongOrNull()
            ?: return@get call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid postId"))

        val comments = commentService.listApprovedCommentsForPost(blog.id, postId)
        call.respond(HttpStatusCode.OK, comments)
    }
    // Public API: Page View Tracking Beacon
    post("/api/analytics/view") {
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
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
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
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
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
            ?: return@get call.respond(HttpStatusCode.NotFound, "Blog not found")

        val tags = tagService.listPublicTags(blog.id)
        call.respond(HttpStatusCode.OK, tags)
    }

    // Public API: Member Newsletter Subscribe Endpoint
    post("/api/subscribe") {
        val host = call.request.host()
        val blog = blogService.findByHost(host, config.baseDomain)
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

package com.app.api.routing.console

import com.app.api.dto.*
import com.app.domain.model.PostStatus
import com.app.infrastructure.security.UserPrincipal
import com.app.service.AiService
import com.app.service.NewsletterService
import com.app.service.PostService
import com.app.service.RevisionService
import io.ktor.http.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.consolePostRoutes(
    postService: PostService,
    revisionService: RevisionService,
    aiService: AiService,
    newsletterService: NewsletterService
) {
    route("/posts") {
        get {
            val blogId = call.parameters["blogId"]!!.toLong()
            val lang = call.request.queryParameters["language"]
            val statusStr = call.request.queryParameters["status"]
            val status = statusStr?.let { runCatching { PostStatus.valueOf(it.uppercase()) }.getOrNull() }
            val isPage = call.request.queryParameters["isPage"]?.toBooleanStrictOrNull()

            val posts = postService.listPosts(blogId, lang, status, isPage)
            call.respond(HttpStatusCode.OK, posts)
        }

        post {
            val blogId = call.parameters["blogId"]!!.toLong()
            val request = call.receive<CreatePostRequest>()
            val post = postService.createPost(blogId, request)
            call.respond(HttpStatusCode.Created, post)
        }

        route("/{postId}") {
            get {
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val post = postService.getPostById(postId, blogId)
                    ?: return@get call.respond(HttpStatusCode.NotFound, "Post not found")
                call.respond(HttpStatusCode.OK, post)
            }

            put {
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val request = call.receive<UpdatePostRequest>()
                val post = postService.updatePostBase(postId, blogId, request)
                call.respond(HttpStatusCode.OK, post)
            }

            delete {
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val deleted = postService.deletePost(postId, blogId)
                if (deleted) {
                    call.respond(HttpStatusCode.NoContent)
                } else {
                    call.respond(HttpStatusCode.NotFound, "Post not found")
                }
            }

            put("/variants/{languageCode}") {
                val principal = call.principal<UserPrincipal>()!!
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val lang = call.parameters["languageCode"]!!
                val request = call.receive<UpdateVariantRequest>()
                val variant = postService.saveVariant(postId, blogId, lang, request, principal.userId)
                call.respond(HttpStatusCode.OK, variant)
            }

            // --- REVISIONS ---
            get("/variants/{languageCode}/revisions") {
                val postId = call.parameters["postId"]!!.toLong()
                val lang = call.parameters["languageCode"]!!
                val variant = postService.getVariantByLanguage(postId, lang)
                    ?: return@get call.respond(HttpStatusCode.NotFound, "Variant not found")
                val revisions = revisionService.listRevisions(variant.id)
                call.respond(HttpStatusCode.OK, revisions)
            }

            post("/variants/{languageCode}/revisions/{revisionId}/restore") {
                val principal = call.principal<UserPrincipal>()!!
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val lang = call.parameters["languageCode"]!!
                val revisionId = call.parameters["revisionId"]!!.toLong()

                val rev = revisionService.getRevision(revisionId)
                    ?: return@post call.respond(HttpStatusCode.NotFound, "Revision not found")

                val restored = postService.saveVariant(
                    postId = postId,
                    blogId = blogId,
                    languageCode = lang,
                    request = UpdateVariantRequest(
                        title = rev.title,
                        slug = rev.slug,
                        description = rev.description,
                        contentJson = rev.contentJson,
                        contentHtml = rev.contentHtml,
                        status = rev.status
                    ),
                    userId = principal.userId
                )
                call.respond(HttpStatusCode.OK, restored)
            }

            // AI Auto-Translation
            post("/ai/translate") {
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val request = call.receive<TranslatePostAiRequest>()

                val post = postService.getPostById(postId, blogId)
                    ?: return@post call.respond(HttpStatusCode.NotFound, "Post not found")

                val sourceVariant = post.variants.find { it.languageCode == request.sourceLanguage }
                    ?: return@post call.respond(
                        HttpStatusCode.BadRequest,
                        "Source language variant '${request.sourceLanguage}' not found"
                    )

                val translation = aiService.translate(
                    sourceTitle = sourceVariant.title,
                    sourceDescription = sourceVariant.description,
                    sourceContentHtml = sourceVariant.contentHtml,
                    targetLang = request.targetLanguage,
                    blogId = blogId
                )

                val savedVariant = postService.saveVariant(
                    postId = postId,
                    blogId = blogId,
                    languageCode = request.targetLanguage,
                    request = UpdateVariantRequest(
                        title = translation.title,
                        slug = translation.slug,
                        description = translation.description,
                        contentHtml = translation.contentHtml,
                        contentJson = "{}"
                    )
                )

                call.respond(HttpStatusCode.OK, savedVariant)
            }

            // AI SEO & Title Optimizer
            post("/ai/seo") {
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val request = call.receive<GenerateSeoAiRequest>()

                val post = postService.getPostById(postId, blogId)
                    ?: return@post call.respond(HttpStatusCode.NotFound, "Post not found")

                val variant = post.variants.find { it.languageCode == request.languageCode }
                    ?: return@post call.respond(
                        HttpStatusCode.BadRequest,
                        "Language variant '${request.languageCode}' not found"
                    )

                val seo = aiService.generateSeo(
                    title = variant.title,
                    contentHtml = variant.contentHtml,
                    lang = request.languageCode,
                    blogId = blogId
                )

                call.respond(
                    HttpStatusCode.OK,
                    SeoResponseDto(
                        titles = seo.titles,
                        metaDescription = seo.metaDescription,
                        tags = seo.tags
                    )
                )
            }

            // Newsletter dispatch for this post
            post("/send-newsletter") {
                val blogId = call.parameters["blogId"]!!.toLong()
                val postId = call.parameters["postId"]!!.toLong()
                val request = try {
                    call.receive<SendNewsletterRequest>()
                } catch (_: Exception) {
                    SendNewsletterRequest()
                }

                val res = newsletterService.sendNewsletterForPost(
                    blogId = blogId,
                    postId = postId,
                    customSubject = request.subject,
                    customContentHtml = request.contentHtml
                )
                call.respond(HttpStatusCode.OK, res)
            }
        }
    }
}

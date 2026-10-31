package com.app.api.routing

import com.app.api.dto.*
import com.app.domain.model.CommentStatus
import com.app.domain.model.PostStatus
import com.app.infrastructure.security.UserPrincipal
import com.app.infrastructure.storage.StorageService
import com.app.service.*
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.consoleRoutes(
    blogService: BlogService,
    postService: PostService,
    tagService: TagService,
    storageService: StorageService,
    aiService: AiService,
    webhookService: WebhookService,
    importService: ImportService,
    newsletterService: NewsletterService,
    analyticsService: AnalyticsService,
    memberService: MemberService,
    domainService: DomainService,
    commentService: CommentService,
    exportService: ExportService,
    revisionService: RevisionService
) {
    // 1. Static media uploads endpoint (public)
    get("/uploads/{filename}") {
        val filename = call.parameters["filename"] ?: return@get call.respond(HttpStatusCode.BadRequest)
        val file = storageService.getFile(filename) ?: return@get call.respond(HttpStatusCode.NotFound)
        call.respondFile(file)
    }

    // 2. Authenticated Console API
    authenticate("auth-jwt") {
        route("/api/console") {

            // --- INVITES ---
            post("/invites/{token}/accept") {
                val principal = call.principal<UserPrincipal>()!!
                val token = call.parameters["token"]!!
                val member = memberService.acceptInvite(token, principal.userId)
                call.respond(HttpStatusCode.OK, member)
            }

            // --- BLOGS ---
            route("/blogs") {
                get {
                    val principal = call.principal<UserPrincipal>()!!
                    val blogs = blogService.listBlogsForUser(principal.userId)
                    call.respond(HttpStatusCode.OK, blogs)
                }

                post {
                    val principal = call.principal<UserPrincipal>()!!
                    val request = call.receive<CreateBlogRequest>()
                    val blog = blogService.createBlog(principal.userId, request)
                    call.respond(HttpStatusCode.Created, blog)
                }

                route("/{blogId}") {
                    get {
                        val blogId = call.parameters["blogId"]?.toLongOrNull()
                            ?: return@get call.respond(HttpStatusCode.BadRequest, "Invalid blogId")
                        val blog = blogService.getBlogById(blogId)
                            ?: return@get call.respond(HttpStatusCode.NotFound, "Blog not found")

                        with(blogService) {
                            call.respond(HttpStatusCode.OK, blog.toDto())
                        }
                    }

                    put {
                        val principal = call.principal<UserPrincipal>()!!
                        val blogId = call.parameters["blogId"]?.toLongOrNull()
                            ?: return@put call.respond(HttpStatusCode.BadRequest, "Invalid blogId")
                        val request = call.receive<UpdateBlogRequest>()
                        val updated = blogService.updateBlog(blogId, principal.userId, request)
                        call.respond(HttpStatusCode.OK, updated)
                    }

                    // --- POSTS ---
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
                                    targetLang = request.targetLanguage
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
                                    lang = request.languageCode
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

                    // --- SUBSCRIBERS ---
                    route("/subscribers") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val subs = newsletterService.listSubscribers(blogId)
                            call.respond(HttpStatusCode.OK, subs)
                        }

                        post {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val request = call.receive<CreateSubscriberRequest>()
                            val sub = newsletterService.addSubscriber(blogId, request)
                            call.respond(HttpStatusCode.Created, sub)
                        }

                        delete("/{subscriberId}") {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val subId = call.parameters["subscriberId"]!!.toLong()
                            val deleted = newsletterService.deleteSubscriber(blogId, subId)
                            if (deleted) {
                                call.respond(HttpStatusCode.NoContent)
                            } else {
                                call.respond(HttpStatusCode.NotFound)
                            }
                        }
                    }

                    // --- NEWSLETTERS HISTORY ---
                    route("/newsletters") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val list = newsletterService.listNewsletters(blogId)
                            call.respond(HttpStatusCode.OK, list)
                        }
                    }

                    // --- TAGS ---
                    route("/tags") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val tags = tagService.listTags(blogId)
                            call.respond(HttpStatusCode.OK, tags)
                        }

                        post {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val request = call.receive<CreateTagRequest>()
                            val tag = tagService.createTag(blogId, request)
                            call.respond(HttpStatusCode.Created, tag)
                        }

                        delete("/{tagId}") {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val tagId = call.parameters["tagId"]!!.toLong()
                            val deleted = tagService.deleteTag(blogId, tagId)
                            if (deleted) {
                                call.respond(HttpStatusCode.NoContent)
                            } else {
                                call.respond(HttpStatusCode.NotFound)
                            }
                        }
                    }

                    // --- WEBHOOKS ---
                    route("/webhooks") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val webhooks = webhookService.listWebhooks(blogId)
                            call.respond(HttpStatusCode.OK, webhooks)
                        }

                        post {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val request = call.receive<CreateWebhookRequest>()
                            val webhook = webhookService.createWebhook(blogId, request)
                            call.respond(HttpStatusCode.Created, webhook)
                        }

                        route("/{webhookId}") {
                            get {
                                val blogId = call.parameters["blogId"]!!.toLong()
                                val webhookId = call.parameters["webhookId"]!!.toLong()
                                val webhook = webhookService.getWebhook(blogId, webhookId)
                                if (webhook != null) {
                                    call.respond(HttpStatusCode.OK, webhook)
                                } else {
                                    call.respond(HttpStatusCode.NotFound)
                                }
                            }

                            put {
                                val blogId = call.parameters["blogId"]!!.toLong()
                                val webhookId = call.parameters["webhookId"]!!.toLong()
                                val request = call.receive<UpdateWebhookRequest>()
                                val updated = webhookService.updateWebhook(blogId, webhookId, request)
                                if (updated != null) {
                                    call.respond(HttpStatusCode.OK, updated)
                                } else {
                                    call.respond(HttpStatusCode.NotFound)
                                }
                            }

                            delete {
                                val blogId = call.parameters["blogId"]!!.toLong()
                                val webhookId = call.parameters["webhookId"]!!.toLong()
                                val deleted = webhookService.deleteWebhook(blogId, webhookId)
                                if (deleted) {
                                    call.respond(HttpStatusCode.NoContent)
                                } else {
                                    call.respond(HttpStatusCode.NotFound)
                                }
                            }

                            post("/test") {
                                val blogId = call.parameters["blogId"]!!.toLong()
                                val webhookId = call.parameters["webhookId"]!!.toLong()
                                val result = webhookService.sendTestPing(blogId, webhookId)
                                call.respond(HttpStatusCode.OK, result)
                            }

                            get("/deliveries") {
                                val blogId = call.parameters["blogId"]!!.toLong()
                                val webhookId = call.parameters["webhookId"]!!.toLong()
                                val deliveries = webhookService.listDeliveries(blogId, webhookId)
                                call.respond(HttpStatusCode.OK, deliveries)
                            }
                        }
                    }

                    // --- MEDIA UPLOADS ---
                    post("/media") {
                        val blogId = call.parameters["blogId"]!!.toLong()
                        val multipart = call.receiveMultipart()
                        var uploadedUrl: String? = null

                        multipart.forEachPart { part ->
                            if (part is PartData.FileItem) {
                                val originalName = part.originalFileName ?: "file"
                                val inputStream = part.streamProvider()
                                val (savedName, _) = storageService.saveFile(blogId, originalName, inputStream)
                                uploadedUrl = "/uploads/$savedName"
                            }
                            part.dispose()
                        }

                        if (uploadedUrl != null) {
                            call.respond(HttpStatusCode.Created, mapOf("url" to uploadedUrl))
                        } else {
                            call.respond(HttpStatusCode.BadRequest, "No file uploaded")
                        }
                    }

                    // --- CONTENT IMPORTERS ---
                    route("/import") {
                        post("/wordpress") {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val blog = blogService.getBlogById(blogId)
                                ?: return@post call.respond(HttpStatusCode.NotFound, "Blog not found")

                            val multipart = call.receiveMultipart()
                            var result: ImportResultDto? = null

                            multipart.forEachPart { part ->
                                if (part is PartData.FileItem) {
                                    val inputStream = part.streamProvider()
                                    result = importService.importWordPressXml(blogId, inputStream, blog.defaultLanguage)
                                }
                                part.dispose()
                            }

                            if (result != null) {
                                call.respond(HttpStatusCode.OK, result!!)
                            } else {
                                call.respond(HttpStatusCode.BadRequest, "No WordPress XML file uploaded")
                            }
                        }

                        post("/markdown") {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val blog = blogService.getBlogById(blogId)
                                ?: return@post call.respond(HttpStatusCode.NotFound, "Blog not found")

                            val multipart = call.receiveMultipart()
                            var result: ImportResultDto? = null

                            multipart.forEachPart { part ->
                                if (part is PartData.FileItem) {
                                    val originalName = part.originalFileName ?: "post.md"
                                    val isZip = originalName.endsWith(".zip", ignoreCase = true)
                                    val inputStream = part.streamProvider()
                                    result = importService.importMarkdownBundle(
                                        blogId = blogId,
                                        inputStream = inputStream,
                                        isZip = isZip,
                                        defaultLanguage = blog.defaultLanguage,
                                        fallbackFilename = originalName
                                    )
                                }
                                part.dispose()
                            }

                            if (result != null) {
                                call.respond(HttpStatusCode.OK, result!!)
                            } else {
                                call.respond(HttpStatusCode.BadRequest, "No Markdown or ZIP file uploaded")
                            }
                        }
                    }

                    // --- ANALYTICS ---
                    route("/analytics") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val days = call.request.queryParameters["days"]?.toIntOrNull() ?: 30
                            val overview = analyticsService.getOverview(blogId, days)
                            call.respond(HttpStatusCode.OK, overview)
                        }
                    }

                    // --- TEAM & COLLABORATION ---
                    route("/team") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val overview = memberService.getTeamOverview(blogId)
                            call.respond(HttpStatusCode.OK, overview)
                        }

                        post("/invites") {
                            val principal = call.principal<UserPrincipal>()!!
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val req = call.receive<InviteMemberRequest>()
                            val invite = memberService.inviteMember(blogId, principal.userId, req)
                            call.respond(HttpStatusCode.Created, invite)
                        }

                        put("/members/{targetUserId}") {
                            val principal = call.principal<UserPrincipal>()!!
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val targetUserId = call.parameters["targetUserId"]!!.toLong()
                            val req = call.receive<UpdateMemberRoleRequest>()
                            val member = memberService.updateMemberRole(blogId, principal.userId, targetUserId, req.role)
                            call.respond(HttpStatusCode.OK, member)
                        }

                        delete("/members/{targetUserId}") {
                            val principal = call.principal<UserPrincipal>()!!
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val targetUserId = call.parameters["targetUserId"]!!.toLong()
                            val success = memberService.removeMember(blogId, principal.userId, targetUserId)
                            call.respond(HttpStatusCode.OK, mapOf("success" to success))
                        }

                        delete("/invites/{inviteId}") {
                            val principal = call.principal<UserPrincipal>()!!
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val inviteId = call.parameters["inviteId"]!!.toLong()
                            val success = memberService.revokeInvite(blogId, principal.userId, inviteId)
                            call.respond(HttpStatusCode.OK, mapOf("success" to success))
                        }
                    }

                    // --- CUSTOM DOMAIN VERIFICATION ---
                    post("/domain/verify") {
                        val principal = call.principal<UserPrincipal>()!!
                        val blogId = call.parameters["blogId"]!!.toLong()
                        val result = domainService.verifyDomain(blogId, principal.userId)
                        call.respond(HttpStatusCode.OK, result)
                    }

                    // --- COMMENTS MODERATION ---
                    route("/comments") {
                        get {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val statusStr = call.request.queryParameters["status"]
                            val status = statusStr?.let { runCatching { CommentStatus.valueOf(it.uppercase()) }.getOrNull() }
                            val comments = commentService.listCommentsForBlog(blogId, status)
                            call.respond(HttpStatusCode.OK, comments)
                        }

                        put("/{commentId}/status") {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val commentId = call.parameters["commentId"]!!.toLong()
                            val req = call.receive<UpdateCommentStatusRequest>()
                            val updated = commentService.updateCommentStatus(commentId, blogId, req.status)
                            call.respond(HttpStatusCode.OK, updated)
                        }

                        delete("/{commentId}") {
                            val blogId = call.parameters["blogId"]!!.toLong()
                            val commentId = call.parameters["commentId"]!!.toLong()
                            val deleted = commentService.deleteComment(commentId, blogId)
                            call.respond(HttpStatusCode.OK, mapOf("success" to deleted))
                        }
                    }

                    // --- EXPORT & BACKUPS ---
                    get("/export.zip") {
                        val blogId = call.parameters["blogId"]!!.toLong()
                        val blog = blogService.getBlogById(blogId)
                            ?: return@get call.respond(HttpStatusCode.NotFound, "Blog not found")

                        val zipBytes = exportService.generateExportZip(blogId)
                        val filename = "${blog.subdomain}-backup.zip"

                        call.response.header(
                            HttpHeaders.ContentDisposition,
                            ContentDisposition.Attachment.withParameter(ContentDisposition.Parameters.FileName, filename).toString()
                        )
                        call.respondBytes(zipBytes, ContentType.Application.Zip)
                    }
                }
            }
        }
    }
}

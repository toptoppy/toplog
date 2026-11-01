package com.app.api.routing

import com.app.api.dto.*
import com.app.api.routing.console.*
import com.app.infrastructure.security.UserPrincipal
import com.app.infrastructure.storage.StorageService
import com.app.service.*
import io.ktor.http.*
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

                    // Modular Sub-Routes
                    consolePostRoutes(postService, revisionService, aiService, newsletterService)
                    consoleAiRoutes(aiService)
                    consoleSubscriberAndTagRoutes(newsletterService, tagService)
                    consoleWebhookRoutes(webhookService)
                    consoleMediaAndImportRoutes(storageService, importService, blogService)
                    consoleCollaborationRoutes(
                        analyticsService,
                        memberService,
                        domainService,
                        commentService,
                        exportService,
                        blogService
                    )
                }
            }
        }
    }
}

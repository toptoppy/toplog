package com.app.api.routing.console

import com.app.api.dto.InviteMemberRequest
import com.app.api.dto.UpdateCommentStatusRequest
import com.app.api.dto.UpdateMemberRoleRequest
import com.app.domain.model.CommentStatus
import com.app.infrastructure.security.UserPrincipal
import com.app.service.*
import io.ktor.http.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.consoleCollaborationRoutes(
    analyticsService: AnalyticsService,
    memberService: MemberService,
    domainService: DomainService,
    commentService: CommentService,
    exportService: ExportService,
    blogService: BlogService
) {
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

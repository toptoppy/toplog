package com.app.api.routing.console

import com.app.api.dto.CreateSubscriberRequest
import com.app.api.dto.CreateTagRequest
import com.app.service.NewsletterService
import com.app.service.TagService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.consoleSubscriberAndTagRoutes(
    newsletterService: NewsletterService,
    tagService: TagService
) {
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
}

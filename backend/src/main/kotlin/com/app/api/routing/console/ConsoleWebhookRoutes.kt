package com.app.api.routing.console

import com.app.api.dto.CreateWebhookRequest
import com.app.api.dto.UpdateWebhookRequest
import com.app.service.WebhookService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.consoleWebhookRoutes(webhookService: WebhookService) {
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
}

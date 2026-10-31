package com.app.api.routing

import com.app.service.BlogService
import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.internalRoutes(blogService: BlogService) {
    get("/health") {
        call.respond(HttpStatusCode.OK, mapOf("status" to "UP"))
    }

    route("/api/internal") {
        // Caddy on-demand TLS hook: checks if incoming custom domain belongs to a blog
        get("/check-domain") {
            val domain = call.request.queryParameters["domain"]
            if (domain.isNullOrBlank()) {
                return@get call.respond(HttpStatusCode.BadRequest, "Missing domain parameter")
            }

            val exists = blogService.checkDomainExists(domain)
            if (exists) {
                call.respond(HttpStatusCode.OK, "Domain is valid")
            } else {
                call.respond(HttpStatusCode.NotFound, "Domain not registered")
            }
        }
    }
}

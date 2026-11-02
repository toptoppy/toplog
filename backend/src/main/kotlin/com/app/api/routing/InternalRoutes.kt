package com.app.api.routing

import com.app.domain.model.DnsStatus
import com.app.service.BlogService
import com.app.service.DomainService
import io.ktor.http.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.internalRoutes(
    blogService: BlogService,
    domainService: DomainService
) {
    get("/health") {
        call.respond(HttpStatusCode.OK, mapOf("status" to "UP"))
    }

    route("/api/internal") {
        // Caddy on-demand TLS hook: checks if incoming custom domain belongs to a blog and is verified
        get("/check-domain") {
            val domain = call.request.queryParameters["domain"]
            if (domain.isNullOrBlank()) {
                return@get call.respond(HttpStatusCode.BadRequest, "Missing domain parameter")
            }

            val cleanDomain = domain.substringBefore(':').lowercase().trim()
            val blog = blogService.findBlogByExactDomain(cleanDomain)
            if (blog == null) {
                return@get call.respond(HttpStatusCode.NotFound, "Domain not registered")
            }

            // 1. If it's the blog's default platform subdomain (e.g. tech or tech.localhost), approve immediately
            if (blog.subdomain.equals(cleanDomain, ignoreCase = true) || cleanDomain.startsWith("${blog.subdomain}.")) {
                return@get call.respond(HttpStatusCode.OK, "Platform subdomain approved for TLS")
            }

            // 2. If it's a verified custom domain, approve immediately
            if (blog.domainDnsStatus == DnsStatus.VERIFIED.name) {
                return@get call.respond(HttpStatusCode.OK, "Verified custom domain approved for TLS")
            }

            // 3. On-demand JIT verification: check if DNS records just propagated
            val result = domainService.verifyDomainInternal(blog.id)
            if (result.verified) {
                call.respond(HttpStatusCode.OK, "Custom domain verified on-demand approved for TLS")
            } else {
                call.respond(HttpStatusCode.Forbidden, "Domain DNS not yet pointing to server")
            }
        }
    }
}

package com.app.api.routing

import com.app.api.dto.LoginRequest
import com.app.api.dto.RegisterRequest
import com.app.api.dto.UserDto
import com.app.infrastructure.security.RateLimiter
import com.app.infrastructure.security.UserPrincipal
import com.app.infrastructure.security.checkRateLimit
import com.app.service.AuthService
import io.ktor.http.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

val registerRateLimiter = RateLimiter(maxRequests = 30, windowMs = 60_000L)
val loginRateLimiter = RateLimiter(maxRequests = 50, windowMs = 60_000L)

fun Route.authRoutes(authService: AuthService) {
    route("/api/auth") {
        post("/register") {
            if (!call.checkRateLimit(registerRateLimiter)) return@post
            val request = call.receive<RegisterRequest>()
            val response = authService.register(request)
            call.respond(HttpStatusCode.Created, response)
        }

        post("/login") {
            if (!call.checkRateLimit(loginRateLimiter)) return@post
            val request = call.receive<LoginRequest>()
            val response = authService.login(request)
            call.respond(HttpStatusCode.OK, response)
        }

        authenticate("auth-jwt") {
            get("/me") {
                val principal = call.principal<UserPrincipal>()
                    ?: return@get call.respond(HttpStatusCode.Unauthorized)
                val user = authService.getUserById(principal.userId)
                    ?: return@get call.respond(HttpStatusCode.NotFound)

                call.respond(
                    HttpStatusCode.OK,
                    UserDto(
                        id = user.id,
                        email = user.email,
                        name = user.name,
                        role = user.role
                    )
                )
            }
        }
    }
}

package com.app.api.routing.console

import com.app.api.dto.*
import com.app.domain.model.UserRole
import com.app.infrastructure.security.UserPrincipal
import com.app.service.UserService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

val AdminGuardPlugin = createRouteScopedPlugin("AdminGuardPlugin") {
    on(AuthenticationChecked) { call ->
        val principal = call.principal<UserPrincipal>()
        if (principal == null || principal.role != UserRole.ADMIN) {
            call.respond(
                HttpStatusCode.Forbidden,
                mapOf("error" to "Access denied: Platform Administrator privileges required")
            )
        }
    }
}

fun Route.consoleUserRoutes(userService: UserService) {
    route("/users") {
        install(AdminGuardPlugin)

        get {
            val query = call.request.queryParameters["q"]
            val roleStr = call.request.queryParameters["role"]
            val role = roleStr?.let { runCatching { UserRole.valueOf(it) }.getOrNull() }

            val users = userService.listUsers(query, role)
            call.respond(HttpStatusCode.OK, users)
        }

        post {
            val request = call.receive<CreatePlatformUserRequest>()
            try {
                val created = userService.createUser(request)
                call.respond(HttpStatusCode.Created, created)
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Invalid request")))
            }
        }

        get("/{id}") {
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@get call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid user ID"))

            try {
                val user = userService.getUser(id)
                call.respond(HttpStatusCode.OK, user)
            } catch (e: NoSuchElementException) {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to (e.message ?: "User not found")))
            }
        }

        put("/{id}") {
            val principal = call.principal<UserPrincipal>()!!
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@put call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid user ID"))

            val request = call.receive<UpdatePlatformUserRequest>()
            try {
                val updated = userService.updateUser(id, principal, request)
                call.respond(HttpStatusCode.OK, updated)
            } catch (e: NoSuchElementException) {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to (e.message ?: "User not found")))
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Invalid request")))
            } catch (e: IllegalStateException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Illegal state")))
            }
        }

        put("/{id}/password") {
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@put call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid user ID"))

            val request = call.receive<ResetUserPasswordRequest>()
            try {
                userService.resetPassword(id, request)
                call.respond(HttpStatusCode.OK, mapOf("message" to "Password has been successfully updated"))
            } catch (e: NoSuchElementException) {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to (e.message ?: "User not found")))
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Invalid request")))
            }
        }

        delete("/{id}") {
            val principal = call.principal<UserPrincipal>()!!
            val id = call.parameters["id"]?.toLongOrNull()
                ?: return@delete call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Invalid user ID"))

            val request = runCatching { call.receive<DeleteUserRequest>() }.getOrDefault(DeleteUserRequest())
            try {
                val response = userService.deleteUser(id, principal, request)
                call.respond(HttpStatusCode.OK, response)
            } catch (e: NoSuchElementException) {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to (e.message ?: "User not found")))
            } catch (e: IllegalArgumentException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Invalid request")))
            } catch (e: IllegalStateException) {
                call.respond(HttpStatusCode.BadRequest, mapOf("error" to (e.message ?: "Illegal state")))
            }
        }
    }
}

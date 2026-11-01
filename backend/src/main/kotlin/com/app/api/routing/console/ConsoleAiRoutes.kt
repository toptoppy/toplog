package com.app.api.routing.console

import com.app.api.dto.AiTestResponseDto
import com.app.api.dto.TestAiRequest
import com.app.service.AiService
import io.ktor.http.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.consoleAiRoutes(aiService: AiService) {
    route("/ai") {
        get("/status") {
            val blogId = call.parameters["blogId"]!!.toLong()
            call.respond(HttpStatusCode.OK, aiService.getStatus(blogId))
        }

        post("/test") {
            val blogId = call.parameters["blogId"]!!.toLong()
            val request = try {
                call.receive<TestAiRequest>()
            } catch (_: Exception) {
                TestAiRequest()
            }

            try {
                val result = aiService.testConnection(
                    blogId = blogId,
                    overrideKey = request.apiKey,
                    overrideBaseUrl = request.baseUrl,
                    overrideModel = request.model
                )
                call.respond(HttpStatusCode.OK, result)
            } catch (err: Exception) {
                val status = aiService.getStatus(blogId)
                call.respond(
                    HttpStatusCode.OK,
                    AiTestResponseDto(
                        success = false,
                        provider = status.provider,
                        model = request.model ?: status.model,
                        error = err.message ?: "Failed to connect to AI provider"
                    )
                )
            }
        }
    }
}

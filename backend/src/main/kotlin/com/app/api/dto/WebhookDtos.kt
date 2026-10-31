package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class WebhookResponseDto(
    val id: Long,
    val blogId: Long,
    val url: String,
    val secret: String,
    val events: List<String>,
    val isActive: Boolean,
    val createdAt: String,
    val updatedAt: String
)

@Serializable
data class CreateWebhookRequest(
    val url: String,
    val secret: String? = null,
    val events: List<String> = listOf("post.published", "post.updated", "post.deleted"),
    val isActive: Boolean = true
)

@Serializable
data class UpdateWebhookRequest(
    val url: String,
    val secret: String? = null,
    val events: List<String>,
    val isActive: Boolean
)

@Serializable
data class WebhookDeliveryDto(
    val id: Long,
    val webhookId: Long,
    val event: String,
    val payload: String,
    val responseStatus: Int?,
    val responseBody: String?,
    val durationMs: Int?,
    val errorMessage: String?,
    val createdAt: String
)

@Serializable
data class TestWebhookResultDto(
    val success: Boolean,
    val statusCode: Int?,
    val durationMs: Int,
    val errorMessage: String? = null
)

package com.app.api.dto

import com.app.domain.model.SubscriberStatus
import kotlinx.serialization.Serializable

@Serializable
data class SubscriberDto(
    val id: Long,
    val blogId: Long,
    val email: String,
    val name: String?,
    val status: SubscriberStatus,
    val createdAt: String
)

@Serializable
data class PublicSubscribeRequest(
    val email: String,
    val name: String? = null
)

@Serializable
data class PublicSubscribeResponse(
    val success: Boolean,
    val message: String
)

@Serializable
data class CreateSubscriberRequest(
    val email: String,
    val name: String? = null,
    val status: SubscriberStatus = SubscriberStatus.ACTIVE
)

@Serializable
data class NewsletterDto(
    val id: Long,
    val blogId: Long,
    val postId: Long?,
    val subject: String,
    val recipientCount: Int,
    val sentAt: String
)

@Serializable
data class SendNewsletterRequest(
    val subject: String? = null,
    val contentHtml: String? = null
)

@Serializable
data class SendNewsletterResponse(
    val success: Boolean,
    val recipientCount: Int,
    val message: String
)

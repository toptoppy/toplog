package com.app.domain.model

import kotlinx.serialization.Serializable
import java.time.Instant

@Serializable
enum class UserRole {
    ADMIN,
    AUTHOR,
    EDITOR
}

@Serializable
enum class PostStatus {
    DRAFT,
    PUBLISHED,
    SCHEDULED
}

@Serializable
enum class SubscriberStatus {
    ACTIVE,
    UNSUBSCRIBED
}

@Serializable
enum class BlogRole {
    ADMIN,
    EDITOR,
    AUTHOR
}

@Serializable
enum class CommentStatus {
    PENDING,
    APPROVED,
    SPAM,
    DELETED
}

@Serializable
enum class DnsStatus {
    UNVERIFIED,
    VERIFIED,
    MISCONFIGURED
}

data class User(
    val id: Long,
    val email: String,
    val passwordHash: String,
    val name: String,
    val role: UserRole,
    val createdAt: Instant
)

data class Blog(
    val id: Long,
    val ownerId: Long,
    val subdomain: String,
    val customDomain: String?,
    val title: String,
    val description: String?,
    val defaultLanguage: String,
    val themeName: String,
    val codeHead: String? = null,
    val codeFoot: String? = null,
    val accentColor: String = "#2563eb",
    val fontFamily: String = "Inter",
    val logoUrl: String? = null,
    val faviconUrl: String? = null,
    val domainVerifiedAt: Instant? = null,
    val domainDnsStatus: String = "UNVERIFIED",
    val darkModeEnabled: Boolean = true,
    val aiApiKey: String? = null,
    val aiBaseUrl: String? = null,
    val aiModel: String? = null,
    val createdAt: Instant
)

data class Post(
    val id: Long,
    val blogId: Long,
    val isFeatured: Boolean,
    val isPage: Boolean,
    val featuredImageUrl: String?,
    val canonicalUrl: String?,
    val createdAt: Instant,
    val updatedAt: Instant
)

data class PostVariant(
    val id: Long,
    val postId: Long,
    val languageCode: String,
    val slug: String,
    val title: String,
    val description: String?,
    val contentJson: String,
    val contentHtml: String,
    val status: PostStatus,
    val publishedAt: Instant?,
    val scheduledAt: Instant? = null,
    val updatedAt: Instant
)

data class Tag(
    val id: Long,
    val blogId: Long,
    val name: String,
    val slug: String,
    val color: String? = null
)

data class Media(
    val id: Long,
    val blogId: Long,
    val filename: String,
    val filePath: String,
    val mimeType: String,
    val fileSize: Long,
    val createdAt: Instant
)

data class Webhook(
    val id: Long,
    val blogId: Long,
    val url: String,
    val secret: String,
    val events: String,
    val isActive: Boolean,
    val createdAt: Instant,
    val updatedAt: Instant
)

data class WebhookDelivery(
    val id: Long,
    val webhookId: Long,
    val event: String,
    val payload: String,
    val responseStatus: Int?,
    val responseBody: String?,
    val durationMs: Int?,
    val errorMessage: String?,
    val createdAt: Instant
)

data class Subscriber(
    val id: Long,
    val blogId: Long,
    val email: String,
    val name: String?,
    val status: SubscriberStatus,
    val token: String,
    val createdAt: Instant
)

data class Newsletter(
    val id: Long,
    val blogId: Long,
    val postId: Long?,
    val subject: String,
    val contentHtml: String,
    val recipientCount: Int,
    val sentAt: Instant
)

data class PageView(
    val id: Long,
    val blogId: Long,
    val postId: Long?,
    val path: String,
    val referrer: String?,
    val deviceType: String,
    val userAgent: String?,
    val createdAt: Instant
)

data class BlogMember(
    val id: Long,
    val blogId: Long,
    val userId: Long,
    val role: BlogRole,
    val createdAt: Instant
)

data class BlogInvite(
    val id: Long,
    val blogId: Long,
    val email: String,
    val role: BlogRole,
    val token: String,
    val createdAt: Instant,
    val expiresAt: Instant
)

data class Comment(
    val id: Long,
    val blogId: Long,
    val postId: Long,
    val parentId: Long?,
    val authorName: String,
    val authorEmail: String,
    val authorWebsite: String?,
    val content: String,
    val status: CommentStatus,
    val createdAt: Instant
)

data class PostRevision(
    val id: Long,
    val postVariantId: Long,
    val title: String,
    val slug: String,
    val contentHtml: String,
    val contentJson: String,
    val description: String?,
    val status: PostStatus,
    val createdByUserId: Long?,
    val createdAt: Instant
)

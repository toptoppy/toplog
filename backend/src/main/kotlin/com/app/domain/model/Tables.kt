package com.app.domain.model

import org.jetbrains.exposed.dao.id.LongIdTable
import org.jetbrains.exposed.sql.javatime.timestamp
import java.time.Instant

object Users : LongIdTable("users") {
    val email = varchar("email", 255).uniqueIndex()
    val passwordHash = varchar("password_hash", 255)
    val name = varchar("name", 255)
    val role = varchar("role", 50).default(UserRole.AUTHOR.name)
    val createdAt = timestamp("created_at").default(Instant.now())
}

object Blogs : LongIdTable("blogs") {
    val ownerId = reference("owner_id", Users)
    val subdomain = varchar("subdomain", 100).uniqueIndex()
    val customDomain = varchar("custom_domain", 255).nullable().uniqueIndex()
    val title = varchar("title", 255)
    val description = text("description").nullable()
    val defaultLanguage = varchar("default_language", 10).default("en")
    val themeName = varchar("theme_name", 100).default("default")
    val codeHead = text("code_head").nullable()
    val codeFoot = text("code_foot").nullable()
    val accentColor = varchar("accent_color", 30).default("#2563eb")
    val fontFamily = varchar("font_family", 50).default("Inter")
    val logoUrl = text("logo_url").nullable()
    val faviconUrl = text("favicon_url").nullable()
    val domainVerifiedAt = timestamp("domain_verified_at").nullable()
    val domainDnsStatus = varchar("domain_dns_status", 50).default("UNVERIFIED")
    val darkModeEnabled = bool("dark_mode_enabled").default(true)
    val aiApiKey = text("ai_api_key").nullable()
    val aiBaseUrl = text("ai_base_url").nullable()
    val aiModel = varchar("ai_model", 100).nullable()
    val createdAt = timestamp("created_at").default(Instant.now())
}

object Posts : LongIdTable("posts") {
    val blogId = reference("blog_id", Blogs)
    val isFeatured = bool("is_featured").default(false)
    val isPage = bool("is_page").default(false)
    val featuredImageUrl = text("featured_image_url").nullable()
    val canonicalUrl = text("canonical_url").nullable()
    val createdAt = timestamp("created_at").default(Instant.now())
    val updatedAt = timestamp("updated_at").default(Instant.now())
}

object PostVariants : LongIdTable("post_variants") {
    val postId = reference("post_id", Posts)
    val languageCode = varchar("language_code", 10)
    val slug = varchar("slug", 255)
    val title = varchar("title", 255)
    val description = text("description").nullable()
    val contentJson = text("content_json").default("{}")
    val contentHtml = text("content_html").default("")
    val status = varchar("status", 50).default(PostStatus.DRAFT.name)
    val publishedAt = timestamp("published_at").nullable()
    val scheduledAt = timestamp("scheduled_at").nullable()
    val updatedAt = timestamp("updated_at").default(Instant.now())

    init {
        uniqueIndex(postId, languageCode)
    }
}

object Tags : LongIdTable("tags") {
    val blogId = reference("blog_id", Blogs)
    val name = varchar("name", 100)
    val slug = varchar("slug", 100)

    init {
        uniqueIndex(blogId, slug)
    }
}

object PostTags : org.jetbrains.exposed.sql.Table("post_tags") {
    val postId = reference("post_id", Posts)
    val tagId = reference("tag_id", Tags)
    override val primaryKey = PrimaryKey(postId, tagId)
}

object MediaTable : LongIdTable("media") {
    val blogId = reference("blog_id", Blogs)
    val filename = varchar("filename", 255)
    val filePath = text("file_path")
    val mimeType = varchar("mime_type", 100)
    val fileSize = long("file_size")
    val createdAt = timestamp("created_at").default(Instant.now())
}

object Webhooks : LongIdTable("webhooks") {
    val blogId = reference("blog_id", Blogs)
    val url = varchar("url", 1024)
    val secret = varchar("secret", 255)
    val events = varchar("events", 255).default("post.published,post.updated,post.deleted")
    val isActive = bool("is_active").default(true)
    val createdAt = timestamp("created_at").default(Instant.now())
    val updatedAt = timestamp("updated_at").default(Instant.now())
}

object WebhookDeliveries : LongIdTable("webhook_deliveries") {
    val webhookId = reference("webhook_id", Webhooks)
    val event = varchar("event", 100)
    val payload = text("payload")
    val responseStatus = integer("response_status").nullable()
    val responseBody = text("response_body").nullable()
    val durationMs = integer("duration_ms").nullable()
    val errorMessage = text("error_message").nullable()
    val createdAt = timestamp("created_at").default(Instant.now())
}

object Subscribers : LongIdTable("subscribers") {
    val blogId = reference("blog_id", Blogs)
    val email = varchar("email", 255)
    val name = varchar("name", 255).nullable()
    val status = varchar("status", 50).default(SubscriberStatus.ACTIVE.name)
    val token = varchar("token", 255)
    val createdAt = timestamp("created_at").default(Instant.now())

    init {
        uniqueIndex(blogId, email)
    }
}

object Newsletters : LongIdTable("newsletters") {
    val blogId = reference("blog_id", Blogs)
    val postId = reference("post_id", Posts).nullable()
    val subject = varchar("subject", 255)
    val contentHtml = text("content_html")
    val recipientCount = integer("recipient_count").default(0)
    val sentAt = timestamp("sent_at").default(Instant.now())
}

object PageViews : LongIdTable("page_views") {
    val blogId = reference("blog_id", Blogs)
    val postId = reference("post_id", Posts).nullable()
    val path = varchar("path", 500)
    val referrer = varchar("referrer", 500).nullable()
    val deviceType = varchar("device_type", 50).default("desktop")
    val userAgent = varchar("user_agent", 500).nullable()
    val createdAt = timestamp("created_at").default(Instant.now())
}

object BlogMembers : LongIdTable("blog_members") {
    val blogId = reference("blog_id", Blogs)
    val userId = reference("user_id", Users)
    val role = varchar("role", 50).default("AUTHOR")
    val createdAt = timestamp("created_at").default(Instant.now())

    init {
        uniqueIndex(blogId, userId)
    }
}

object BlogInvites : LongIdTable("blog_invites") {
    val blogId = reference("blog_id", Blogs)
    val email = varchar("email", 255)
    val role = varchar("role", 50).default("AUTHOR")
    val token = varchar("token", 255).uniqueIndex()
    val createdAt = timestamp("created_at").default(Instant.now())
    val expiresAt = timestamp("expires_at")
}

object Comments : LongIdTable("comments") {
    val blogId = reference("blog_id", Blogs)
    val postId = reference("post_id", Posts)
    val parentId = reference("parent_id", Comments).nullable()
    val authorName = varchar("author_name", 100)
    val authorEmail = varchar("author_email", 255)
    val authorWebsite = varchar("author_website", 255).nullable()
    val content = text("content")
    val status = varchar("status", 50).default("PENDING")
    val createdAt = timestamp("created_at").default(Instant.now())
}

object PostRevisions : LongIdTable("post_revisions") {
    val postVariantId = reference("post_variant_id", PostVariants)
    val title = varchar("title", 255)
    val slug = varchar("slug", 255)
    val contentHtml = text("content_html")
    val contentJson = text("content_json").default("{}")
    val description = text("description").nullable()
    val status = varchar("status", 50)
    val createdByUserId = reference("created_by_user_id", Users).nullable()
    val createdAt = timestamp("created_at").default(Instant.now())
}

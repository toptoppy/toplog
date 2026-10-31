package com.app.service

import com.app.api.dto.*
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.slf4j.LoggerFactory
import java.security.SecureRandom
import java.time.Instant
import java.util.*

class NewsletterService(
    private val postService: PostService
) {
    private val logger = LoggerFactory.getLogger(NewsletterService::class.java)

    private fun generateToken(): String {
        val bytes = ByteArray(20)
        SecureRandom().nextBytes(bytes)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
    }

    suspend fun listSubscribers(blogId: Long): List<SubscriberDto> = dbQuery {
        Subscribers.selectAll()
            .where { Subscribers.blogId eq blogId }
            .orderBy(Subscribers.createdAt to SortOrder.DESC)
            .map { it.toSubscriberDto() }
    }

    suspend fun subscribe(blogId: Long, email: String, name: String?): PublicSubscribeResponse {
        val cleanEmail = email.trim().lowercase()
        if (!cleanEmail.contains("@") || !cleanEmail.contains(".")) {
            throw IllegalArgumentException("Please provide a valid email address.")
        }

        return dbQuery {
            val existing = Subscribers.selectAll()
                .where { (Subscribers.blogId eq blogId) and (Subscribers.email eq cleanEmail) }
                .firstOrNull()

            if (existing != null) {
                val currentStatus = SubscriberStatus.valueOf(existing[Subscribers.status])
                if (currentStatus == SubscriberStatus.UNSUBSCRIBED) {
                    Subscribers.update({ (Subscribers.blogId eq blogId) and (Subscribers.email eq cleanEmail) }) {
                        it[status] = SubscriberStatus.ACTIVE.name
                    }
                    PublicSubscribeResponse(true, "Welcome back! Your newsletter subscription has been reactivated.")
                } else {
                    PublicSubscribeResponse(true, "You're already subscribed to our newsletter!")
                }
            } else {
                val token = generateToken()
                Subscribers.insert {
                    it[Subscribers.blogId] = blogId
                    it[Subscribers.email] = cleanEmail
                    it[Subscribers.name] = name?.trim()?.ifBlank { null }
                    it[Subscribers.status] = SubscriberStatus.ACTIVE.name
                    it[Subscribers.token] = token
                    it[createdAt] = Instant.now()
                }
                PublicSubscribeResponse(true, "Thank you for subscribing! You'll receive our next dispatch.")
            }
        }
    }

    suspend fun unsubscribe(token: String): Boolean = dbQuery {
        val sub = Subscribers.selectAll()
            .where { Subscribers.token eq token.trim() }
            .firstOrNull() ?: return@dbQuery false

        Subscribers.update({ Subscribers.token eq token.trim() }) {
            it[status] = SubscriberStatus.UNSUBSCRIBED.name
        }
        true
    }

    suspend fun addSubscriber(blogId: Long, req: CreateSubscriberRequest): SubscriberDto {
        val cleanEmail = req.email.trim().lowercase()
        if (!cleanEmail.contains("@")) {
            throw IllegalArgumentException("Invalid email address")
        }

        return dbQuery {
            val existing = Subscribers.selectAll()
                .where { (Subscribers.blogId eq blogId) and (Subscribers.email eq cleanEmail) }
                .firstOrNull()

            if (existing != null) {
                Subscribers.update({ Subscribers.id eq existing[Subscribers.id] }) {
                    it[status] = req.status.name
                    req.name?.let { n -> it[name] = n.trim().ifBlank { null } }
                }
                Subscribers.selectAll().where { Subscribers.id eq existing[Subscribers.id] }.first().toSubscriberDto()
            } else {
                val id = Subscribers.insertAndGetId {
                    it[Subscribers.blogId] = blogId
                    it[email] = cleanEmail
                    it[name] = req.name?.trim()?.ifBlank { null }
                    it[status] = req.status.name
                    it[token] = generateToken()
                    it[createdAt] = Instant.now()
                }.value

                Subscribers.selectAll().where { Subscribers.id eq id }.first().toSubscriberDto()
            }
        }
    }

    suspend fun deleteSubscriber(blogId: Long, subscriberId: Long): Boolean = dbQuery {
        Subscribers.deleteWhere {
            (Subscribers.blogId eq blogId) and (Subscribers.id eq subscriberId)
        } > 0
    }

    suspend fun listNewsletters(blogId: Long): List<NewsletterDto> = dbQuery {
        Newsletters.selectAll()
            .where { Newsletters.blogId eq blogId }
            .orderBy(Newsletters.sentAt to SortOrder.DESC)
            .map {
                NewsletterDto(
                    id = it[Newsletters.id].value,
                    blogId = it[Newsletters.blogId].value,
                    postId = it[Newsletters.postId]?.value,
                    subject = it[Newsletters.subject],
                    recipientCount = it[Newsletters.recipientCount],
                    sentAt = it[Newsletters.sentAt].toString()
                )
            }
    }

    suspend fun sendNewsletterForPost(
        blogId: Long,
        postId: Long,
        customSubject: String? = null,
        customContentHtml: String? = null
    ): SendNewsletterResponse {
        val post = postService.getPostById(postId, blogId)
            ?: throw IllegalArgumentException("Post not found")

        val variant = post.variants.firstOrNull { it.status == PostStatus.PUBLISHED }
            ?: post.variants.firstOrNull()
            ?: throw IllegalArgumentException("No variant found for post")

        val activeSubscribers = dbQuery {
            Subscribers.selectAll()
                .where { (Subscribers.blogId eq blogId) and (Subscribers.status eq SubscriberStatus.ACTIVE.name) }
                .map { Pair(it[Subscribers.email], it[Subscribers.token]) }
        }

        if (activeSubscribers.isEmpty()) {
            return SendNewsletterResponse(
                success = false,
                recipientCount = 0,
                message = "No active subscribers found for this blog."
            )
        }

        val subject = customSubject?.trim()?.ifBlank { null }
            ?: "New Post: ${variant.title}"

        val contentHtml = customContentHtml?.trim()?.ifBlank { null }
            ?: variant.contentHtml

        // Record in newsletters history
        dbQuery {
            Newsletters.insert {
                it[Newsletters.blogId] = blogId
                it[Newsletters.postId] = postId
                it[Newsletters.subject] = subject
                it[Newsletters.contentHtml] = contentHtml
                it[recipientCount] = activeSubscribers.size
                it[sentAt] = Instant.now()
            }
        }

        logger.info("Dispatched newsletter '$subject' to ${activeSubscribers.size} subscribers for blogId=$blogId")

        return SendNewsletterResponse(
            success = true,
            recipientCount = activeSubscribers.size,
            message = "Newsletter dispatched successfully to ${activeSubscribers.size} active subscriber(s)!"
        )
    }

    private fun ResultRow.toSubscriberDto(): SubscriberDto = SubscriberDto(
        id = this[Subscribers.id].value,
        blogId = this[Subscribers.blogId].value,
        email = this[Subscribers.email],
        name = this[Subscribers.name],
        status = SubscriberStatus.valueOf(this[Subscribers.status]),
        createdAt = this[Subscribers.createdAt].toString()
    )
}

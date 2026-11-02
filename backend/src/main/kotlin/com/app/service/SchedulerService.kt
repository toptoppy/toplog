package com.app.service

import com.app.api.dto.PostVariantDto
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import kotlinx.coroutines.*
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.lessEq
import org.slf4j.LoggerFactory
import java.time.Instant

class SchedulerService(
    private val webhookService: WebhookService? = null,
    private val revisionService: RevisionService? = null,
    private val domainService: DomainService? = null,
    private val pollIntervalMs: Long = 30_000L
) {
    private val logger = LoggerFactory.getLogger(SchedulerService::class.java)
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())
    private var job: Job? = null

    fun start() {
        logger.info("Starting Post Scheduler & Auto-DNS Service (interval: ${pollIntervalMs}ms)...")
        job = scope.launch {
            var loopCount = 0
            while (isActive) {
                try {
                    publishDuePosts()
                    loopCount++
                    // Auto-check pending custom domains every 2 cycles (~60s)
                    if (loopCount % 2 == 0) {
                        domainService?.autoVerifyPendingDomains()
                    }
                } catch (e: CancellationException) {
                    throw e
                } catch (e: Exception) {
                    logger.error("Error in scheduler loop: ${e.message}", e)
                }
                delay(pollIntervalMs)
            }
        }
    }

    fun stop() {
        logger.info("Stopping Post Scheduler Service...")
        job?.cancel()
    }

    suspend fun publishDuePosts(targetBlogId: Long? = null): Int {
        val now = Instant.now()
        data class DuePostInfo(
            val variantId: Long,
            val postId: Long,
            val blogId: Long,
            val languageCode: String,
            val title: String,
            val slug: String,
            val description: String?,
            val contentHtml: String,
            val contentJson: String
        )

        val dueVariants = dbQuery {
            var query = (PostVariants innerJoin Posts)
                .selectAll()
                .where {
                    (PostVariants.status eq PostStatus.SCHEDULED.name) and
                    (PostVariants.scheduledAt.isNotNull()) and
                    (PostVariants.scheduledAt lessEq now)
                }

            if (targetBlogId != null) {
                query = query.andWhere { Posts.blogId eq targetBlogId }
            }

            query.map { row ->
                DuePostInfo(
                    variantId = row[PostVariants.id].value,
                    postId = row[Posts.id].value,
                    blogId = row[Posts.blogId].value,
                    languageCode = row[PostVariants.languageCode],
                    title = row[PostVariants.title],
                    slug = row[PostVariants.slug],
                    description = row[PostVariants.description],
                    contentHtml = row[PostVariants.contentHtml],
                    contentJson = row[PostVariants.contentJson]
                )
            }
        }

        if (dueVariants.isEmpty()) return 0

        logger.info("Found ${dueVariants.size} scheduled posts due for publication" + if (targetBlogId != null) " (blogId=$targetBlogId)" else "")

        for (due in dueVariants) {
            try {
                dbQuery {
                    PostVariants.update({ PostVariants.id eq due.variantId }) {
                        it[status] = PostStatus.PUBLISHED.name
                        it[publishedAt] = now
                        it[scheduledAt] = null
                        it[updatedAt] = now
                    }
                    Posts.update({ Posts.id eq due.postId }) {
                        it[updatedAt] = now
                    }
                }

                revisionService?.createRevision(
                    variantId = due.variantId,
                    title = due.title,
                    slug = due.slug,
                    contentHtml = due.contentHtml,
                    contentJson = due.contentJson,
                    description = due.description,
                    status = PostStatus.PUBLISHED,
                    userId = null
                )

                logger.info("Published scheduled post: '${due.title}' (postId=${due.postId}, blogId=${due.blogId})")

                // Dispatch post.published webhook
                val payload = """
                    {
                      "event": "post.published",
                      "blog_id": ${due.blogId},
                      "post_id": ${due.postId},
                      "language": "${due.languageCode}",
                      "title": "${due.title.replace("\"", "\\\"")}",
                      "slug": "${due.slug}",
                      "status": "PUBLISHED",
                      "published_at": "$now",
                      "updated_at": "$now"
                    }
                """.trimIndent()
                webhookService?.dispatch(due.blogId, "post.published", payload)
            } catch (e: Exception) {
                logger.error("Failed to publish scheduled variant ${due.variantId}: ${e.message}", e)
            }
        }

        return dueVariants.size
    }
}

package com.app.service

import com.app.api.dto.*
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.slf4j.LoggerFactory
import java.time.Instant

class CommentService(
    private val webhookService: WebhookService? = null
) {
    private val logger = LoggerFactory.getLogger(CommentService::class.java)

    suspend fun createPublicComment(blogId: Long, request: PublicCreateCommentRequest): CommentDto {
        // Honeypot anti-spam protection
        val initialStatus = if (!request.honeypot.isNullOrBlank()) {
            logger.warn("Bot detected via honeypot field from email=${request.authorEmail}")
            CommentStatus.SPAM
        } else {
            // Default to PENDING for moderation, or APPROVED if needed
            CommentStatus.PENDING
        }

        val now = Instant.now()
        val commentId = dbQuery {
            Comments.insert {
                it[Comments.blogId] = blogId
                it[Comments.postId] = request.postId
                it[Comments.parentId] = request.parentId
                it[Comments.authorName] = request.authorName.trim().take(100)
                it[Comments.authorEmail] = request.authorEmail.trim().lowercase().take(255)
                it[Comments.authorWebsite] = request.authorWebsite?.trim()?.take(255)
                it[Comments.content] = request.content.trim()
                it[Comments.status] = initialStatus.name
                it[Comments.createdAt] = now
            } get Comments.id
        }.value

        val created = getCommentById(commentId, blogId)!!

        // Dispatch webhook
        val payload = """
            {
              "event": "comment.created",
              "blog_id": $blogId,
              "post_id": ${request.postId},
              "comment_id": $commentId,
              "author_name": "${created.authorName.replace("\"", "\\\"")}",
              "status": "${created.status.name}",
              "created_at": "$now"
            }
        """.trimIndent()
        webhookService?.dispatch(blogId, "comment.created", payload)

        return created
    }

    suspend fun listCommentsForBlog(
        blogId: Long,
        status: CommentStatus? = null
    ): List<CommentDto> = dbQuery {
        var query = (Comments innerJoin Posts)
            .selectAll()
            .where { Comments.blogId eq blogId }

        if (status != null) {
            query = query.andWhere { Comments.status eq status.name }
        }

        query.orderBy(Comments.createdAt to SortOrder.DESC)
            .map { row ->
                val pId = row[Posts.id].value
                val variant = PostVariants.selectAll()
                    .where { PostVariants.postId eq pId }
                    .firstOrNull()

                CommentDto(
                    id = row[Comments.id].value,
                    blogId = blogId,
                    postId = pId,
                    parentId = row[Comments.parentId]?.value,
                    authorName = row[Comments.authorName],
                    authorEmail = row[Comments.authorEmail],
                    authorWebsite = row[Comments.authorWebsite],
                    content = row[Comments.content],
                    status = CommentStatus.valueOf(row[Comments.status]),
                    createdAt = row[Comments.createdAt].toString(),
                    postTitle = variant?.get(PostVariants.title) ?: "Post #$pId"
                )
            }
    }

    suspend fun listApprovedCommentsForPost(blogId: Long, postId: Long): List<PublicCommentDto> = dbQuery {
        val rows = Comments.selectAll()
            .where {
                (Comments.blogId eq blogId) and
                (Comments.postId eq postId) and
                (Comments.status eq CommentStatus.APPROVED.name)
            }
            .orderBy(Comments.createdAt to SortOrder.ASC)
            .map { row ->
                PublicCommentDto(
                    id = row[Comments.id].value,
                    postId = postId,
                    parentId = row[Comments.parentId]?.value,
                    authorName = row[Comments.authorName],
                    authorWebsite = row[Comments.authorWebsite],
                    content = row[Comments.content],
                    createdAt = row[Comments.createdAt].toString()
                )
            }

        // Nest into tree (parents + replies)
        val roots = mutableListOf<PublicCommentDto>()
        val repliesByParent = rows.filter { it.parentId != null }.groupBy { it.parentId!! }

        for (item in rows.filter { it.parentId == null }) {
            roots.add(item.copy(replies = repliesByParent[item.id] ?: emptyList()))
        }

        roots
    }

    suspend fun updateCommentStatus(commentId: Long, blogId: Long, newStatus: CommentStatus): CommentDto {
        dbQuery {
            Comments.update({ (Comments.id eq commentId) and (Comments.blogId eq blogId) }) {
                it[status] = newStatus.name
            }
        }
        return getCommentById(commentId, blogId) ?: throw NoSuchElementException("Comment not found")
    }

    suspend fun deleteComment(commentId: Long, blogId: Long): Boolean = dbQuery {
        Comments.deleteWhere { (Comments.id eq commentId) and (Comments.blogId eq blogId) } > 0
    }

    private suspend fun getCommentById(commentId: Long, blogId: Long): CommentDto? = dbQuery {
        val row = Comments.selectAll()
            .where { (Comments.id eq commentId) and (Comments.blogId eq blogId) }
            .firstOrNull() ?: return@dbQuery null

        val pId = row[Comments.postId].value
        val variant = PostVariants.selectAll()
            .where { PostVariants.postId eq pId }
            .firstOrNull()

        CommentDto(
            id = row[Comments.id].value,
            blogId = blogId,
            postId = pId,
            parentId = row[Comments.parentId]?.value,
            authorName = row[Comments.authorName],
            authorEmail = row[Comments.authorEmail],
            authorWebsite = row[Comments.authorWebsite],
            content = row[Comments.content],
            status = CommentStatus.valueOf(row[Comments.status]),
            createdAt = row[Comments.createdAt].toString(),
            postTitle = variant?.get(PostVariants.title) ?: "Post #$pId"
        )
    }
}

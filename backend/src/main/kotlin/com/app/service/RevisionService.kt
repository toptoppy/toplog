package com.app.service

import com.app.api.dto.PostRevisionDto
import com.app.api.dto.PostVariantDto
import com.app.api.dto.UpdateVariantRequest
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.time.Instant

class RevisionService {

    suspend fun createRevision(
        variantId: Long,
        title: String,
        slug: String,
        contentHtml: String,
        contentJson: String,
        description: String?,
        status: PostStatus,
        userId: Long?
    ): Long = dbQuery {
        PostRevisions.insert {
            it[postVariantId] = variantId
            it[PostRevisions.title] = title
            it[PostRevisions.slug] = slug
            it[PostRevisions.contentHtml] = contentHtml
            it[PostRevisions.contentJson] = contentJson
            it[PostRevisions.description] = description
            it[PostRevisions.status] = status.name
            it[createdByUserId] = userId
            it[createdAt] = Instant.now()
        } get PostRevisions.id
    }.value

    suspend fun listRevisions(variantId: Long): List<PostRevisionDto> = dbQuery {
        (PostRevisions leftJoin Users).selectAll()
            .where { PostRevisions.postVariantId eq variantId }
            .orderBy(PostRevisions.createdAt to SortOrder.DESC)
            .limit(30)
            .map { row ->
                val html = row[PostRevisions.contentHtml]
                val wordCount = countWords(html)
                PostRevisionDto(
                    id = row[PostRevisions.id].value,
                    postVariantId = variantId,
                    title = row[PostRevisions.title],
                    slug = row[PostRevisions.slug],
                    contentHtml = html,
                    contentJson = row[PostRevisions.contentJson],
                    description = row[PostRevisions.description],
                    status = PostStatus.valueOf(row[PostRevisions.status]),
                    createdByUserId = row[PostRevisions.createdByUserId]?.value,
                    createdByName = row.getOrNull(Users.name),
                    createdAt = row[PostRevisions.createdAt].toString(),
                    wordCount = wordCount
                )
            }
    }

    suspend fun getRevision(revisionId: Long): PostRevisionDto? = dbQuery {
        (PostRevisions leftJoin Users).selectAll()
            .where { PostRevisions.id eq revisionId }
            .firstOrNull()
            ?.let { row ->
                val html = row[PostRevisions.contentHtml]
                PostRevisionDto(
                    id = row[PostRevisions.id].value,
                    postVariantId = row[PostRevisions.postVariantId].value,
                    title = row[PostRevisions.title],
                    slug = row[PostRevisions.slug],
                    contentHtml = html,
                    contentJson = row[PostRevisions.contentJson],
                    description = row[PostRevisions.description],
                    status = PostStatus.valueOf(row[PostRevisions.status]),
                    createdByUserId = row[PostRevisions.createdByUserId]?.value,
                    createdByName = row.getOrNull(Users.name),
                    createdAt = row[PostRevisions.createdAt].toString(),
                    wordCount = countWords(html)
                )
            }
    }

    private fun countWords(html: String): Int {
        val text = html.replace(Regex("<[^>]*>"), " ").trim()
        if (text.isBlank()) return 0
        return text.split(Regex("\\s+")).size
    }
}

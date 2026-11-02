package com.app.service

import com.app.api.dto.CreateTagRequest
import com.app.api.dto.PublicTagDto
import com.app.api.dto.TagDto
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq

class TagService {

    suspend fun listTags(blogId: Long): List<TagDto> = dbQuery {
        Tags.selectAll()
            .where { Tags.blogId eq blogId }
            .orderBy(Tags.name to SortOrder.ASC)
            .map { it.toTag().toDto() }
    }

    suspend fun listPublicTags(blogId: Long): List<PublicTagDto> = dbQuery {
        val blogTags = Tags.selectAll()
            .where { Tags.blogId eq blogId }
            .orderBy(Tags.name to SortOrder.ASC)
            .toList()

        blogTags.map { row ->
            val tagId = row[Tags.id].value
            // Count distinct published posts linked to this tag
            val count = (PostTags innerJoin Posts innerJoin PostVariants)
                .select(Posts.id)
                .where {
                    (Posts.blogId eq blogId) and
                    (PostTags.tagId eq tagId) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .withDistinct()
                .count()

            PublicTagDto(
                id = tagId,
                name = row[Tags.name],
                slug = row[Tags.slug],
                postCount = count
            )
        }.filter { it.postCount > 0 }
    }

    suspend fun createTag(blogId: Long, request: CreateTagRequest): TagDto {
        val slug = request.slug.trim().lowercase()
        val name = request.name.trim()

        val tagId = dbQuery {
            Tags.insert {
                it[Tags.blogId] = blogId
                it[Tags.name] = name
                it[Tags.slug] = slug
            } get Tags.id
        }.value

        return TagDto(id = tagId, blogId = blogId, name = name, slug = slug)
    }

    suspend fun findOrCreateTag(blogId: Long, name: String, slug: String? = null): TagDto = dbQuery {
        val cleanName = name.trim()
        val cleanSlug = (slug ?: cleanName.lowercase().replace(Regex("[^a-z0-9]+"), "-").trim('-'))
            .ifEmpty { "tag" }

        val existing = Tags.selectAll()
            .where { (Tags.blogId eq blogId) and (Tags.slug eq cleanSlug) }
            .firstOrNull()

        if (existing != null) {
            existing.toTag().toDto()
        } else {
            val id = Tags.insert {
                it[Tags.blogId] = blogId
                it[Tags.name] = cleanName
                it[Tags.slug] = cleanSlug
            } get Tags.id

            TagDto(id = id.value, blogId = blogId, name = cleanName, slug = cleanSlug)
        }
    }

    suspend fun deleteTag(blogId: Long, tagId: Long): Boolean = dbQuery {
        Tags.deleteWhere { (Tags.id eq tagId) and (Tags.blogId eq blogId) } > 0
    }

    private fun ResultRow.toTag(): Tag = Tag(
        id = this[Tags.id].value,
        blogId = this[Tags.blogId].value,
        name = this[Tags.name],
        slug = this[Tags.slug]
    )

    private fun Tag.toDto(): TagDto = TagDto(
        id = this.id,
        blogId = this.blogId,
        name = this.name,
        slug = this.slug
    )
}

package com.app.service

import com.app.api.dto.CreateTagRequest
import com.app.api.dto.PublicTagDto
import com.app.api.dto.TagDto
import com.app.api.dto.UpdateTagRequest
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
                color = row[Tags.color],
                postCount = count
            )
        }.filter { it.postCount > 0 }
    }

    suspend fun createTag(blogId: Long, request: CreateTagRequest): TagDto {
        val slug = request.slug.trim().lowercase()
        val name = request.name.trim()
        val color = request.color?.trim()?.ifEmpty { null }

        val tagId = dbQuery {
            Tags.insert {
                it[Tags.blogId] = blogId
                it[Tags.name] = name
                it[Tags.slug] = slug
                it[Tags.color] = color
            } get Tags.id
        }.value

        return TagDto(id = tagId, blogId = blogId, name = name, slug = slug, color = color)
    }

    suspend fun updateTag(blogId: Long, tagId: Long, request: UpdateTagRequest): TagDto? = dbQuery {
        val updated = Tags.update({ (Tags.id eq tagId) and (Tags.blogId eq blogId) }) {
            request.name?.let { n -> it[name] = n.trim() }
            request.slug?.let { s -> it[slug] = s.trim().lowercase() }
            if (request.color != null) {
                it[color] = request.color.trim().ifEmpty { null }
            }
        }
        if (updated > 0) {
            Tags.selectAll().where { (Tags.id eq tagId) and (Tags.blogId eq blogId) }.firstOrNull()?.toTag()?.toDto()
        } else null
    }

    suspend fun findOrCreateTag(blogId: Long, name: String, slug: String? = null, color: String? = null): TagDto = dbQuery {
        val cleanName = name.trim()
        val cleanSlug = (slug ?: cleanName.lowercase().replace(Regex("[^a-z0-9]+"), "-").trim('-'))
            .ifEmpty { "tag" }
        val cleanColor = color?.trim()?.ifEmpty { null }

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
                it[Tags.color] = cleanColor
            } get Tags.id

            TagDto(id = id.value, blogId = blogId, name = cleanName, slug = cleanSlug, color = cleanColor)
        }
    }

    suspend fun deleteTag(blogId: Long, tagId: Long): Boolean = dbQuery {
        Tags.deleteWhere { (Tags.id eq tagId) and (Tags.blogId eq blogId) } > 0
    }

    private fun ResultRow.toTag(): Tag = Tag(
        id = this[Tags.id].value,
        blogId = this[Tags.blogId].value,
        name = this[Tags.name],
        slug = this[Tags.slug],
        color = this[Tags.color]
    )

    private fun Tag.toDto(): TagDto = TagDto(
        id = this.id,
        blogId = this.blogId,
        name = this.name,
        slug = this.slug,
        color = this.color
    )
}

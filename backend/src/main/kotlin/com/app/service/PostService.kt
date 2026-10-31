package com.app.service

import com.app.api.dto.*
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.time.Instant

class PostService(
    private val webhookService: WebhookService? = null,
    private val revisionService: RevisionService? = null
) {

    suspend fun listPosts(
        blogId: Long,
        languageCode: String? = null,
        status: PostStatus? = null,
        isPage: Boolean? = null
    ): List<PostListItemDto> = dbQuery {
        var query = (Posts innerJoin PostVariants).selectAll()
            .where { Posts.blogId eq blogId }

        if (isPage != null) {
            query = query.andWhere { Posts.isPage eq isPage }
        }
        if (languageCode != null) {
            query = query.andWhere { PostVariants.languageCode eq languageCode }
        }
        if (status != null) {
            query = query.andWhere { PostVariants.status eq status.name }
        }

        query.orderBy(Posts.createdAt to SortOrder.DESC)
            .map { row ->
                val postId = row[Posts.id].value
                val tags = (PostTags innerJoin Tags).selectAll()
                    .where { PostTags.postId eq postId }
                    .map { tagRow ->
                        TagDto(
                            id = tagRow[Tags.id].value,
                            blogId = tagRow[Tags.blogId].value,
                            name = tagRow[Tags.name],
                            slug = tagRow[Tags.slug]
                        )
                    }

                PostListItemDto(
                    id = postId,
                    blogId = row[Posts.blogId].value,
                    isFeatured = row[Posts.isFeatured],
                    isPage = row[Posts.isPage],
                    featuredImageUrl = row[Posts.featuredImageUrl],
                    createdAt = row[Posts.createdAt].toString(),
                    variant = row.toPostVariant().toDto(),
                    tags = tags
                )
            }
    }

    suspend fun searchPublishedPosts(
        blogId: Long,
        rawQuery: String,
        languageCode: String? = null,
        limit: Int = 20
    ): List<SearchResultItemDto> = dbQuery {
        val q = rawQuery.trim().lowercase()
        if (q.isBlank()) return@dbQuery emptyList()

        val likePattern = "%$q%"
        var query = (Posts innerJoin PostVariants).selectAll()
            .where {
                (Posts.blogId eq blogId) and
                (PostVariants.status eq PostStatus.PUBLISHED.name) and
                ((PostVariants.title.lowerCase() like likePattern) or
                 (PostVariants.description.lowerCase() like likePattern) or
                 (PostVariants.contentHtml.lowerCase() like likePattern))
            }

        if (languageCode != null) {
            query = query.andWhere { PostVariants.languageCode eq languageCode }
        }

        query.orderBy(PostVariants.publishedAt to SortOrder.DESC)
            .limit(limit)
            .map { row ->
                val postId = row[Posts.id].value
                val tags = (PostTags innerJoin Tags).selectAll()
                    .where { PostTags.postId eq postId }
                    .map { it[Tags.name] }

                SearchResultItemDto(
                    id = postId,
                    title = row[PostVariants.title],
                    slug = row[PostVariants.slug],
                    description = row[PostVariants.description],
                    featuredImageUrl = row[Posts.featuredImageUrl],
                    publishedAt = row[PostVariants.publishedAt]?.toString(),
                    tags = tags
                )
            }
    }

    suspend fun getPostById(postId: Long, blogId: Long): PostDto? = dbQuery {
        val postRow = Posts.selectAll()
            .where { (Posts.id eq postId) and (Posts.blogId eq blogId) }
            .firstOrNull() ?: return@dbQuery null

        val variants = PostVariants.selectAll()
            .where { PostVariants.postId eq postId }
            .map { it.toPostVariant().toDto() }

        val tags = (PostTags innerJoin Tags).selectAll()
            .where { PostTags.postId eq postId }
            .map {
                TagDto(
                    id = it[Tags.id].value,
                    blogId = it[Tags.blogId].value,
                    name = it[Tags.name],
                    slug = it[Tags.slug]
                )
            }

        PostDto(
            id = postRow[Posts.id].value,
            blogId = postRow[Posts.blogId].value,
            isFeatured = postRow[Posts.isFeatured],
            isPage = postRow[Posts.isPage],
            featuredImageUrl = postRow[Posts.featuredImageUrl],
            canonicalUrl = postRow[Posts.canonicalUrl],
            createdAt = postRow[Posts.createdAt].toString(),
            updatedAt = postRow[Posts.updatedAt].toString(),
            variants = variants,
            tags = tags
        )
    }

    suspend fun createPost(blogId: Long, request: CreatePostRequest): PostDto {
        val now = Instant.now()
        val lang = request.languageCode.trim().lowercase()
        val slug = request.slug.trim().lowercase()

        val postId = dbQuery {
            val scheduledInstant = request.scheduledAt?.let { runCatching { Instant.parse(it) }.getOrNull() }

            // 1. Insert Base Post
            val pId = Posts.insert {
                it[Posts.blogId] = blogId
                it[Posts.isFeatured] = request.isFeatured
                it[Posts.isPage] = request.isPage
                it[Posts.featuredImageUrl] = request.featuredImageUrl
                it[Posts.createdAt] = now
                it[Posts.updatedAt] = now
            } get Posts.id

            // 2. Insert Initial Variant
            PostVariants.insert {
                it[PostVariants.postId] = pId
                it[PostVariants.languageCode] = lang
                it[PostVariants.slug] = slug
                it[PostVariants.title] = request.title.trim()
                it[PostVariants.description] = request.description?.trim()
                it[PostVariants.contentJson] = request.contentJson
                it[PostVariants.contentHtml] = request.contentHtml
                it[PostVariants.status] = request.status.name
                it[PostVariants.publishedAt] = if (request.status == PostStatus.PUBLISHED) now else null
                it[PostVariants.scheduledAt] = scheduledInstant
                it[PostVariants.updatedAt] = now
            }

            // 3. Link Tags
            for (tagId in request.tagIds) {
                PostTags.insert {
                    it[PostTags.postId] = pId
                    it[PostTags.tagId] = tagId
                }
            }

            pId.value
        }

        val createdPost = getPostById(postId, blogId)!!
        val primaryVariant = createdPost.variants.firstOrNull()
        if (primaryVariant != null) {
            val event = if (primaryVariant.status == PostStatus.PUBLISHED) "post.published" else "post.created"
            webhookService?.dispatch(blogId, event, buildPostVariantPayload(event, blogId, postId, primaryVariant))
        }

        return createdPost
    }

    suspend fun updatePostBase(postId: Long, blogId: Long, request: UpdatePostRequest): PostDto {
        val now = Instant.now()
        dbQuery {
            Posts.update({ (Posts.id eq postId) and (Posts.blogId eq blogId) }) {
                request.isFeatured?.let { f -> it[Posts.isFeatured] = f }
                request.isPage?.let { p -> it[Posts.isPage] = p }
                request.featuredImageUrl?.let { img -> it[Posts.featuredImageUrl] = img }
                request.canonicalUrl?.let { c -> it[Posts.canonicalUrl] = c }
                it[Posts.updatedAt] = now
            }

            if (request.tagIds != null) {
                PostTags.deleteWhere { PostTags.postId eq postId }
                for (tagId in request.tagIds) {
                    PostTags.insert {
                        it[PostTags.postId] = postId
                        it[PostTags.tagId] = tagId
                    }
                }
            }
        }
        return getPostById(postId, blogId) ?: throw NoSuchElementException("Post not found")
    }

    suspend fun saveVariant(
        postId: Long,
        blogId: Long,
        languageCode: String,
        request: UpdateVariantRequest,
        userId: Long? = null
    ): PostVariantDto {
        val now = Instant.now()
        val lang = languageCode.trim().lowercase()
        val slug = request.slug.trim().lowercase()
        val scheduledInstant = request.scheduledAt?.let { runCatching { Instant.parse(it) }.getOrNull() }

        // Ensure post belongs to blog
        val post = getPostById(postId, blogId) ?: throw NoSuchElementException("Post not found")

        dbQuery {
            val existingVariant = PostVariants.selectAll()
                .where { (PostVariants.postId eq postId) and (PostVariants.languageCode eq lang) }
                .firstOrNull()

            if (existingVariant == null) {
                PostVariants.insert {
                    it[PostVariants.postId] = postId
                    it[PostVariants.languageCode] = lang
                    it[PostVariants.slug] = slug
                    it[PostVariants.title] = request.title.trim()
                    it[PostVariants.description] = request.description?.trim()
                    it[PostVariants.contentJson] = request.contentJson ?: "{}"
                    it[PostVariants.contentHtml] = request.contentHtml ?: ""
                    val st = request.status ?: PostStatus.DRAFT
                    it[PostVariants.status] = st.name
                    it[PostVariants.publishedAt] = if (st == PostStatus.PUBLISHED) now else null
                    it[PostVariants.scheduledAt] = if (st == PostStatus.SCHEDULED) scheduledInstant else null
                    it[PostVariants.updatedAt] = now
                }
            } else {
                PostVariants.update({ (PostVariants.postId eq postId) and (PostVariants.languageCode eq lang) }) {
                    it[PostVariants.slug] = slug
                    it[PostVariants.title] = request.title.trim()
                    request.description?.let { d -> it[PostVariants.description] = d.trim() }
                    request.contentJson?.let { j -> it[PostVariants.contentJson] = j }
                    request.contentHtml?.let { h -> it[PostVariants.contentHtml] = h }
                    request.status?.let { s ->
                        it[PostVariants.status] = s.name
                        if (s == PostStatus.PUBLISHED) {
                            if (existingVariant[PostVariants.publishedAt] == null) {
                                it[PostVariants.publishedAt] = now
                            }
                            it[PostVariants.scheduledAt] = null
                        } else if (s == PostStatus.SCHEDULED) {
                            if (scheduledInstant != null) {
                                it[PostVariants.scheduledAt] = scheduledInstant
                            }
                            it[PostVariants.publishedAt] = null
                        } else if (s == PostStatus.DRAFT) {
                            it[PostVariants.scheduledAt] = null
                        }
                    }
                    if (request.status == null && scheduledInstant != null) {
                        it[PostVariants.scheduledAt] = scheduledInstant
                    }
                    it[PostVariants.updatedAt] = now
                }
            }
        }

        val savedVariant = dbQuery {
            PostVariants.selectAll()
                .where { (PostVariants.postId eq postId) and (PostVariants.languageCode eq lang) }
                .first()
                .toPostVariant()
                .toDto()
        }

        // Automatic revision snapshot for version control
        revisionService?.createRevision(
            variantId = savedVariant.id,
            title = savedVariant.title,
            slug = savedVariant.slug,
            contentHtml = savedVariant.contentHtml,
            contentJson = savedVariant.contentJson,
            description = savedVariant.description,
            status = savedVariant.status,
            userId = userId
        )

        val event = if (savedVariant.status == PostStatus.PUBLISHED) "post.published" else "post.updated"
        webhookService?.dispatch(blogId, event, buildPostVariantPayload(event, blogId, postId, savedVariant))

        return savedVariant
    }

    suspend fun getVariantByLanguage(postId: Long, languageCode: String): PostVariantDto? = dbQuery {
        PostVariants.selectAll()
            .where { (PostVariants.postId eq postId) and (PostVariants.languageCode eq languageCode.trim().lowercase()) }
            .firstOrNull()
            ?.toPostVariant()
            ?.toDto()
    }

    suspend fun deletePost(postId: Long, blogId: Long): Boolean {
        val deleted = dbQuery {
            Posts.deleteWhere { (Posts.id eq postId) and (Posts.blogId eq blogId) } > 0
        }
        if (deleted) {
            webhookService?.dispatch(
                blogId,
                "post.deleted",
                """{"event":"post.deleted","blog_id":$blogId,"post_id":$postId}"""
            )
        }
        return deleted
    }

    private fun buildPostVariantPayload(
        event: String,
        blogId: Long,
        postId: Long,
        variant: PostVariantDto
    ): String {
        val publishedAtVal = if (variant.publishedAt != null) "\"${variant.publishedAt}\"" else "null"
        return """
            {
              "event": "$event",
              "blog_id": $blogId,
              "post_id": $postId,
              "language": "${variant.languageCode}",
              "title": ${jsonEscape(variant.title)},
              "slug": "${variant.slug}",
              "status": "${variant.status}",
              "published_at": $publishedAtVal,
              "updated_at": "${variant.updatedAt}"
            }
        """.trimIndent()
    }

    private fun jsonEscape(str: String): String {
        return "\"" + str.replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t") + "\""
    }

    private fun ResultRow.toPostVariant(): PostVariant = PostVariant(
        id = this[PostVariants.id].value,
        postId = this[PostVariants.postId].value,
        languageCode = this[PostVariants.languageCode],
        slug = this[PostVariants.slug],
        title = this[PostVariants.title],
        description = this[PostVariants.description],
        contentJson = this[PostVariants.contentJson],
        contentHtml = this[PostVariants.contentHtml],
        status = PostStatus.valueOf(this[PostVariants.status]),
        publishedAt = this[PostVariants.publishedAt],
        scheduledAt = this[PostVariants.scheduledAt],
        updatedAt = this[PostVariants.updatedAt]
    )

    private fun PostVariant.toDto(): PostVariantDto = PostVariantDto(
        id = this.id,
        postId = this.postId,
        languageCode = this.languageCode,
        slug = this.slug,
        title = this.title,
        description = this.description,
        contentJson = this.contentJson,
        contentHtml = this.contentHtml,
        status = this.status,
        publishedAt = this.publishedAt?.toString(),
        scheduledAt = this.scheduledAt?.toString(),
        updatedAt = this.updatedAt.toString()
    )
}

package com.app.service

import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import com.app.infrastructure.theme.PebbleRenderer
import org.jetbrains.exposed.sql.*
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.*

data class RenderedView(
    val content: String,
    val contentType: String = "text/html; charset=utf-8"
)

class DeliveryService(
    private val pebbleRenderer: PebbleRenderer,
    private val commentService: CommentService? = null,
    private val tagService: TagService? = null,
    private val postService: PostService? = null
) {
    private val dateFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH)
        .withZone(ZoneId.of("UTC"))
    private val isoFormatter = DateTimeFormatter.ISO_INSTANT

    private fun blogToContext(blog: Blog): Map<String, Any?> = mapOf(
        "id" to blog.id,
        "title" to blog.title,
        "description" to blog.description,
        "subdomain" to blog.subdomain,
        "customDomain" to blog.customDomain,
        "codeHead" to blog.codeHead,
        "codeFoot" to blog.codeFoot,
        "accentColor" to blog.accentColor,
        "fontFamily" to blog.fontFamily,
        "logoUrl" to blog.logoUrl,
        "faviconUrl" to blog.faviconUrl,
        "darkModeEnabled" to blog.darkModeEnabled
    )

    suspend fun renderIndex(blog: Blog, languageCode: String = blog.defaultLanguage, baseUrl: String? = null): RenderedView {
        val posts = dbQuery {
            (Posts innerJoin PostVariants).selectAll()
                .where {
                    (Posts.blogId eq blog.id) and
                    (Posts.isPage eq false) and
                    (PostVariants.languageCode eq languageCode) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .orderBy(PostVariants.publishedAt to SortOrder.DESC)
                .map { row ->
                    val publishedAt = row[PostVariants.publishedAt]
                    val contentHtml = row[PostVariants.contentHtml]
                    val wordCount = contentHtml.replace(Regex("<[^>]*>"), " ").trim().split(Regex("\\s+")).filter { it.isNotBlank() }.size
                    val readingTime = Math.max(1, Math.ceil(wordCount / 200.0).toInt())
                    mapOf(
                        "id" to row[Posts.id].value,
                        "title" to row[PostVariants.title],
                        "slug" to row[PostVariants.slug],
                        "description" to row[PostVariants.description],
                        "isFeatured" to row[Posts.isFeatured],
                        "featuredImageUrl" to row[Posts.featuredImageUrl],
                        "publishedAt" to publishedAt?.let { isoFormatter.format(it) },
                        "publishedAtFormatted" to publishedAt?.let { dateFormatter.format(it) },
                        "readingTimeMinutes" to readingTime,
                        "wordCount" to wordCount
                    )
                }
        }

        val allTags = tagService?.listPublicTags(blog.id) ?: emptyList()

        val context = mapOf(
            "blog" to blogToContext(blog),
            "posts" to posts,
            "tags" to allTags,
            "language" to languageCode,
            "baseUrl" to baseUrl,
            "currentYear" to Calendar.getInstance().get(Calendar.YEAR)
        )

        val html = pebbleRenderer.render("themes/${blog.themeName}/index.pebble", context)
        return RenderedView(html)
    }

    suspend fun renderPost(blog: Blog, slug: String, languageCode: String = blog.defaultLanguage, baseUrl: String? = null): RenderedView? {
        val cleanSlug = slug.trim().lowercase()

        val postData = dbQuery {
            val row = (Posts innerJoin PostVariants).selectAll()
                .where {
                    (Posts.blogId eq blog.id) and
                    (PostVariants.slug eq cleanSlug) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .firstOrNull() ?: return@dbQuery null

            val postId = row[Posts.id].value
            val tags = (PostTags innerJoin Tags).selectAll()
                .where { PostTags.postId eq postId }
                .map {
                    mapOf(
                        "name" to it[Tags.name],
                        "slug" to it[Tags.slug],
                        "color" to it[Tags.color]
                    )
                }

            val publishedAt = row[PostVariants.publishedAt]
            Pair(
                mapOf(
                    "id" to postId,
                    "title" to row[PostVariants.title],
                    "slug" to row[PostVariants.slug],
                    "description" to row[PostVariants.description],
                    "contentHtml" to row[PostVariants.contentHtml],
                    "isFeatured" to row[Posts.isFeatured],
                    "isPage" to row[Posts.isPage],
                    "featuredImageUrl" to row[Posts.featuredImageUrl],
                    "canonicalUrl" to row[Posts.canonicalUrl],
                    "publishedAt" to publishedAt?.let { isoFormatter.format(it) },
                    "publishedAtFormatted" to publishedAt?.let { dateFormatter.format(it) }
                ),
                tags
            )
        } ?: return null

        val postId = postData.first["id"] as Long
        val comments = commentService?.listApprovedCommentsForPost(blog.id, postId) ?: emptyList()

        val content = postData.first["contentHtml"] as? String ?: ""
        val wordCount = content.replace(Regex("<[^>]*>"), " ").trim().split(Regex("\\s+")).filter { it.isNotBlank() }.size
        val readingTime = Math.max(1, Math.ceil(wordCount / 200.0).toInt())

        val tagIds = dbQuery {
            PostTags.selectAll()
                .where { PostTags.postId eq postId }
                .map { it[PostTags.tagId].value }
        }

        val relatedPosts = postService?.getRelatedPosts(
            blogId = blog.id,
            currentPostId = postId,
            tagIds = tagIds,
            limit = 3,
            languageCode = languageCode
        )?.map { rel ->
            mapOf(
                "id" to rel.id,
                "title" to rel.title,
                "slug" to rel.slug,
                "description" to rel.description,
                "featuredImageUrl" to rel.featuredImageUrl,
                "publishedAtFormatted" to rel.publishedAtFormatted,
                "readingTimeMinutes" to rel.readingTimeMinutes,
                "tags" to rel.tags
            )
        } ?: emptyList()

        val alternateLanguages = dbQuery {
            PostVariants.selectAll()
                .where {
                    (PostVariants.postId eq postId) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .orderBy(PostVariants.languageCode to SortOrder.ASC)
                .map {
                    mapOf(
                        "languageCode" to it[PostVariants.languageCode],
                        "slug" to it[PostVariants.slug],
                        "title" to it[PostVariants.title]
                    )
                }
        }

        val context = mapOf(
            "blog" to blogToContext(blog),
            "post" to postData.first,
            "postId" to postId,
            "comments" to comments,
            "relatedPosts" to relatedPosts,
            "alternateLanguages" to alternateLanguages,
            "readingTimeMinutes" to readingTime,
            "wordCount" to wordCount,
            "tags" to postData.second,
            "language" to languageCode,
            "baseUrl" to baseUrl,
            "currentYear" to Calendar.getInstance().get(Calendar.YEAR)
        )

        val html = pebbleRenderer.render("themes/${blog.themeName}/post.pebble", context)
        return RenderedView(html)
    }

    suspend fun renderTag(blog: Blog, tagSlug: String, languageCode: String = blog.defaultLanguage, baseUrl: String? = null): RenderedView? {
        val cleanSlug = tagSlug.trim().lowercase()

        val tag = dbQuery {
            Tags.selectAll()
                .where { (Tags.blogId eq blog.id) and (Tags.slug eq cleanSlug) }
                .firstOrNull()
        } ?: return null

        val posts = dbQuery {
            (Posts innerJoin PostVariants innerJoin PostTags).selectAll()
                .where {
                    (Posts.blogId eq blog.id) and
                    (PostTags.tagId eq tag[Tags.id]) and
                    (PostVariants.languageCode eq languageCode) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .orderBy(PostVariants.publishedAt to SortOrder.DESC)
                .map { row ->
                    val publishedAt = row[PostVariants.publishedAt]
                    val contentHtml = row[PostVariants.contentHtml]
                    val wordCount = contentHtml.replace(Regex("<[^>]*>"), " ").trim().split(Regex("\\s+")).filter { it.isNotBlank() }.size
                    val readingTime = Math.max(1, Math.ceil(wordCount / 200.0).toInt())
                    mapOf(
                        "id" to row[Posts.id].value,
                        "title" to row[PostVariants.title],
                        "slug" to row[PostVariants.slug],
                        "description" to row[PostVariants.description],
                        "featuredImageUrl" to row[Posts.featuredImageUrl],
                        "publishedAt" to publishedAt?.let { isoFormatter.format(it) },
                        "publishedAtFormatted" to publishedAt?.let { dateFormatter.format(it) },
                        "readingTimeMinutes" to readingTime,
                        "wordCount" to wordCount
                    )
                }
        }

        val allTags = tagService?.listPublicTags(blog.id) ?: emptyList()

        val context = mapOf(
            "blog" to blogToContext(blog),
            "tag" to mapOf(
                "name" to tag[Tags.name],
                "slug" to tag[Tags.slug],
                "color" to tag[Tags.color]
            ),
            "posts" to posts,
            "tags" to allTags,
            "language" to languageCode,
            "baseUrl" to baseUrl,
            "currentYear" to Calendar.getInstance().get(Calendar.YEAR)
        )

        val html = pebbleRenderer.render("themes/${blog.themeName}/tag.pebble", context)
        return RenderedView(html)
    }

    suspend fun renderSearch(
        blog: Blog,
        query: String,
        results: List<com.app.api.dto.SearchResultItemDto>,
        tagSlug: String? = null,
        languageCode: String = blog.defaultLanguage,
        baseUrl: String? = null
    ): RenderedView {
        val allTags = tagService?.listPublicTags(blog.id) ?: emptyList()
        val context = mapOf(
            "blog" to blogToContext(blog),
            "query" to query,
            "tag" to tagSlug,
            "tags" to allTags,
            "results" to results,
            "total" to results.size,
            "language" to languageCode,
            "baseUrl" to baseUrl,
            "currentYear" to Calendar.getInstance().get(Calendar.YEAR)
        )
        val html = pebbleRenderer.render("themes/${blog.themeName}/search.pebble", context)
        return RenderedView(html)
    }

    suspend fun renderUnsubscribe(
        blog: Blog,
        success: Boolean,
        baseUrl: String? = null
    ): RenderedView {
        val message = if (success) {
            "You have been successfully unsubscribed from this newsletter."
        } else {
            "Invalid or expired unsubscribe link."
        }
        val context = mapOf(
            "blog" to blogToContext(blog),
            "success" to success,
            "message" to message,
            "language" to blog.defaultLanguage,
            "baseUrl" to baseUrl,
            "currentYear" to Calendar.getInstance().get(Calendar.YEAR)
        )
        val html = pebbleRenderer.render("themes/${blog.themeName}/unsubscribe.pebble", context)
        return RenderedView(html)
    }

    suspend fun generateFeed(blog: Blog, baseUrl: String): RenderedView {
        val posts = dbQuery {
            (Posts innerJoin PostVariants).selectAll()
                .where {
                    (Posts.blogId eq blog.id) and
                    (Posts.isPage eq false) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .orderBy(PostVariants.publishedAt to SortOrder.DESC)
                .limit(20)
                .map { row ->
                    val publishedAt = row[PostVariants.publishedAt]
                    Triple(
                        row[PostVariants.title],
                        row[PostVariants.slug],
                        publishedAt?.let { isoFormatter.format(it) } ?: ""
                    )
                }
        }

        val sb = StringBuilder()
        sb.append("""<?xml version="1.0" encoding="utf-8"?>""")
        sb.append("""<feed xmlns="http://www.w3.org/2005/Atom">""")
        sb.append("<title>${escapeXml(blog.title)}</title>")
        sb.append("<id>$baseUrl/</id>")
        sb.append("<link href=\"$baseUrl/feed.atom\" rel=\"self\" />")
        sb.append("<link href=\"$baseUrl/\" />")
        if (posts.isNotEmpty()) {
            sb.append("<updated>${posts.first().third}</updated>")
        }

        for ((title, slug, date) in posts) {
            sb.append("<entry>")
            sb.append("<title>${escapeXml(title)}</title>")
            sb.append("<link href=\"$baseUrl/$slug\" />")
            sb.append("<id>$baseUrl/$slug</id>")
            sb.append("<updated>$date</updated>")
            sb.append("</entry>")
        }
        sb.append("</feed>")

        return RenderedView(sb.toString(), contentType = "application/atom+xml; charset=utf-8")
    }

    suspend fun generateSitemap(blog: Blog, baseUrl: String): RenderedView {
        val slugs = dbQuery {
            (Posts innerJoin PostVariants).selectAll()
                .where {
                    (Posts.blogId eq blog.id) and
                    (PostVariants.status eq PostStatus.PUBLISHED.name)
                }
                .map { it[PostVariants.slug] }
        }

        val sb = StringBuilder()
        sb.append("""<?xml version="1.0" encoding="UTF-8"?>""")
        sb.append("""<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">""")
        sb.append("<url><loc>$baseUrl/</loc><priority>1.0</priority></url>")

        for (slug in slugs) {
            sb.append("<url><loc>$baseUrl/$slug</loc><priority>0.8</priority></url>")
        }
        sb.append("</urlset>")

        return RenderedView(sb.toString(), contentType = "application/xml; charset=utf-8")
    }

    private fun escapeXml(str: String): String {
        return str.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&apos;")
    }
}

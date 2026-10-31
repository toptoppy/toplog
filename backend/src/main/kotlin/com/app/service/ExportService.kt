package com.app.service

import com.app.api.dto.CommentDto
import com.app.api.dto.TagDto
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import org.jetbrains.exposed.sql.selectAll
import java.io.ByteArrayOutputStream
import java.nio.charset.StandardCharsets
import java.time.Instant
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

class ExportService(
    private val blogService: BlogService,
    private val postService: PostService
) {
    private val json = Json { prettyPrint = true }

    suspend fun generateExportZip(blogId: Long): ByteArray {
        val blog = blogService.getBlogById(blogId) ?: throw NoSuchElementException("Blog not found")
        val posts = postService.listPosts(blogId)

        val subscribers = dbQuery {
            Subscribers.selectAll()
                .where { Subscribers.blogId eq blogId }
                .map {
                    mapOf(
                        "id" to it[Subscribers.id].value,
                        "email" to it[Subscribers.email],
                        "name" to (it[Subscribers.name] ?: ""),
                        "status" to it[Subscribers.status],
                        "createdAt" to it[Subscribers.createdAt].toString()
                    )
                }
        }

        val comments = dbQuery {
            Comments.selectAll()
                .where { Comments.blogId eq blogId }
                .map {
                    CommentDto(
                        id = it[Comments.id].value,
                        blogId = blogId,
                        postId = it[Comments.postId].value,
                        parentId = it[Comments.parentId]?.value,
                        authorName = it[Comments.authorName],
                        authorEmail = it[Comments.authorEmail],
                        authorWebsite = it[Comments.authorWebsite],
                        content = it[Comments.content],
                        status = CommentStatus.valueOf(it[Comments.status]),
                        createdAt = it[Comments.createdAt].toString()
                    )
                }
        }

        val tags = dbQuery {
            Tags.selectAll()
                .where { Tags.blogId eq blogId }
                .map {
                    TagDto(
                        id = it[Tags.id].value,
                        blogId = blogId,
                        name = it[Tags.name],
                        slug = it[Tags.slug]
                    )
                }
        }

        val byteStream = ByteArrayOutputStream()
        ZipOutputStream(byteStream).use { zip ->
            // 1. Metadata
            val metadataJson = """
                {
                  "exportedAt": "${Instant.now()}",
                  "blogId": ${blog.id},
                  "title": "${escape(blog.title)}",
                  "subdomain": "${blog.subdomain}",
                  "customDomain": ${if (blog.customDomain != null) "\"${blog.customDomain}\"" else "null"},
                  "defaultLanguage": "${blog.defaultLanguage}",
                  "accentColor": "${blog.accentColor}",
                  "fontFamily": "${blog.fontFamily}",
                  "themeName": "${blog.themeName}"
                }
            """.trimIndent()
            addEntry(zip, "metadata.json", metadataJson)

            // 2. Data JSON dumps
            addEntry(zip, "data/tags.json", json.encodeToString(tags))
            addEntry(zip, "data/comments.json", json.encodeToString(comments))

            // 3. Subscribers CSV
            val csvBuilder = StringBuilder("id,email,name,status,created_at\n")
            for (sub in subscribers) {
                csvBuilder.append("${sub["id"]},\"${sub["email"]}\",\"${sub["name"]}\",${sub["status"]},${sub["createdAt"]}\n")
            }
            addEntry(zip, "data/subscribers.csv", csvBuilder.toString())

            // 4. Posts in Markdown format with YAML frontmatter
            val distinctPostIds = posts.map { it.id }.distinct()
            val addedPaths = mutableSetOf<String>()

            for (postId in distinctPostIds) {
                val fullPost = postService.getPostById(postId, blogId) ?: continue
                for (v in fullPost.variants) {
                    val mdBuilder = StringBuilder()
                    mdBuilder.append("---\n")
                    mdBuilder.append("title: \"${escape(v.title)}\"\n")
                    mdBuilder.append("slug: \"${v.slug}\"\n")
                    mdBuilder.append("language: \"${v.languageCode}\"\n")
                    mdBuilder.append("status: \"${v.status}\"\n")
                    mdBuilder.append("published_at: ${if (v.publishedAt != null) "\"${v.publishedAt}\"" else "null"}\n")
                    if (v.description != null) {
                        mdBuilder.append("description: \"${escape(v.description)}\"\n")
                    }
                    if (fullPost.featuredImageUrl != null) {
                        mdBuilder.append("featured_image: \"${fullPost.featuredImageUrl}\"\n")
                    }
                    val tagNames = fullPost.tags.joinToString(", ") { "\"${escape(it.name)}\"" }
                    mdBuilder.append("tags: [$tagNames]\n")
                    mdBuilder.append("---\n\n")

                    // Body
                    mdBuilder.append(v.contentHtml)

                    var fileName = "posts/${v.languageCode}/${v.slug}.md"
                    var counter = 1
                    while (addedPaths.contains(fileName)) {
                        fileName = "posts/${v.languageCode}/${v.slug}-${counter++}.md"
                    }
                    addedPaths.add(fileName)
                    addEntry(zip, fileName, mdBuilder.toString())
                }
            }
        }

        return byteStream.toByteArray()
    }

    private fun addEntry(zip: ZipOutputStream, path: String, content: String) {
        val entry = ZipEntry(path)
        zip.putNextEntry(entry)
        zip.write(content.toByteArray(StandardCharsets.UTF_8))
        zip.closeEntry()
    }

    private fun escape(str: String): String = str.replace("\\", "\\\\").replace("\"", "\\\"")
}

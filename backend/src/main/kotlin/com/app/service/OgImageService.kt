package com.app.service

import com.app.domain.model.Blog
import com.app.domain.model.PostStatus
import com.app.domain.model.PostVariants
import com.app.domain.model.Posts
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.andWhere
import org.jetbrains.exposed.sql.selectAll
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Locale

class OgImageService {

    private val dateFormatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.ENGLISH)
        .withZone(ZoneId.of("UTC"))

    suspend fun renderOgSvg(blog: Blog, slug: String, allowDrafts: Boolean = false): String? {
        val cleanSlug = slug.trim().lowercase()

        val postInfo = dbQuery {
            var query = (Posts innerJoin PostVariants).selectAll()
                .where {
                    (Posts.blogId eq blog.id) and
                    (PostVariants.slug eq cleanSlug)
                }
            if (!allowDrafts) {
                query = query.andWhere { PostVariants.status eq PostStatus.PUBLISHED.name }
            }
            query.firstOrNull()
                ?.let { row ->
                    val title = row[PostVariants.title]
                    val pubAt = row[PostVariants.publishedAt]
                    val content = row[PostVariants.contentHtml]
                    val wordCount = content.replace(Regex("<[^>]*>"), " ").trim().split(Regex("\\s+")).size
                    val readingTime = Math.max(1, Math.ceil(wordCount / 200.0).toInt())
                    val dateFormatted = pubAt?.let { dateFormatter.format(it) } ?: "Preview Draft"
                    Triple(title, dateFormatted, readingTime)
                }
        } ?: return null

        val (title, dateStr, readTime) = postInfo
        val accent = blog.accentColor.ifBlank { "#2563eb" }

        // Wrap title to max ~3 lines (around 32 characters per line)
        val words = title.split(" ")
        val lines = mutableListOf<String>()
        var cur = StringBuilder()
        for (w in words) {
            if (cur.length + w.length + 1 > 34) {
                lines.add(cur.toString())
                cur = StringBuilder(w)
                if (lines.size >= 3) break
            } else {
                if (cur.isNotEmpty()) cur.append(" ")
                cur.append(w)
            }
        }
        if (cur.isNotEmpty() && lines.size < 3) {
            lines.add(cur.toString())
        }
        if (words.size > 15 && lines.size == 3) {
            lines[2] = lines[2].take(30) + "..."
        }

        val titleYStarts = when (lines.size) {
            1 -> listOf(320)
            2 -> listOf(280, 345)
            else -> listOf(240, 305, 370)
        }

        val textElements = lines.mapIndexed { idx, line ->
            """<text x="100" y="${titleYStarts[idx]}" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="800" fill="#ffffff" letter-spacing="-1">${escapeXml(line)}</text>"""
        }.joinToString("\n")

        return """
            <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
                <defs>
                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#0f172a" />
                        <stop offset="60%" stop-color="#1e1b4b" />
                        <stop offset="100%" stop-color="#090d16" />
                    </linearGradient>
                    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="$accent" />
                        <stop offset="100%" stop-color="#a855f7" />
                    </linearGradient>
                </defs>

                <!-- Background -->
                <rect width="1200" height="630" fill="url(#bgGrad)" />

                <!-- Ambient Glow Circle -->
                <circle cx="1050" cy="150" r="320" fill="$accent" opacity="0.18" filter="blur(80px)" />
                <circle cx="150" cy="500" r="280" fill="#a855f7" opacity="0.12" filter="blur(80px)" />

                <!-- Top Brand Badge -->
                <g transform="translate(100, 90)">
                    <rect width="44" height="44" rx="12" fill="url(#accentGrad)" />
                    <circle cx="22" cy="22" r="8" fill="#ffffff" />
                    <text x="58" y="29" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="700" fill="#f8fafc">${escapeXml(blog.title)}</text>
                </g>

                <!-- Post Title -->
                $textElements

                <!-- Bottom Meta Bar -->
                <g transform="translate(100, 520)">
                    <rect x="0" y="0" width="1000" height="1" fill="#334155" />
                    <text x="0" y="40" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#94a3b8">$dateStr &bull; $readTime min read</text>
                    <text x="1000" y="40" text-anchor="end" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="700" fill="$accent">${escapeXml(blog.customDomain ?: "${blog.subdomain}.localhost")}</text>
                </g>
            </svg>
        """.trimIndent()
    }

    private fun escapeXml(str: String): String = str
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace("\"", "&quot;")
        .replace("'", "&apos;")
}

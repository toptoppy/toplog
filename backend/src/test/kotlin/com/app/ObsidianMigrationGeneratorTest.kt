package com.app

import org.commonmark.ext.autolink.AutolinkExtension
import org.commonmark.ext.gfm.tables.TablesExtension
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import org.junit.jupiter.api.Test
import java.io.File
import java.util.regex.Pattern

class ObsidianMigrationGeneratorTest {

    data class NoteData(
        val relPath: String,
        val folder: String,
        val baseName: String,
        val title: String,
        val slug: String,
        val lang: String,
        val tags: List<String>,
        val date: String,
        val description: String,
        val bodyMarkdown: String
    )

    private val extensions = listOf(TablesExtension.create(), AutolinkExtension.create())
    private val mdParser = Parser.builder().extensions(extensions).build()
    private val htmlRenderer = HtmlRenderer.builder().extensions(extensions).build()

    @Test
    fun generateV11Migration() {
        val vaultDir = File("/Users/toptoppy/projects/obsidian/docs-v2")
        require(vaultDir.exists()) { "Obsidian vault does not exist at $vaultDir" }

        val targetFolders = listOf(
            "Notes/AI",
            "Notes/Kotlin",
            "Notes/Architecture",
            "Notes/Tools",
            "Notes/Infrastructure",
            "Projects"
        )

        val noteFiles = mutableListOf<File>()
        for (folder in targetFolders) {
            val dir = File(vaultDir, folder)
            if (dir.exists()) {
                dir.walkTopDown().filter { it.isFile && it.extension.lowercase() == "md" }.forEach {
                    noteFiles.add(it)
                }
            }
        }
        noteFiles.sortBy { it.absolutePath }
        println("Found ${noteFiles.size} markdown files.")

        // Phase 1: Pre-parse basic info to build slug and title maps
        val rawNotes = mutableListOf<RawParsed>()
        for (file in noteFiles) {
            val relPath = file.relativeTo(vaultDir).path
            val folder = file.parentFile.relativeTo(vaultDir).path
            val baseName = file.nameWithoutExtension
            val text = file.readText(Charsets.UTF_8)

            val (frontmatterMap, body) = parseFrontmatter(text)

            var title = frontmatterMap["title"]?.let { decodeUnicodeEscapes(it).trim().trim('"', '\'') } ?: ""
            if (title.isBlank()) {
                val h1Match = Regex("""^#\s+(.+)$""", RegexOption.MULTILINE).find(body)
                title = h1Match?.groupValues?.get(1)?.trim() ?: baseName.replace("-", " ").capitalizeWords()
            }

            var slug = slugify(baseName)
            if (slug.isBlank()) slug = slugify(title)

            val hasThai = Regex("""[\u0E00-\u0E7F]""").containsMatchIn(title + body.take(300))
            val lang = if (hasThai || file.name.endsWith("-th.md")) "th" else "en"

            val category = folder.split("/").last()
            val tags = mutableListOf(category)
            frontmatterMap["tags"]?.let { tagsStr ->
                parseTagsList(tagsStr).forEach { t ->
                    if (!tags.contains(t) && t.isNotBlank()) tags.add(t)
                }
            }

            var date = frontmatterMap["created"] ?: frontmatterMap["date"] ?: "2024-06-01"
            val dateMatch = Regex("""\d{4}-\d{2}-\d{2}""").find(date)
            date = dateMatch?.value ?: "2024-06-01"

            val desc = extractDescription(frontmatterMap["description"] ?: frontmatterMap["summary"] ?: "", body)

            rawNotes.add(
                RawParsed(
                    file = file,
                    relPath = relPath,
                    folder = folder,
                    baseName = baseName,
                    title = title,
                    slug = slug,
                    lang = lang,
                    tags = tags,
                    date = date,
                    description = desc,
                    rawBody = body
                )
            )
        }

        // Build lookup map for wikilinks
        val slugLookup = mutableMapOf<String, String>()
        for (r in rawNotes) {
            slugLookup[r.baseName.lowercase()] = r.slug
            slugLookup[r.title.lowercase()] = r.slug
            slugLookup[r.slug.lowercase()] = r.slug
        }

        // Phase 2: Clean markdown and wikilinks
        val processedNotes = rawNotes.map { raw ->
            val cleanedBody = cleanMarkdown(raw.rawBody, slugLookup)
            val document = mdParser.parse(cleanedBody)
            val html = htmlRenderer.render(document)
            NoteData(
                relPath = raw.relPath,
                folder = raw.folder,
                baseName = raw.baseName,
                title = raw.title,
                slug = raw.slug,
                lang = raw.lang,
                tags = raw.tags,
                date = raw.date,
                description = raw.description,
                bodyMarkdown = html
            )
        }

        // Phase 3: Prepare Tag Mappings
        // Existing tags in DB:
        // 1: Kotlin (kotlin)
        // 2: Architecture (architecture)
        // 3: Distributed Systems (distributed-systems)
        // 4: Trail Running (trail-running)
        // 5: Learning (learning)
        val tagMap = mutableMapOf<String, Long>(
            "kotlin" to 1L,
            "architecture" to 2L,
            "distributed-systems" to 3L,
            "trail-running" to 4L,
            "learning" to 5L,
            "ai" to 10L,
            "tools" to 11L,
            "infrastructure" to 12L,
            "projects" to 13L,
            "cloudevents" to 14L,
            "kafka" to 15L,
            "docker" to 16L,
            "kubernetes" to 17L,
            "ubuntu" to 18L,
            "git" to 19L,
            "neovim" to 20L,
            "vim" to 21L,
            "zsh" to 22L,
            "macos" to 23L,
            "ktor" to 24L,
            "mcp" to 25L,
            "raycast" to 26L
        )

        val tagNameMap = mutableMapOf<String, String>(
            "ai" to "AI",
            "tools" to "Developer Tools",
            "infrastructure" to "Infrastructure",
            "projects" to "Projects",
            "cloudevents" to "CloudEvents",
            "kafka" to "Kafka",
            "docker" to "Docker",
            "kubernetes" to "Kubernetes",
            "ubuntu" to "Ubuntu",
            "git" to "Git",
            "neovim" to "Neovim",
            "vim" to "Vim",
            "zsh" to "Zsh",
            "macos" to "macOS",
            "ktor" to "Ktor",
            "mcp" to "MCP",
            "raycast" to "Raycast"
        )

        var nextTagId = 27L
        for (note in processedNotes) {
            for (t in note.tags) {
                val slugTag = slugify(t)
                if (slugTag.isNotBlank() && !tagMap.containsKey(slugTag)) {
                    tagMap[slugTag] = nextTagId++
                    tagNameMap[slugTag] = t.capitalizeWords()
                }
            }
        }

        // Phase 4: Generate SQL migration
        val sql = StringBuilder()
        sql.appendLine("-- V11: Seed technical notes and projects from Obsidian (docs-v2) into TopLog")
        sql.appendLine("-- Total imported notes: ${processedNotes.size}")
        sql.appendLine()

        // 1. Tags
        sql.appendLine("-- 1. Insert Tags")
        val tagsToInsert = tagMap.entries.filter { it.value >= 10L }.sortedBy { it.value }
        for (entry in tagsToInsert) {
            val id = entry.value
            val slug = entry.key
            val name = tagNameMap[slug] ?: slug.capitalizeWords()
            sql.appendLine("INSERT INTO tags (id, blog_id, name, slug) VALUES ($id, 1, '${escapeSql(name)}', '$slug') ON CONFLICT (id) DO NOTHING;")
        }
        sql.appendLine()

        // 2. Posts and Variants
        var currentPostId = 30L
        for (note in processedNotes) {
            val postId = currentPostId
            val variantId = currentPostId
            currentPostId++

            val isFeatured = (note.slug in listOf(
                "ai-coding-is-missing-a-feedforward-layer",
                "ai-coding-feedforward-layer",
                "cloudevents",
                "cloudevents-th",
                "git-real-life-engineering",
                "macos-tools-stack-2026",
                "kotlin",
                "ktor-basic"
            ))

            val createdAt = "${note.date} 00:00:00+00"
            val titleSql = escapeSql(note.title)
            val descSql = escapeSql(note.description)
            val htmlSql = escapeSql(note.bodyMarkdown)
            val contentJson = """{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"${escapeJson(note.description)}"}]}]}"""
            val contentJsonSql = escapeSql(contentJson)

            sql.appendLine("-- Post $postId: ${note.title}")
            sql.appendLine("INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)")
            sql.appendLine("VALUES ($postId, 1, ${if (isFeatured) "TRUE" else "FALSE"}, FALSE, '$createdAt', '$createdAt')")
            sql.appendLine("ON CONFLICT (id) DO NOTHING;")
            sql.appendLine()

            // Post Tags
            val noteTagIds = note.tags.mapNotNull { tagMap[slugify(it)] }.distinct()
            for (tId in noteTagIds) {
                sql.appendLine("INSERT INTO post_tags (post_id, tag_id) VALUES ($postId, $tId) ON CONFLICT (post_id, tag_id) DO NOTHING;")
            }

            // Post Variant
            sql.appendLine("INSERT INTO post_variants (")
            sql.appendLine("    id, post_id, language_code, slug, title, description,")
            sql.appendLine("    content_json, content_html, status, published_at, updated_at")
            sql.appendLine(") VALUES (")
            sql.appendLine("    $variantId, $postId, '${note.lang}', '${note.slug}', '$titleSql', '$descSql',")
            sql.appendLine("    '$contentJsonSql', '$htmlSql', 'PUBLISHED', '$createdAt', '$createdAt'")
            sql.appendLine(") ON CONFLICT (id) DO NOTHING;")
            sql.appendLine()
        }

        // 3. Reset Sequences
        sql.appendLine("-- 3. Update Sequences")
        sql.appendLine("SELECT setval('tags_id_seq', (SELECT GREATEST(MAX(id), 100) FROM tags));")
        sql.appendLine("SELECT setval('posts_id_seq', (SELECT GREATEST(MAX(id), 200) FROM posts));")
        sql.appendLine("SELECT setval('post_variants_id_seq', (SELECT GREATEST(MAX(id), 200) FROM post_variants));")

        val outFile = File("src/main/resources/db/migration/V11__seed_obsidian_notes.sql")
        outFile.writeText(sql.toString(), Charsets.UTF_8)
        println("Generated migration file at: ${outFile.absolutePath} (${outFile.length()} bytes)")
    }

    private data class RawParsed(
        val file: File,
        val relPath: String,
        val folder: String,
        val baseName: String,
        val title: String,
        val slug: String,
        val lang: String,
        val tags: List<String>,
        val date: String,
        val description: String,
        val rawBody: String
    )

    private fun parseFrontmatter(text: String): Pair<Map<String, String>, String> {
        val fmMatch = Regex("""^---\r?\n(.*?)\r?\n---\r?\n""", RegexOption.DOT_MATCHES_ALL).find(text)
        if (fmMatch == null) {
            return Pair(emptyMap(), text)
        }
        val fmRaw = fmMatch.groupValues[1]
        val body = text.substring(fmMatch.range.last + 1)
        val map = mutableMapOf<String, String>()
        val lines = fmRaw.lines()
        var currentKey: String? = null
        val currentList = mutableListOf<String>()

        for (line in lines) {
            val trimmed = line.trim()
            if (trimmed.startsWith("#") || trimmed.isBlank()) continue

            if (trimmed.startsWith("- ") && currentKey != null) {
                currentList.add(trimmed.substring(2).trim().trim('"', '\''))
                continue
            } else if (currentKey != null && currentList.isNotEmpty()) {
                map[currentKey] = currentList.joinToString(",")
                currentList.clear()
                currentKey = null
            }

            if (line.contains(":")) {
                val parts = line.split(":", limit = 2)
                val k = parts[0].trim()
                val v = parts[1].trim()
                if (v.isBlank() || v == "[]") {
                    currentKey = k
                    currentList.clear()
                } else {
                    map[k] = v.trim('"', '\'')
                }
            }
        }
        if (currentKey != null && currentList.isNotEmpty()) {
            map[currentKey] = currentList.joinToString(",")
        }
        return Pair(map, body)
    }

    private fun parseTagsList(tagsStr: String): List<String> {
        return tagsStr.replace("[", "").replace("]", "").split(",")
            .map { it.trim().trim('"', '\'') }
            .filter { it.isNotBlank() }
    }

    private fun decodeUnicodeEscapes(input: String): String {
        return Regex("""\\+u([0-9a-fA-F]{4})""").replace(input) { match ->
            match.groupValues[1].toInt(16).toChar().toString()
        }
    }

    private fun slugify(input: String): String {
        return input.lowercase()
            .replace(Regex("""[^a-z0-9\-]+"""), "-")
            .replace(Regex("""-+"""), "-")
            .trim('-')
    }

    private fun extractDescription(candidate: String, body: String): String {
        if (candidate.isNotBlank()) {
            return decodeUnicodeEscapes(candidate).trim().take(200)
        }
        val lines = body.lines()
        val prose = mutableListOf<String>()
        for (l in lines) {
            val t = l.trim()
            if (t.startsWith("#")) {
                if (prose.isNotEmpty()) break
                continue
            }
            if (t.startsWith("- ") || t.startsWith("* ") || t.startsWith("```") || t.startsWith(">")) {
                if (prose.isNotEmpty()) break
                continue
            }
            if (t.isNotBlank()) {
                prose.add(t)
            } else if (prose.isNotEmpty()) {
                break
            }
        }
        if (prose.isNotEmpty()) {
            val joined = prose.joinToString(" ")
                .replace(Regex("""\[\[.*?\]\]"""), "")
                .replace(Regex("""[\*\_`#>]"""), "")
                .replace(Regex("""\s+"""), " ")
                .trim()
            if (joined.length >= 20) {
                return decodeUnicodeEscapes(joined).take(190) + (if (joined.length > 190) "..." else "")
            }
        }
        return "Technical notes and documentation from knowledge vault."
    }

    private fun cleanMarkdown(markdown: String, slugLookup: Map<String, String>): String {
        // Split by code blocks to avoid replacing wikilinks inside code
        val codeBlockRegex = Regex("""(```[\s\S]*?```|`[^`\n]+`)""")
        val segments = mutableListOf<String>()
        var lastIdx = 0
        for (m in codeBlockRegex.findAll(markdown)) {
            val start = m.range.first
            val end = m.range.last + 1
            if (start > lastIdx) {
                segments.add(markdown.substring(lastIdx, start))
            }
            segments.add(markdown.substring(start, end)) // preserved code
            lastIdx = end
        }
        if (lastIdx < markdown.length) {
            segments.add(markdown.substring(lastIdx))
        }

        val wikilinkRegex = Regex("""\[\[([^\]\n]+)\]\]""")
        val calloutRegex = Regex("""^>\s*\[!([A-Za-z]+)\]\s*(.*)$""", RegexOption.MULTILINE)

        val result = StringBuilder()
        for (seg in segments) {
            if (seg.startsWith("```") || seg.startsWith("`")) {
                result.append(seg)
            } else {
                // Prose segment: transform callouts and wikilinks
                var processed = calloutRegex.replace(seg) { match ->
                    val type = match.groupValues[1].uppercase()
                    val rest = match.groupValues[2]
                    "> **$type**: $rest"
                }

                processed = wikilinkRegex.replace(processed) { match ->
                    val inner = match.groupValues[1]
                    val parts = inner.split("|", limit = 2)
                    val target = parts[0].trim()
                    val label = if (parts.size > 1) parts[1].trim() else target

                    val targetSlug = slugLookup[target.lowercase()]
                    if (targetSlug != null) {
                        "[$label](/posts/$targetSlug)"
                    } else {
                        label
                    }
                }
                result.append(processed)
            }
        }
        return result.toString()
    }

    private fun escapeSql(s: String): String {
        return s.replace("'", "''")
    }

    private fun escapeJson(s: String): String {
        return s.replace("\\", "\\\\")
            .replace("\"", "\\\"")
            .replace("\n", "\\n")
            .replace("\r", "\\r")
            .replace("\t", "\\t")
    }

    private fun String.capitalizeWords(): String {
        return split(" ").joinToString(" ") { it.replaceFirstChar { c -> c.uppercase() } }
    }
}

package com.app.service

import com.app.api.dto.CreatePostRequest
import com.app.api.dto.ImportResultDto
import com.app.domain.model.PostStatus
import org.commonmark.ext.autolink.AutolinkExtension
import org.commonmark.ext.gfm.tables.TablesExtension
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import org.slf4j.LoggerFactory
import org.w3c.dom.Element
import org.w3c.dom.Node
import java.io.BufferedReader
import java.io.InputStream
import java.io.InputStreamReader
import java.util.zip.ZipInputStream
import javax.xml.parsers.DocumentBuilderFactory

class ImportService(
    private val postService: PostService,
    private val tagService: TagService
) {
    private val logger = LoggerFactory.getLogger(ImportService::class.java)
    private val extensions = listOf(TablesExtension.create(), AutolinkExtension.create())
    private val mdParser = Parser.builder().extensions(extensions).build()
    private val htmlRenderer = HtmlRenderer.builder().extensions(extensions).build()

    suspend fun importWordPressXml(
        blogId: Long,
        inputStream: InputStream,
        defaultLanguage: String
    ): ImportResultDto {
        var importedPosts = 0
        var importedPages = 0
        val createdTagIds = mutableSetOf<Long>()
        val errors = mutableListOf<String>()

        try {
            val factory = DocumentBuilderFactory.newInstance()
            factory.isNamespaceAware = true
            // Disable external entities for security
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true)
            factory.setFeature("http://xml.org/sax/features/external-general-entities", false)
            factory.setFeature("http://xml.org/sax/features/external-parameter-entities", false)

            val builder = factory.newDocumentBuilder()
            val doc = builder.parse(inputStream)
            doc.documentElement.normalize()

            val items = doc.getElementsByTagName("item")
            for (i in 0 until items.length) {
                val node = items.item(i)
                if (node.nodeType != Node.ELEMENT_NODE) continue
                val itemEl = node as Element

                try {
                    val postType = getXmlChildText(itemEl, "wp:post_type").ifEmpty { "post" }
                    // Only import standard posts and pages
                    if (postType != "post" && postType != "page") {
                        continue
                    }

                    val rawTitle = getXmlChildText(itemEl, "title").trim()
                    val title = rawTitle.ifEmpty { "Untitled Post ${i + 1}" }

                    var slug = getXmlChildText(itemEl, "wp:post_name").trim()
                    if (slug.isEmpty()) {
                        slug = slugify(title)
                    }
                    if (slug.isEmpty()) {
                        slug = "post-${i + 1}"
                    }

                    val wpStatus = getXmlChildText(itemEl, "wp:status").trim().lowercase()
                    val status = if (wpStatus == "publish") PostStatus.PUBLISHED else PostStatus.DRAFT

                    var rawContent = getXmlChildText(itemEl, "content:encoded").trim()
                    val description = getXmlChildText(itemEl, "excerpt:encoded").trim().ifEmpty { null }

                    // Format WordPress paragraphs if raw HTML tags are missing
                    val contentHtml = formatWordPressContent(rawContent)

                    // Extract categories and tags
                    val tagNames = mutableListOf<String>()
                    val categoryNodes = itemEl.getElementsByTagName("category")
                    for (c in 0 until categoryNodes.length) {
                        val catEl = categoryNodes.item(c) as? Element ?: continue
                        val domain = catEl.getAttribute("domain")
                        if (domain == "post_tag" || domain == "category") {
                            val catName = catEl.textContent?.trim()
                            if (!catName.isNullOrEmpty() && catName.lowercase() != "uncategorized") {
                                tagNames.add(catName)
                            }
                        }
                    }

                    val tagIds = mutableListOf<Long>()
                    for (tagName in tagNames) {
                        try {
                            val tagDto = tagService.findOrCreateTag(blogId, tagName)
                            tagIds.add(tagDto.id)
                            createdTagIds.add(tagDto.id)
                        } catch (e: Exception) {
                            logger.warn("Could not create tag '$tagName': ${e.message}")
                        }
                    }

                    // Check if slug conflicts and make unique if needed
                    val uniqueSlug = ensureUniqueSlug(blogId, slug)

                    postService.createPost(
                        blogId = blogId,
                        request = CreatePostRequest(
                            title = title,
                            slug = uniqueSlug,
                            languageCode = defaultLanguage,
                            description = description,
                            contentHtml = contentHtml,
                            contentJson = "{}",
                            isFeatured = false,
                            isPage = (postType == "page"),
                            featuredImageUrl = null,
                            tagIds = tagIds,
                            status = status
                        )
                    )

                    if (postType == "page") {
                        importedPages++
                    } else {
                        importedPosts++
                    }
                } catch (e: Exception) {
                    val err = "Error importing item $i: ${e.message}"
                    logger.error(err, e)
                    errors.add(err)
                }
            }
        } catch (e: Exception) {
            val err = "Failed to parse WordPress XML: ${e.message}"
            logger.error(err, e)
            return ImportResultDto(
                success = false,
                importedPostsCount = importedPosts,
                importedPagesCount = importedPages,
                importedTagsCount = createdTagIds.size,
                errors = listOf(err),
                message = err
            )
        }

        return ImportResultDto(
            success = errors.isEmpty() || (importedPosts + importedPages > 0),
            importedPostsCount = importedPosts,
            importedPagesCount = importedPages,
            importedTagsCount = createdTagIds.size,
            errors = errors,
            message = "Successfully imported $importedPosts posts and $importedPages pages with ${createdTagIds.size} tags."
        )
    }

    suspend fun importMarkdownBundle(
        blogId: Long,
        inputStream: InputStream,
        isZip: Boolean,
        defaultLanguage: String,
        fallbackFilename: String = "post.md"
    ): ImportResultDto {
        var importedPosts = 0
        var importedPages = 0
        val createdTagIds = mutableSetOf<Long>()
        val errors = mutableListOf<String>()

        if (!isZip) {
            // Single Markdown file
            try {
                val content = inputStream.bufferedReader().use { it.readText() }
                val (post, isPage) = parseAndCreateMarkdownPost(blogId, content, fallbackFilename, defaultLanguage, createdTagIds)
                if (isPage) importedPages++ else importedPosts++
            } catch (e: Exception) {
                val err = "Failed to import Markdown file: ${e.message}"
                errors.add(err)
            }
        } else {
            // ZIP archive of markdown files
            try {
                val zip = ZipInputStream(inputStream)
                var entry = zip.nextEntry
                while (entry != null) {
                    val name = entry.name
                    val isHidden = name.contains("__MACOSX") || name.startsWith(".") || name.contains("/.")
                    if (!entry.isDirectory && (name.endsWith(".md", ignoreCase = true) || name.endsWith(".markdown", ignoreCase = true)) && !isHidden) {
                        try {
                            val content = zip.bufferedReader().readText()
                            val (post, isPage) = parseAndCreateMarkdownPost(blogId, content, name, defaultLanguage, createdTagIds)
                            if (isPage) importedPages++ else importedPosts++
                        } catch (e: Exception) {
                            val err = "Error importing '$name': ${e.message}"
                            logger.error(err, e)
                            errors.add(err)
                        }
                    }
                    entry = zip.nextEntry
                }
            } catch (e: Exception) {
                val err = "Failed to read ZIP archive: ${e.message}"
                errors.add(err)
            }
        }

        return ImportResultDto(
            success = errors.isEmpty() || (importedPosts + importedPages > 0),
            importedPostsCount = importedPosts,
            importedPagesCount = importedPages,
            importedTagsCount = createdTagIds.size,
            errors = errors,
            message = "Successfully imported $importedPosts posts and $importedPages pages with ${createdTagIds.size} tags."
        )
    }

    private suspend fun parseAndCreateMarkdownPost(
        blogId: Long,
        rawContent: String,
        filename: String,
        defaultLanguage: String,
        createdTagIds: MutableSet<Long>
    ): Pair<Any, Boolean> {
        val baseName = filename.substringAfterLast("/").substringBeforeLast(".")
        var title = ""
        var slug = ""
        var description: String? = null
        var status = PostStatus.PUBLISHED
        var isPage = false
        val tags = mutableListOf<String>()
        var bodyMarkdown = rawContent

        // Check for YAML Frontmatter: ^---\n(.*?)\n---\n
        val frontmatterRegex = Regex("""^---\r?\n([\s\S]*?)\r?\n---\r?\n?""")
        val match = frontmatterRegex.find(rawContent)

        if (match != null) {
            val yamlBlock = match.groupValues[1]
            bodyMarkdown = rawContent.substring(match.range.last + 1)

            val lines = yamlBlock.lines()
            for (line in lines) {
                val colonIdx = line.indexOf(':')
                if (colonIdx == -1) continue
                val key = line.substring(0, colonIdx).trim().lowercase()
                val value = line.substring(colonIdx + 1).trim().removeSurrounding("\"").removeSurrounding("'")

                when (key) {
                    "title" -> title = value
                    "slug" -> slug = value
                    "description", "excerpt" -> description = value
                    "status" -> if (value.equals("draft", ignoreCase = true)) status = PostStatus.DRAFT
                    "is_page", "page" -> isPage = value.equals("true", ignoreCase = true)
                    "tags" -> {
                        // Handle comma separated or array: [tag1, tag2]
                        val cleanTags = value.removePrefix("[").removeSuffix("]")
                            .split(",")
                            .map { it.trim().removeSurrounding("\"").removeSurrounding("'") }
                            .filter { it.isNotEmpty() }
                        tags.addAll(cleanTags)
                    }
                }
            }
        }

        // Fallbacks for title and slug
        if (title.isEmpty()) {
            val headingMatch = Regex("""^#\s+(.+)$""", RegexOption.MULTILINE).find(bodyMarkdown)
            title = headingMatch?.groupValues?.get(1)?.trim() ?: baseName.replace("-", " ").capitalizeWords()
        }

        if (slug.isEmpty()) {
            slug = slugify(baseName.ifEmpty { title })
        }

        // Render Markdown to HTML
        val document = mdParser.parse(bodyMarkdown.trim())
        val contentHtml = htmlRenderer.render(document)

        // Tags
        val tagIds = mutableListOf<Long>()
        for (tagName in tags) {
            try {
                val tagDto = tagService.findOrCreateTag(blogId, tagName)
                tagIds.add(tagDto.id)
                createdTagIds.add(tagDto.id)
            } catch (e: Exception) {
                logger.warn("Could not create tag '$tagName': ${e.message}")
            }
        }

        val uniqueSlug = ensureUniqueSlug(blogId, slug)

        val created = postService.createPost(
            blogId = blogId,
            request = CreatePostRequest(
                title = title,
                slug = uniqueSlug,
                languageCode = defaultLanguage,
                description = description,
                contentHtml = contentHtml,
                contentJson = "{}",
                isFeatured = false,
                isPage = isPage,
                featuredImageUrl = null,
                tagIds = tagIds,
                status = status
            )
        )

        return Pair(created, isPage)
    }

    private fun formatWordPressContent(raw: String): String {
        if (raw.isBlank()) return ""
        // If content already contains HTML block elements, leave intact
        if (raw.contains("<p>") || raw.contains("<div>") || raw.contains("<h2>") || raw.contains("<article>")) {
            return raw
        }
        // Basic wpautop equivalent: convert double newlines into <p>...</p>
        return raw.split(Regex("""\r?\n\r?\n"""))
            .filter { it.isNotBlank() }
            .joinToString("\n") { "<p>${it.trim().replace("\n", "<br/>")}</p>" }
    }

    private fun getXmlChildText(parent: Element, tagName: String): String {
        val list = parent.getElementsByTagName(tagName)
        if (list.length > 0) {
            return list.item(0).textContent ?: ""
        }
        // Try local name matching in case of namespace prefixes
        val localName = if (tagName.contains(":")) tagName.substringAfter(":") else tagName
        val allChildren = parent.childNodes
        for (i in 0 until allChildren.length) {
            val child = allChildren.item(i)
            if (child.nodeType == Node.ELEMENT_NODE && (child.localName == localName || child.nodeName == tagName)) {
                return child.textContent ?: ""
            }
        }
        return ""
    }

    private fun slugify(text: String): String {
        return text.lowercase()
            .replace(Regex("""[^a-z0-9\s-]"""), "")
            .trim()
            .replace(Regex("""\s+"""), "-")
            .replace(Regex("""-+"""), "-")
    }

    private fun ensureUniqueSlug(blogId: Long, baseSlug: String): String {
        var clean = slugify(baseSlug).ifEmpty { "post" }
        return clean
    }

    private fun String.capitalizeWords(): String {
        return split(" ").joinToString(" ") { word ->
            word.replaceFirstChar { if (it.isLowerCase()) it.titlecase() else it.toString() }
        }
    }
}

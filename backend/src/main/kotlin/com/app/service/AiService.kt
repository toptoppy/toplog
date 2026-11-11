package com.app.service

import com.app.api.dto.AiStatusDto
import com.app.api.dto.AiTestResponseDto
import com.app.config.AppConfig
import com.app.domain.model.Blogs
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*
import org.jetbrains.exposed.sql.selectAll

@Serializable
data class AiTranslationResult(
    val title: String,
    val slug: String,
    val description: String?,
    val contentHtml: String
)

@Serializable
data class AiSeoResult(
    val titles: List<String>,
    val metaDescription: String,
    val tags: List<String>
)

class AiService(private val config: AppConfig) {

    private val jsonParser = Json {
        ignoreUnknownKeys = true
        isLenient = true
    }

    private val httpClient = HttpClient(CIO) {
        install(ContentNegotiation) {
            json(jsonParser)
        }
    }

    suspend fun resolveConfig(blogId: Long?): Triple<String?, String, String> {
        if (blogId != null) {
            val blogRow = dbQuery {
                Blogs.selectAll().where { Blogs.id eq blogId }.firstOrNull()
            }
            if (blogRow != null) {
                val customKey = blogRow[Blogs.aiApiKey]?.takeIf { it.isNotBlank() }
                if (customKey != null) {
                    val customUrl = blogRow[Blogs.aiBaseUrl]?.takeIf { it.isNotBlank() } ?: "https://openrouter.ai/api/v1"
                    val customModel = blogRow[Blogs.aiModel]?.takeIf { it.isNotBlank() } ?: "google/gemini-2.0-flash-001"
                    return Triple(customKey, customUrl, customModel)
                }
            }
        }
        return Triple(config.aiApiKey, config.aiBaseUrl, config.aiModel)
    }

    suspend fun getStatus(blogId: Long? = null): AiStatusDto {
        val (apiKey, baseUrl, model) = resolveConfig(blogId)
        val isConfigured = !apiKey.isNullOrBlank()
        val provider = when {
            baseUrl.contains("openrouter.ai") -> "OpenRouter"
            baseUrl.contains("openai.com") -> "OpenAI"
            baseUrl.contains("groq.com") -> "Groq"
            baseUrl.contains("deepseek.com") -> "DeepSeek"
            baseUrl.contains("googleapis.com") -> "Gemini"
            else -> "Custom Provider"
        }
        val isCustom = blogId != null && dbQuery {
            Blogs.selectAll().where { Blogs.id eq blogId }.firstOrNull()?.get(Blogs.aiApiKey)?.isNotBlank() == true
        }
        return AiStatusDto(
            configured = isConfigured,
            provider = provider,
            baseUrl = baseUrl,
            model = model,
            isCustom = isCustom
        )
    }

    suspend fun testConnection(
        blogId: Long? = null,
        overrideKey: String? = null,
        overrideBaseUrl: String? = null,
        overrideModel: String? = null
    ): AiTestResponseDto {
        val (defaultKey, defaultUrl, defaultModel) = resolveConfig(blogId)
        val apiKey = overrideKey?.takeIf { it.isNotBlank() && !it.contains("••••") } ?: defaultKey
        val baseUrl = overrideBaseUrl?.takeIf { it.isNotBlank() } ?: defaultUrl
        val model = overrideModel?.takeIf { it.isNotBlank() } ?: defaultModel

        if (apiKey.isNullOrBlank()) {
            throw IllegalArgumentException("No API key provided or configured. Please enter your API key.")
        }

        val provider = when {
            baseUrl.contains("openrouter.ai") -> "OpenRouter"
            baseUrl.contains("openai.com") -> "OpenAI"
            baseUrl.contains("groq.com") -> "Groq"
            baseUrl.contains("deepseek.com") -> "DeepSeek"
            baseUrl.contains("googleapis.com") -> "Gemini"
            else -> "Custom Provider"
        }

        val startTime = System.currentTimeMillis()
        val response = callChatCompletion(
            systemPrompt = "You are an AI assistant. Reply with only 'CONNECTED'.",
            userPrompt = "Test connection",
            apiKey = apiKey,
            baseUrl = baseUrl,
            model = model
        )
        val latencyMs = System.currentTimeMillis() - startTime
        return AiTestResponseDto(
            success = true,
            provider = provider,
            model = model,
            latencyMs = latencyMs,
            message = "Successfully connected to $provider! Latency: ${latencyMs}ms. Response: ${response.trim()}"
        )
    }

    suspend fun translate(
        sourceTitle: String,
        sourceDescription: String?,
        sourceContentHtml: String,
        targetLang: String,
        blogId: Long? = null
    ): AiTranslationResult {
        val target = targetLang.trim().lowercase()
        require(config.supportedLanguages.contains(target)) {
            "Target language '$target' is not supported. Supported languages: ${config.supportedLanguages.joinToString(", ")}"
        }
        val (apiKey, baseUrl, model) = resolveConfig(blogId)
        if (apiKey.isNullOrBlank()) {
            throw IllegalArgumentException("AI service is not configured. Please set an API key in Blog Settings or environment.")
        }

        val systemPrompt = """
            You are a professional blog translator and localization expert.
            Translate the following blog post title, meta description, and HTML content into the target language: '$targetLang'.
            CRITICAL RULES:
            1. Maintain ALL HTML tags (<p>, <h2>, <strong>, <code>, <pre>, <blockquote>, <a>, <img>, etc.) exactly as they are.
            2. Do not alter URLs in links or images.
            3. Generate a clean, localized, URL-friendly slug (lowercase, letters, numbers, hyphens).
            4. Output ONLY a valid JSON object with the following schema:
            {
               "title": "Translated Title",
               "slug": "translated-slug",
               "description": "Translated Meta Description",
               "contentHtml": "Translated HTML content"
            }
        """.trimIndent()

        val userPrompt = """
            Source Title: $sourceTitle
            Source Description: ${sourceDescription ?: ""}
            Source HTML:
            $sourceContentHtml
        """.trimIndent()

        val responseText = callChatCompletion(systemPrompt, userPrompt, apiKey, baseUrl, model)
        val cleanJson = extractJson(responseText)

        return jsonParser.decodeFromString<AiTranslationResult>(cleanJson)
    }

    suspend fun generateSeo(
        title: String,
        contentHtml: String,
        lang: String,
        blogId: Long? = null
    ): AiSeoResult {
        val (apiKey, baseUrl, model) = resolveConfig(blogId)
        if (apiKey.isNullOrBlank()) {
            throw IllegalArgumentException("AI service is not configured. Please set an API key in Blog Settings or environment.")
        }

        val systemPrompt = """
            You are an expert SEO copywriter.
            Analyze the blog post content in language '$lang'.
            Generate:
            1. Three (3) high-CTR, compelling SEO title alternatives.
            2. A compelling, concise meta description strictly under 160 characters.
            3. Up to 5 relevant category/tag names.
            Output ONLY a valid JSON object with this schema:
            {
               "titles": ["Title 1", "Title 2", "Title 3"],
               "metaDescription": "Concise meta description under 160 chars",
               "tags": ["Tag1", "Tag2", "Tag3"]
            }
        """.trimIndent()

        val userPrompt = """
            Current Title: $title
            Content HTML:
            $contentHtml
        """.trimIndent()

        val responseText = callChatCompletion(systemPrompt, userPrompt, apiKey, baseUrl, model)
        val cleanJson = extractJson(responseText)

        return jsonParser.decodeFromString<AiSeoResult>(cleanJson)
    }

    private suspend fun callChatCompletion(
        systemPrompt: String,
        userPrompt: String,
        apiKey: String,
        baseUrl: String,
        model: String
    ): String {
        val requestBody = buildJsonObject {
            put("model", model)
            putJsonArray("messages") {
                addJsonObject {
                    put("role", "system")
                    put("content", systemPrompt)
                }
                addJsonObject {
                    put("role", "user")
                    put("content", userPrompt)
                }
            }
            put("temperature", 0.3)
        }

        val endpoint = "${baseUrl.trimEnd('/')}/chat/completions"
        val response = httpClient.post(endpoint) {
            header(HttpHeaders.Authorization, "Bearer $apiKey")
            contentType(ContentType.Application.Json)
            // OpenRouter attribution headers
            header("HTTP-Referer", "https://${config.baseDomain}")
            header("X-Title", "TopLog")
            setBody(requestBody)
        }

        if (!response.status.isSuccess()) {
            val errText = response.bodyAsText()
            throw IllegalStateException("AI API Error (${response.status.value}): $errText")
        }

        val responseJson = jsonParser.parseToJsonElement(response.bodyAsText()).jsonObject
        val content = responseJson["choices"]?.jsonArray?.firstOrNull()?.jsonObject
            ?.get("message")?.jsonObject
            ?.get("content")?.jsonPrimitive?.content
            ?: throw IllegalStateException("Unexpected AI response format")

        return content
    }

    private fun extractJson(raw: String): String {
        val trimmed = raw.trim()
        if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed

        val fencedRegex = Regex("```(?:json)?\\s*([\\s\\S]*?)\\s*```")
        val match = fencedRegex.find(trimmed)
        if (match != null) {
            return match.groupValues[1].trim()
        }

        val firstBrace = trimmed.indexOf('{')
        val lastBrace = trimmed.lastIndexOf('}')
        if (firstBrace != -1 && lastBrace != -1 && lastBrace > firstBrace) {
            return trimmed.substring(firstBrace, lastBrace + 1)
        }

        return trimmed
    }
}

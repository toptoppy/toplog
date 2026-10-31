package com.app.service

import com.app.config.AppConfig
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.*

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

    private fun checkConfig() {
        if (config.aiApiKey.isNullOrBlank()) {
            throw IllegalArgumentException("AI service is not configured. Please set AI_API_KEY in environment variables.")
        }
    }

    suspend fun translate(
        sourceTitle: String,
        sourceDescription: String?,
        sourceContentHtml: String,
        targetLang: String
    ): AiTranslationResult {
        checkConfig()

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

        val responseText = callChatCompletion(systemPrompt, userPrompt)
        val cleanJson = extractJson(responseText)

        return jsonParser.decodeFromString<AiTranslationResult>(cleanJson)
    }

    suspend fun generateSeo(
        title: String,
        contentHtml: String,
        lang: String
    ): AiSeoResult {
        checkConfig()

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

        val responseText = callChatCompletion(systemPrompt, userPrompt)
        val cleanJson = extractJson(responseText)

        return jsonParser.decodeFromString<AiSeoResult>(cleanJson)
    }

    private suspend fun callChatCompletion(systemPrompt: String, userPrompt: String): String {
        val requestBody = buildJsonObject {
            put("model", config.aiModel)
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

        val endpoint = "${config.aiBaseUrl.trimEnd('/')}/chat/completions"
        val response = httpClient.post(endpoint) {
            header(HttpHeaders.Authorization, "Bearer ${config.aiApiKey}")
            contentType(ContentType.Application.Json)
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

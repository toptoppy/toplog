package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class TranslatePostAiRequest(
    val sourceLanguage: String = "en",
    val targetLanguage: String
)

@Serializable
data class GenerateSeoAiRequest(
    val languageCode: String = "en"
)

@Serializable
data class SeoResponseDto(
    val titles: List<String>,
    val metaDescription: String,
    val tags: List<String>
)

@Serializable
data class AiStatusDto(
    val configured: Boolean,
    val provider: String,
    val baseUrl: String,
    val model: String
)

@Serializable
data class AiTestResponseDto(
    val success: Boolean,
    val provider: String,
    val model: String,
    val latencyMs: Long? = null,
    val message: String? = null,
    val error: String? = null
)

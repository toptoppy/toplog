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

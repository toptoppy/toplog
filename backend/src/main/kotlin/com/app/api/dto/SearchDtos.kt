package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class SearchResultItemDto(
    val id: Long,
    val title: String,
    val slug: String,
    val description: String?,
    val featuredImageUrl: String?,
    val publishedAt: String?,
    val tags: List<String> = emptyList()
)

@Serializable
data class SearchResponseDto(
    val query: String,
    val total: Int,
    val results: List<SearchResultItemDto>
)

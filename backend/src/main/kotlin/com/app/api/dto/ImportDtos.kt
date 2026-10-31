package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class ImportResultDto(
    val success: Boolean,
    val importedPostsCount: Int,
    val importedPagesCount: Int,
    val importedTagsCount: Int,
    val errors: List<String> = emptyList(),
    val message: String
)

package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class MediaItemDto(
    val filename: String,
    val url: String,
    val sizeBytes: Long,
    val contentType: String,
    val createdAt: String
)

@Serializable
data class DeleteMediaResponse(
    val success: Boolean,
    val message: String
)

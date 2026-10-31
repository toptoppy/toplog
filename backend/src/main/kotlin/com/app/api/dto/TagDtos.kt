package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class CreateTagRequest(
    val name: String,
    val slug: String
)

@Serializable
data class TagDto(
    val id: Long,
    val blogId: Long,
    val name: String,
    val slug: String
)

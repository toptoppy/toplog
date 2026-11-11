package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class CreateTagRequest(
    val name: String,
    val slug: String,
    val color: String? = null
)

@Serializable
data class UpdateTagRequest(
    val name: String? = null,
    val slug: String? = null,
    val color: String? = null
)

@Serializable
data class TagDto(
    val id: Long,
    val blogId: Long,
    val name: String,
    val slug: String,
    val color: String? = null
)

@Serializable
data class PublicTagDto(
    val id: Long,
    val name: String,
    val slug: String,
    val color: String? = null,
    val postCount: Long = 0
)


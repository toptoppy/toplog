package com.app.api.dto

import com.app.domain.model.PostStatus
import kotlinx.serialization.Serializable

@Serializable
data class PostRevisionDto(
    val id: Long,
    val postVariantId: Long,
    val title: String,
    val slug: String,
    val contentHtml: String,
    val contentJson: String,
    val description: String?,
    val status: PostStatus,
    val createdByUserId: Long?,
    val createdByName: String? = null,
    val createdAt: String,
    val wordCount: Int = 0
)

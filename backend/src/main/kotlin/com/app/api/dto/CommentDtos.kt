package com.app.api.dto

import com.app.domain.model.CommentStatus
import kotlinx.serialization.Serializable

@Serializable
data class PublicCreateCommentRequest(
    val postId: Long,
    val parentId: Long? = null,
    val authorName: String,
    val authorEmail: String,
    val authorWebsite: String? = null,
    val content: String,
    val honeypot: String? = null
)

@Serializable
data class CreateCommentResponse(
    val success: Boolean,
    val message: String,
    val comment: CommentDto
)

@Serializable
data class CommentDto(
    val id: Long,
    val blogId: Long,
    val postId: Long,
    val parentId: Long?,
    val authorName: String,
    val authorEmail: String,
    val authorWebsite: String?,
    val content: String,
    val status: CommentStatus,
    val createdAt: String,
    val postTitle: String? = null
)

@Serializable
data class UpdateCommentStatusRequest(
    val status: CommentStatus
)

@Serializable
data class PublicCommentDto(
    val id: Long,
    val postId: Long,
    val parentId: Long?,
    val authorName: String,
    val authorWebsite: String?,
    val content: String,
    val createdAt: String,
    val replies: List<PublicCommentDto> = emptyList()
)

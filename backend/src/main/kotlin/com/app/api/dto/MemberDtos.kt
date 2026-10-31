package com.app.api.dto

import com.app.domain.model.BlogRole
import kotlinx.serialization.Serializable

@Serializable
data class BlogMemberDto(
    val id: Long,
    val blogId: Long,
    val userId: Long,
    val email: String,
    val name: String,
    val role: BlogRole,
    val createdAt: String
)

@Serializable
data class BlogInviteDto(
    val id: Long,
    val blogId: Long,
    val email: String,
    val role: BlogRole,
    val token: String,
    val expiresAt: String,
    val createdAt: String
)

@Serializable
data class InviteMemberRequest(
    val email: String,
    val role: BlogRole = BlogRole.AUTHOR
)

@Serializable
data class UpdateMemberRoleRequest(
    val role: BlogRole
)

@Serializable
data class TeamOverviewDto(
    val members: List<BlogMemberDto>,
    val pendingInvites: List<BlogInviteDto>
)

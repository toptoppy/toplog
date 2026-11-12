package com.app.api.dto

import com.app.domain.model.UserRole
import kotlinx.serialization.Serializable

@Serializable
data class PlatformUserSummaryDto(
    val id: Long,
    val email: String,
    val name: String,
    val role: UserRole,
    val ownedBlogsCount: Int,
    val memberBlogsCount: Int,
    val createdAt: String
)

@Serializable
data class CreatePlatformUserRequest(
    val email: String,
    val name: String,
    val password: String,
    val role: UserRole = UserRole.AUTHOR
)

@Serializable
data class UpdatePlatformUserRequest(
    val name: String? = null,
    val email: String? = null,
    val role: UserRole? = null
)

@Serializable
data class ResetUserPasswordRequest(
    val newPassword: String
)

@Serializable
data class DeleteUserRequest(
    val transferOwnershipToUserId: Long? = null,
    val confirmEmail: String? = null
)

@Serializable
data class DeleteUserResponse(
    val success: Boolean,
    val message: String,
    val blogsReassignedCount: Int
)

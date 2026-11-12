package com.app.service

import com.app.api.dto.*
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import com.app.infrastructure.security.PasswordHasher
import com.app.infrastructure.security.UserPrincipal
import org.jetbrains.exposed.dao.id.EntityID
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.like
import java.time.Instant

class UserService {
    private val emailRegex = Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")

    suspend fun listUsers(query: String? = null, role: UserRole? = null): List<PlatformUserSummaryDto> = dbQuery {
        val ownedCounts = Blogs.select(Blogs.ownerId, Blogs.id.count())
            .groupBy(Blogs.ownerId)
            .associate { it[Blogs.ownerId].value to it[Blogs.id.count()].toInt() }

        val memberCounts = BlogMembers.select(BlogMembers.userId, BlogMembers.id.count())
            .groupBy(BlogMembers.userId)
            .associate { it[BlogMembers.userId].value to it[BlogMembers.id.count()].toInt() }

        var queryBuilder = Users.selectAll()

        if (role != null) {
            queryBuilder = queryBuilder.where { Users.role eq role.name }
        }

        if (!query.isNullOrBlank()) {
            val q = "%${query.trim().lowercase()}%"
            val existingOp = queryBuilder.where
            val searchOp = (Users.email.lowerCase() like q) or (Users.name.lowerCase() like q)
            queryBuilder = queryBuilder.where { if (existingOp != null) existingOp and searchOp else searchOp }
        }

        queryBuilder.orderBy(Users.id to SortOrder.ASC).map { row ->
            val userId = row[Users.id].value
            PlatformUserSummaryDto(
                id = userId,
                email = row[Users.email],
                name = row[Users.name],
                role = UserRole.valueOf(row[Users.role]),
                ownedBlogsCount = ownedCounts[userId] ?: 0,
                memberBlogsCount = memberCounts[userId] ?: 0,
                createdAt = row[Users.createdAt].toString()
            )
        }
    }

    suspend fun getUser(userId: Long): PlatformUserSummaryDto = dbQuery {
        val userRow = Users.selectAll().where { Users.id eq userId }.firstOrNull()
            ?: throw NoSuchElementException("User not found with id: $userId")

        val ownedCount = Blogs.selectAll().where { Blogs.ownerId eq userId }.count().toInt()
        val memberCount = BlogMembers.selectAll().where { BlogMembers.userId eq userId }.count().toInt()

        PlatformUserSummaryDto(
            id = userRow[Users.id].value,
            email = userRow[Users.email],
            name = userRow[Users.name],
            role = UserRole.valueOf(userRow[Users.role]),
            ownedBlogsCount = ownedCount,
            memberBlogsCount = memberCount,
            createdAt = userRow[Users.createdAt].toString()
        )
    }

    suspend fun createUser(request: CreatePlatformUserRequest): PlatformUserSummaryDto {
        val email = request.email.trim().lowercase()
        require(email.isNotBlank() && emailRegex.matches(email)) { "Invalid email address format" }
        require(request.password.length in 8..128) { "Password must be between 8 and 128 characters" }
        require(request.name.trim().isNotBlank()) { "Name cannot be blank" }

        val existing = dbQuery {
            Users.selectAll().where { Users.email eq email }.firstOrNull()
        }
        if (existing != null) {
            throw IllegalArgumentException("A user with this email already exists")
        }

        val hashedPassword = PasswordHasher.hash(request.password)
        val now = Instant.now()

        val userId = dbQuery {
            Users.insert {
                it[Users.email] = email
                it[Users.passwordHash] = hashedPassword
                it[Users.name] = request.name.trim()
                it[Users.role] = request.role.name
                it[Users.createdAt] = now
            } get Users.id
        }.value

        return PlatformUserSummaryDto(
            id = userId,
            email = email,
            name = request.name.trim(),
            role = request.role,
            ownedBlogsCount = 0,
            memberBlogsCount = 0,
            createdAt = now.toString()
        )
    }

    suspend fun updateUser(
        targetUserId: Long,
        actor: UserPrincipal,
        request: UpdatePlatformUserRequest
    ): PlatformUserSummaryDto = dbQuery {
        val userRow = Users.selectAll().where { Users.id eq targetUserId }.firstOrNull()
            ?: throw NoSuchElementException("User not found with id: $targetUserId")

        val currentRole = UserRole.valueOf(userRow[Users.role])

        // Check if attempting to demote an admin
        if (request.role != null && request.role != UserRole.ADMIN && currentRole == UserRole.ADMIN) {
            val adminCount = Users.selectAll().where { Users.role eq UserRole.ADMIN.name }.count()
            if (adminCount <= 1) {
                throw IllegalStateException("Cannot demote the last platform administrator")
            }
        }

        if (request.email != null) {
            val email = request.email.trim().lowercase()
            require(email.isNotBlank() && emailRegex.matches(email)) { "Invalid email address format" }
            val existing = Users.selectAll().where { (Users.email eq email) and (Users.id neq targetUserId) }.firstOrNull()
            if (existing != null) {
                throw IllegalArgumentException("A user with this email already exists")
            }
        }

        Users.update({ Users.id eq targetUserId }) {
            if (request.name != null && request.name.trim().isNotBlank()) {
                it[name] = request.name.trim()
            }
            if (request.email != null && request.email.trim().isNotBlank()) {
                it[email] = request.email.trim().lowercase()
            }
            if (request.role != null) {
                it[role] = request.role.name
            }
        }

        val updatedRow = Users.selectAll().where { Users.id eq targetUserId }.first()
        val ownedCount = Blogs.selectAll().where { Blogs.ownerId eq targetUserId }.count().toInt()
        val memberCount = BlogMembers.selectAll().where { BlogMembers.userId eq targetUserId }.count().toInt()

        PlatformUserSummaryDto(
            id = updatedRow[Users.id].value,
            email = updatedRow[Users.email],
            name = updatedRow[Users.name],
            role = UserRole.valueOf(updatedRow[Users.role]),
            ownedBlogsCount = ownedCount,
            memberBlogsCount = memberCount,
            createdAt = updatedRow[Users.createdAt].toString()
        )
    }

    suspend fun resetPassword(targetUserId: Long, request: ResetUserPasswordRequest) {
        require(request.newPassword.length in 8..128) { "Password must be between 8 and 128 characters" }

        val hashedPassword = PasswordHasher.hash(request.newPassword)

        dbQuery {
            val userRow = Users.selectAll().where { Users.id eq targetUserId }.firstOrNull()
                ?: throw NoSuchElementException("User not found with id: $targetUserId")

            Users.update({ Users.id eq targetUserId }) {
                it[passwordHash] = hashedPassword
            }
        }
    }

    suspend fun deleteUser(
        targetUserId: Long,
        actor: UserPrincipal,
        request: DeleteUserRequest
    ): DeleteUserResponse = dbQuery {
        if (targetUserId == actor.userId) {
            throw IllegalArgumentException("You cannot delete your own account")
        }

        val targetRow = Users.selectAll().where { Users.id eq targetUserId }.firstOrNull()
            ?: throw NoSuchElementException("User not found with id: $targetUserId")

        val targetRole = UserRole.valueOf(targetRow[Users.role])
        val targetEmail = targetRow[Users.email]

        // If target is an admin, ensure not the last admin
        if (targetRole == UserRole.ADMIN) {
            val adminCount = Users.selectAll().where { Users.role eq UserRole.ADMIN.name }.count()
            if (adminCount <= 1) {
                throw IllegalStateException("Cannot remove the last platform administrator")
            }
        }

        // Check confirmation email if provided
        if (!request.confirmEmail.isNullOrBlank()) {
            require(request.confirmEmail.trim().equals(targetEmail, ignoreCase = true)) {
                "Confirmation email does not match user email"
            }
        }

        // Handle blog ownership reassignment
        val ownedBlogRows = Blogs.selectAll().where { Blogs.ownerId eq targetUserId }.toList()
        var reassignedCount = 0

        if (ownedBlogRows.isNotEmpty()) {
            val newOwnerId = request.transferOwnershipToUserId ?: actor.userId

            // Ensure the new owner exists and is an active user
            val newOwnerRow = Users.selectAll().where { Users.id eq newOwnerId }.firstOrNull()
                ?: throw IllegalArgumentException("Reassignment user with id $newOwnerId does not exist")

            val newOwnerEntityId = EntityID(newOwnerId, Users)

            // Reassign blog ownership
            Blogs.update({ Blogs.ownerId eq targetUserId }) {
                it[ownerId] = newOwnerEntityId
            }
            reassignedCount = ownedBlogRows.size

            // Ensure new owner is added as ADMIN in blog_members for each reassigned blog
            for (blogRow in ownedBlogRows) {
                val bId = blogRow[Blogs.id].value
                val blogEntityId = EntityID(bId, Blogs)
                val existingMember = BlogMembers.selectAll().where {
                    (BlogMembers.blogId eq bId) and (BlogMembers.userId eq newOwnerId)
                }.firstOrNull()

                if (existingMember == null) {
                    BlogMembers.insert {
                        it[blogId] = blogEntityId
                        it[userId] = newOwnerEntityId
                        it[role] = BlogRole.ADMIN.name
                        it[createdAt] = Instant.now()
                    }
                } else {
                    BlogMembers.update({
                        (BlogMembers.blogId eq bId) and (BlogMembers.userId eq newOwnerId)
                    }) {
                        it[role] = BlogRole.ADMIN.name
                    }
                }
            }
        }

        // Delete from blog_members
        BlogMembers.deleteWhere { BlogMembers.userId eq targetUserId }

        // Delete user
        val deletedRows = Users.deleteWhere { Users.id eq targetUserId }
        if (deletedRows == 0) {
            throw NoSuchElementException("Failed to delete user")
        }

        DeleteUserResponse(
            success = true,
            message = "User '${targetRow[Users.name]}' ($targetEmail) has been successfully deleted.",
            blogsReassignedCount = reassignedCount
        )
    }
}

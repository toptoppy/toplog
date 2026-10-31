package com.app.service

import com.app.api.dto.*
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import java.security.SecureRandom
import java.time.Instant
import java.time.temporal.ChronoUnit
import java.util.Base64

class MemberService(private val blogService: BlogService) {

    private val random = SecureRandom()

    private fun generateToken(): String {
        val bytes = ByteArray(32)
        random.nextBytes(bytes)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes)
    }

    suspend fun getTeamOverview(blogId: Long): TeamOverviewDto = dbQuery {
        val members = (BlogMembers innerJoin Users)
            .selectAll()
            .where { BlogMembers.blogId eq blogId }
            .orderBy(BlogMembers.createdAt to SortOrder.ASC)
            .map { row ->
                BlogMemberDto(
                    id = row[BlogMembers.id].value,
                    blogId = blogId,
                    userId = row[Users.id].value,
                    email = row[Users.email],
                    name = row[Users.name],
                    role = BlogRole.valueOf(row[BlogMembers.role]),
                    createdAt = row[BlogMembers.createdAt].toString()
                )
            }

        val now = Instant.now()
        val pendingInvites = BlogInvites.selectAll()
            .where { (BlogInvites.blogId eq blogId) and (BlogInvites.expiresAt greaterEq now) }
            .orderBy(BlogInvites.createdAt to SortOrder.DESC)
            .map { row ->
                BlogInviteDto(
                    id = row[BlogInvites.id].value,
                    blogId = blogId,
                    email = row[BlogInvites.email],
                    role = BlogRole.valueOf(row[BlogInvites.role]),
                    token = row[BlogInvites.token],
                    expiresAt = row[BlogInvites.expiresAt].toString(),
                    createdAt = row[BlogInvites.createdAt].toString()
                )
            }

        TeamOverviewDto(members = members, pendingInvites = pendingInvites)
    }

    suspend fun inviteMember(blogId: Long, actorUserId: Long, request: InviteMemberRequest): BlogInviteDto {
        val actorRole = blogService.getUserRoleInBlog(blogId, actorUserId)
        if (actorRole != BlogRole.ADMIN) {
            throw IllegalAccessException("Only blog administrators can invite members")
        }

        val targetEmail = request.email.trim().lowercase()
        require(targetEmail.contains('@')) { "Invalid email address" }

        // Check if user is already a member
        val existingMember = dbQuery {
            (BlogMembers innerJoin Users).selectAll()
                .where { (BlogMembers.blogId eq blogId) and (Users.email eq targetEmail) }
                .firstOrNull()
        }
        if (existingMember != null) {
            throw IllegalArgumentException("A user with this email is already a team member")
        }

        val now = Instant.now()
        val expiresAt = now.plus(7, ChronoUnit.DAYS)
        val token = generateToken()

        val inviteId = dbQuery {
            // Remove any existing invite for this email on this blog
            BlogInvites.deleteWhere { (BlogInvites.blogId eq blogId) and (BlogInvites.email eq targetEmail) }

            BlogInvites.insert {
                it[BlogInvites.blogId] = blogId
                it[BlogInvites.email] = targetEmail
                it[BlogInvites.role] = request.role.name
                it[BlogInvites.token] = token
                it[BlogInvites.createdAt] = now
                it[BlogInvites.expiresAt] = expiresAt
            } get BlogInvites.id
        }.value

        return BlogInviteDto(
            id = inviteId,
            blogId = blogId,
            email = targetEmail,
            role = request.role,
            token = token,
            expiresAt = expiresAt.toString(),
            createdAt = now.toString()
        )
    }

    suspend fun updateMemberRole(
        blogId: Long,
        actorUserId: Long,
        targetUserId: Long,
        newRole: BlogRole
    ): BlogMemberDto {
        val actorRole = blogService.getUserRoleInBlog(blogId, actorUserId)
        if (actorRole != BlogRole.ADMIN) {
            throw IllegalAccessException("Only blog administrators can modify roles")
        }

        val blog = blogService.getBlogById(blogId) ?: throw NoSuchElementException("Blog not found")
        if (blog.ownerId == targetUserId) {
            throw IllegalArgumentException("Cannot change the role of the primary blog owner")
        }

        dbQuery {
            BlogMembers.update({ (BlogMembers.blogId eq blogId) and (BlogMembers.userId eq targetUserId) }) {
                it[role] = newRole.name
            }
        }

        return dbQuery {
            (BlogMembers innerJoin Users).selectAll()
                .where { (BlogMembers.blogId eq blogId) and (BlogMembers.userId eq targetUserId) }
                .first()
                .let { row ->
                    BlogMemberDto(
                        id = row[BlogMembers.id].value,
                        blogId = blogId,
                        userId = row[Users.id].value,
                        email = row[Users.email],
                        name = row[Users.name],
                        role = BlogRole.valueOf(row[BlogMembers.role]),
                        createdAt = row[BlogMembers.createdAt].toString()
                    )
                }
        }
    }

    suspend fun removeMember(blogId: Long, actorUserId: Long, targetUserId: Long): Boolean {
        val actorRole = blogService.getUserRoleInBlog(blogId, actorUserId)
        if (actorRole != BlogRole.ADMIN && actorUserId != targetUserId) {
            throw IllegalAccessException("Only blog administrators can remove team members")
        }

        val blog = blogService.getBlogById(blogId) ?: throw NoSuchElementException("Blog not found")
        if (blog.ownerId == targetUserId) {
            throw IllegalArgumentException("Cannot remove the primary blog owner")
        }

        return dbQuery {
            BlogMembers.deleteWhere {
                (BlogMembers.blogId eq blogId) and (BlogMembers.userId eq targetUserId)
            } > 0
        }
    }

    suspend fun revokeInvite(blogId: Long, actorUserId: Long, inviteId: Long): Boolean {
        val actorRole = blogService.getUserRoleInBlog(blogId, actorUserId)
        if (actorRole != BlogRole.ADMIN) {
            throw IllegalAccessException("Only blog administrators can revoke invitations")
        }

        return dbQuery {
            BlogInvites.deleteWhere {
                (BlogInvites.blogId eq blogId) and (BlogInvites.id eq inviteId)
            } > 0
        }
    }

    suspend fun acceptInvite(token: String, userId: Long): BlogMemberDto {
        val now = Instant.now()
        val invite = dbQuery {
            BlogInvites.selectAll()
                .where { (BlogInvites.token eq token) and (BlogInvites.expiresAt greaterEq now) }
                .firstOrNull()
        } ?: throw IllegalArgumentException("Invitation token is invalid or expired")

        val blogId = invite[BlogInvites.blogId].value
        val roleStr = invite[BlogInvites.role]
        val role = BlogRole.valueOf(roleStr)

        val memberId = dbQuery {
            // Check if already member
            val existing = BlogMembers.selectAll()
                .where { (BlogMembers.blogId eq blogId) and (BlogMembers.userId eq userId) }
                .firstOrNull()

            val mId = if (existing == null) {
                BlogMembers.insert {
                    it[BlogMembers.blogId] = blogId
                    it[BlogMembers.userId] = userId
                    it[BlogMembers.role] = role.name
                    it[BlogMembers.createdAt] = now
                } get BlogMembers.id
            } else {
                existing[BlogMembers.id]
            }

            // Consume invite
            BlogInvites.deleteWhere { BlogInvites.id eq invite[BlogInvites.id] }

            mId.value
        }

        return dbQuery {
            (BlogMembers innerJoin Users).selectAll()
                .where { BlogMembers.id eq memberId }
                .first()
                .let { row ->
                    BlogMemberDto(
                        id = row[BlogMembers.id].value,
                        blogId = blogId,
                        userId = row[Users.id].value,
                        email = row[Users.email],
                        name = row[Users.name],
                        role = BlogRole.valueOf(row[BlogMembers.role]),
                        createdAt = row[BlogMembers.createdAt].toString()
                    )
                }
        }
    }
}

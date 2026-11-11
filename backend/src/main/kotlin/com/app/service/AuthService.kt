package com.app.service

import com.app.api.dto.*
import com.app.domain.model.User
import com.app.domain.model.UserRole
import com.app.domain.model.Users
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import com.app.infrastructure.security.JwtService
import com.app.infrastructure.security.PasswordHasher
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.selectAll
import java.time.Instant

class AuthService(private val jwtService: JwtService) {
    private val emailRegex = Regex("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")

    suspend fun register(request: RegisterRequest): AuthResponse {
        val email = request.email.trim().lowercase()
        require(email.isNotBlank() && emailRegex.matches(email)) { "Invalid email address format" }
        require(request.password.length in 8..128) { "Password must be between 8 and 128 characters" }

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
                it[Users.role] = UserRole.AUTHOR.name
                it[Users.createdAt] = now
            } get Users.id
        }.value

        val user = User(
            id = userId,
            email = email,
            passwordHash = hashedPassword,
            name = request.name.trim(),
            role = UserRole.AUTHOR,
            createdAt = now
        )

        val token = jwtService.generateToken(user)
        return AuthResponse(token = token, user = user.toDto())
    }

    suspend fun login(request: LoginRequest): AuthResponse {
        val email = request.email.trim().lowercase()
        val userRow = dbQuery {
            Users.selectAll().where { Users.email eq email }.firstOrNull()
        } ?: throw IllegalArgumentException("Invalid email or password")

        val user = userRow.toUser()
        if (!PasswordHasher.verify(request.password, user.passwordHash)) {
            throw IllegalArgumentException("Invalid email or password")
        }

        val token = jwtService.generateToken(user)
        return AuthResponse(token = token, user = user.toDto())
    }

    suspend fun getUserById(id: Long): User? = dbQuery {
        Users.selectAll().where { Users.id eq id }.firstOrNull()?.toUser()
    }

    private fun ResultRow.toUser(): User = User(
        id = this[Users.id].value,
        email = this[Users.email],
        passwordHash = this[Users.passwordHash],
        name = this[Users.name],
        role = UserRole.valueOf(this[Users.role]),
        createdAt = this[Users.createdAt]
    )

    private fun User.toDto(): UserDto = UserDto(
        id = this.id,
        email = this.email,
        name = this.name,
        role = this.role
    )
}

package com.app.infrastructure.security

import com.app.config.AppConfig
import com.app.domain.model.User
import com.app.domain.model.UserRole
import com.auth0.jwt.JWT
import com.auth0.jwt.JWTVerifier
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.auth.*
import java.util.*

@Suppress("DEPRECATION")
data class UserPrincipal(
    val userId: Long,
    val email: String,
    val role: UserRole
) : Principal

class JwtService(private val config: AppConfig) {
    private val algorithm = Algorithm.HMAC256(config.jwtSecret)

    val verifier: JWTVerifier = JWT
        .require(algorithm)
        .withIssuer(config.jwtIssuer)
        .withAudience(config.jwtAudience)
        .build()

    fun generateToken(user: User): String {
        val now = System.currentTimeMillis()
        val expiresAt = Date(now + config.jwtExpirationMs)

        return JWT.create()
            .withIssuer(config.jwtIssuer)
            .withAudience(config.jwtAudience)
            .withSubject(user.id.toString())
            .withClaim("email", user.email)
            .withClaim("role", user.role.name)
            .withIssuedAt(Date(now))
            .withExpiresAt(expiresAt)
            .sign(algorithm)
    }
}

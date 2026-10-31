package com.app.config

import io.ktor.server.config.*

data class AppConfig(
    val dbUrl: String,
    val dbUser: String,
    val dbPass: String,
    val dbPoolSize: Int,
    val jwtSecret: String,
    val jwtIssuer: String,
    val jwtAudience: String,
    val jwtRealm: String,
    val jwtExpirationMs: Long,
    val uploadsDir: String,
    val baseDomain: String,
    val aiApiKey: String?,
    val aiBaseUrl: String,
    val aiModel: String
) {
    companion object {
        fun fromApplicationConfig(config: ApplicationConfig): AppConfig {
            return AppConfig(
                dbUrl = config.tryGetString("database.url") ?: "jdbc:postgresql://localhost:5432/blogdb",
                dbUser = config.tryGetString("database.user") ?: "postgres",
                dbPass = config.tryGetString("database.password") ?: "postgres",
                dbPoolSize = config.tryGetString("database.poolSize")?.toIntOrNull() ?: 10,
                jwtSecret = config.tryGetString("jwt.secret") ?: "super-secret-key-change-me-in-production-min-32-chars",
                jwtIssuer = config.tryGetString("jwt.issuer") ?: "blogs-backend",
                jwtAudience = config.tryGetString("jwt.audience") ?: "blogs-console",
                jwtRealm = config.tryGetString("jwt.realm") ?: "Blogs",
                jwtExpirationMs = config.tryGetString("jwt.expirationMs")?.toLongOrNull() ?: 86400000L,
                uploadsDir = config.tryGetString("storage.uploadsDir") ?: "uploads",
                baseDomain = config.tryGetString("app.baseDomain") ?: "localhost",
                aiApiKey = config.tryGetString("ai.apiKey") ?: System.getenv("AI_API_KEY"),
                aiBaseUrl = config.tryGetString("ai.baseUrl") ?: System.getenv("AI_BASE_URL") ?: "https://api.openai.com/v1",
                aiModel = config.tryGetString("ai.model") ?: System.getenv("AI_MODEL") ?: "gpt-4o-mini"
            )
        }
    }
}

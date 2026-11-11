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
    val aiModel: String,
    val supportedLanguages: List<String> = listOf("en", "th")
) {
    companion object {
        fun fromApplicationConfig(config: ApplicationConfig): AppConfig {
            val (resolvedApiKey, resolvedBaseUrl, resolvedModel) = resolveAiSettings(config)
            val rawLanguages = config.tryGetString("app.supportedLanguages")
                ?: System.getenv("SUPPORTED_LANGUAGES")
                ?: "en,th"
            val supportedLanguages = rawLanguages.split(",")
                .map { it.trim().lowercase() }
                .filter { it.isNotEmpty() }
                .ifEmpty { listOf("en", "th") }
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
                aiApiKey = resolvedApiKey,
                aiBaseUrl = resolvedBaseUrl,
                aiModel = resolvedModel,
                supportedLanguages = supportedLanguages
            )
        }

        private fun resolveAiSettings(config: ApplicationConfig): Triple<String?, String, String> {
            val openrouterKey = (config.tryGetString("ai.openrouterApiKey") ?: System.getenv("OPENROUTER_API_KEY"))?.takeIf { it.isNotBlank() }
            val genericAiKey = (config.tryGetString("ai.apiKey") ?: System.getenv("AI_API_KEY"))?.takeIf { it.isNotBlank() }
            val resolvedApiKey = genericAiKey ?: openrouterKey

            val defaultBaseUrl = if (!openrouterKey.isNullOrBlank() && genericAiKey.isNullOrBlank()) {
                "https://openrouter.ai/api/v1"
            } else {
                "https://api.openai.com/v1"
            }

            val defaultModel = if (!openrouterKey.isNullOrBlank() && genericAiKey.isNullOrBlank()) {
                "google/gemini-2.0-flash-001"
            } else {
                "gpt-4o-mini"
            }

            val resolvedBaseUrl = (config.tryGetString("ai.baseUrl") ?: System.getenv("AI_BASE_URL"))?.takeIf { it.isNotBlank() }
                ?: defaultBaseUrl

            val resolvedModel = (config.tryGetString("ai.model") ?: System.getenv("AI_MODEL"))?.takeIf { it.isNotBlank() }
                ?: defaultModel

            return Triple(resolvedApiKey, resolvedBaseUrl, resolvedModel)
        }
    }
}

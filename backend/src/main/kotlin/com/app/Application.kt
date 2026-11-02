package com.app

import com.app.api.routing.authRoutes
import com.app.api.routing.consoleRoutes
import com.app.api.routing.deliveryRoutes
import com.app.api.routing.internalRoutes
import com.app.config.AppConfig
import com.app.domain.model.UserRole
import com.app.infrastructure.database.DatabaseFactory
import com.app.infrastructure.security.JwtService
import com.app.infrastructure.security.UserPrincipal
import com.app.infrastructure.storage.StorageService
import com.app.infrastructure.theme.PebbleRenderer
import com.app.service.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.calllogging.*
import io.ktor.server.plugins.compression.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import org.slf4j.event.Level

fun main(args: Array<String>): Unit = EngineMain.main(args)

fun Application.module() {
    val config = AppConfig.fromApplicationConfig(environment.config)
    configureApp(config, initDb = true, startScheduler = true)
}

fun Application.configureApp(config: AppConfig, initDb: Boolean = true, startScheduler: Boolean = true) {
    // 1. Database Init & Flyway Migrations
    if (initDb) {
        DatabaseFactory.init(config)
    }

    // 2. Services
    val jwtService = JwtService(config)
    val authService = AuthService(jwtService)
    val blogService = BlogService()
    val webhookService = WebhookService()
    val revisionService = RevisionService()
    val postService = PostService(webhookService, revisionService)
    val exportService = ExportService(blogService, postService)
    val ogImageService = OgImageService()
    val tagService = TagService()
    val storageService = StorageService(config)
    val commentService = CommentService(webhookService)
    val memberService = MemberService(blogService)
    val domainService = DomainService(blogService, config)
    val pebbleRenderer = PebbleRenderer()
    val deliveryService = DeliveryService(pebbleRenderer, commentService, tagService)
    val aiService = AiService(config)
    val importService = ImportService(postService, tagService)
    val newsletterService = NewsletterService(postService)
    val analyticsService = AnalyticsService()
    val schedulerService = SchedulerService(webhookService, revisionService)
    if (startScheduler) {
        schedulerService.start()
        monitor.subscribe(ApplicationStopped) {
            schedulerService.stop()
        }
    }

    // 3. Plugins
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
            ignoreUnknownKeys = true
            encodeDefaults = true
        })
    }

    install(Compression) {
        gzip {
            priority = 1.0
            minimumSize(1024)
        }
        deflate {
            priority = 10.0
            minimumSize(1024)
        }
    }

    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Patch)
        allowMethod(HttpMethod.Delete)
    }

    install(CallLogging) {
        level = Level.INFO
    }

    install(StatusPages) {
        exception<IllegalArgumentException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to (cause.message ?: "Invalid request")))
        }
        exception<NoSuchElementException> { call, cause ->
            call.respond(HttpStatusCode.NotFound, mapOf("error" to (cause.message ?: "Resource not found")))
        }
        exception<IllegalAccessException> { call, cause ->
            call.respond(HttpStatusCode.Forbidden, mapOf("error" to (cause.message ?: "Access denied")))
        }
        exception<Throwable> { call, cause ->
            this@configureApp.log.error("Unhandled error: ${cause.message}", cause)
            call.respond(HttpStatusCode.InternalServerError, mapOf("error" to "Internal server error"))
        }
    }

    install(Authentication) {
        jwt("auth-jwt") {
            realm = config.jwtRealm
            verifier(jwtService.verifier)
            validate { credential ->
                val userId = credential.payload.subject?.toLongOrNull()
                val email = credential.payload.getClaim("email").asString()
                val roleStr = credential.payload.getClaim("role").asString()

                if (userId != null && email != null && roleStr != null) {
                    UserPrincipal(userId, email, UserRole.valueOf(roleStr))
                } else {
                    null
                }
            }
            challenge { _, _ ->
                call.respond(HttpStatusCode.Unauthorized, mapOf("error" to "Token is invalid or expired"))
            }
        }
    }

    // 4. Routing
    routing {
        authRoutes(authService)
        internalRoutes(blogService)
        consoleRoutes(
            blogService,
            postService,
            tagService,
            storageService,
            aiService,
            webhookService,
            importService,
            newsletterService,
            analyticsService,
            memberService,
            domainService,
            commentService,
            exportService,
            revisionService,
            schedulerService,
            ogImageService
        )
        deliveryRoutes(
            blogService,
            deliveryService,
            postService,
            tagService,
            newsletterService,
            analyticsService,
            commentService,
            ogImageService,
            config
        )
    }
}

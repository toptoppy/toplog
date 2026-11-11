package com.app.service

import com.app.api.dto.*
import com.app.domain.model.WebhookDeliveries
import com.app.domain.model.Webhooks
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.slf4j.LoggerFactory
import java.net.InetAddress
import java.net.URI
import java.security.SecureRandom
import java.time.Instant
import java.util.*
import javax.crypto.Mac
import javax.crypto.spec.SecretKeySpec
import kotlin.system.measureTimeMillis

class WebhookService(private val allowLocalhost: Boolean = true) {
    private val logger = LoggerFactory.getLogger(WebhookService::class.java)
    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    private val httpClient = HttpClient(CIO) {
        engine {
            requestTimeout = 10000 // 10 seconds
        }
    }

    /**
     * SSRF Protection: Validates that webhook URLs use http/https and do not target
     * forbidden internal endpoints or cloud metadata services (e.g. 169.254.169.254).
     */
    fun validateWebhookUrl(rawUrl: String): String {
        val trimmed = rawUrl.trim()
        val uri = try {
            URI(trimmed)
        } catch (e: Exception) {
            throw IllegalArgumentException("Invalid webhook URL format: ${e.message}")
        }

        val scheme = uri.scheme?.lowercase()
        require(scheme == "http" || scheme == "https") {
            "Webhook URL must use http or https scheme"
        }

        val host = uri.host ?: throw IllegalArgumentException("Webhook URL missing host")

        val addresses = try {
            InetAddress.getAllByName(host)
        } catch (e: Exception) {
            throw IllegalArgumentException("Cannot resolve webhook host: $host")
        }

        for (addr in addresses) {
            val ip = addr.hostAddress

            // Link-local / Cloud metadata: 169.254.0.0/16 (AWS, GCP, Azure, DigitalOcean)
            if (addr.isLinkLocalAddress || ip.startsWith("169.254.")) {
                throw IllegalArgumentException("Webhook URL targets forbidden link-local or cloud metadata address")
            }

            // Loopback addresses: 127.0.0.0/8, ::1, localhost
            if (addr.isLoopbackAddress || ip == "127.0.0.1" || host.equals("localhost", ignoreCase = true)) {
                if (!allowLocalhost) {
                    throw IllegalArgumentException("Webhook URL cannot target loopback address in production")
                }
            }

            // Site-local / RFC 1918 Private networks (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
            if (addr.isSiteLocalAddress && !allowLocalhost) {
                throw IllegalArgumentException("Webhook URL cannot target private network address in production")
            }

            if (addr.isMulticastAddress || addr.isAnyLocalAddress) {
                throw IllegalArgumentException("Webhook URL cannot target multicast or wildcard address")
            }
        }

        return trimmed
    }

    private fun generateSecret(): String {
        val random = ByteArray(24)
        SecureRandom().nextBytes(random)
        return Base64.getUrlEncoder().withoutPadding().encodeToString(random)
    }

    private fun signPayload(payload: String, secret: String): String {
        val mac = Mac.getInstance("HmacSHA256")
        val secretKey = SecretKeySpec(secret.toByteArray(Charsets.UTF_8), "HmacSHA256")
        mac.init(secretKey)
        val hash = mac.doFinal(payload.toByteArray(Charsets.UTF_8))
        return hash.joinToString("") { "%02x".format(it) }
    }

    private fun toWebhookResponse(row: ResultRow): WebhookResponseDto {
        val eventsStr = row[Webhooks.events]
        val eventsList = eventsStr.split(",").map { it.trim() }.filter { it.isNotEmpty() }
        return WebhookResponseDto(
            id = row[Webhooks.id].value,
            blogId = row[Webhooks.blogId].value,
            url = row[Webhooks.url],
            secret = row[Webhooks.secret],
            events = eventsList,
            isActive = row[Webhooks.isActive],
            createdAt = row[Webhooks.createdAt].toString(),
            updatedAt = row[Webhooks.updatedAt].toString()
        )
    }

    private fun toDeliveryResponse(row: ResultRow): WebhookDeliveryDto {
        return WebhookDeliveryDto(
            id = row[WebhookDeliveries.id].value,
            webhookId = row[WebhookDeliveries.webhookId].value,
            event = row[WebhookDeliveries.event],
            payload = row[WebhookDeliveries.payload],
            responseStatus = row[WebhookDeliveries.responseStatus],
            responseBody = row[WebhookDeliveries.responseBody],
            durationMs = row[WebhookDeliveries.durationMs],
            errorMessage = row[WebhookDeliveries.errorMessage],
            createdAt = row[WebhookDeliveries.createdAt].toString()
        )
    }

    suspend fun listWebhooks(blogId: Long): List<WebhookResponseDto> = dbQuery {
        Webhooks.selectAll()
            .where { Webhooks.blogId eq blogId }
            .orderBy(Webhooks.createdAt, SortOrder.DESC)
            .map { toWebhookResponse(it) }
    }

    suspend fun getWebhook(blogId: Long, webhookId: Long): WebhookResponseDto? = dbQuery {
        Webhooks.selectAll()
            .where { (Webhooks.blogId eq blogId) and (Webhooks.id eq webhookId) }
            .map { toWebhookResponse(it) }
            .singleOrNull()
    }

    suspend fun createWebhook(blogId: Long, req: CreateWebhookRequest): WebhookResponseDto = dbQuery {
        val safeUrl = validateWebhookUrl(req.url)
        val secret = if (!req.secret.isNullOrBlank()) req.secret else generateSecret()
        val eventsJoined = req.events.joinToString(",")
        val now = Instant.now()

        val id = Webhooks.insertAndGetId {
            it[Webhooks.blogId] = blogId
            it[url] = safeUrl
            it[Webhooks.secret] = secret
            it[events] = eventsJoined
            it[isActive] = req.isActive
            it[createdAt] = now
            it[updatedAt] = now
        }.value

        WebhookResponseDto(
            id = id,
            blogId = blogId,
            url = safeUrl,
            secret = secret,
            events = req.events,
            isActive = req.isActive,
            createdAt = now.toString(),
            updatedAt = now.toString()
        )
    }

    suspend fun updateWebhook(blogId: Long, webhookId: Long, req: UpdateWebhookRequest): WebhookResponseDto? = dbQuery {
        val safeUrl = validateWebhookUrl(req.url)
        val existing = Webhooks.selectAll()
            .where { (Webhooks.blogId eq blogId) and (Webhooks.id eq webhookId) }
            .singleOrNull() ?: return@dbQuery null

        val secret = if (!req.secret.isNullOrBlank()) req.secret else existing[Webhooks.secret]
        val eventsJoined = req.events.joinToString(",")
        val now = Instant.now()

        Webhooks.update({ (Webhooks.blogId eq blogId) and (Webhooks.id eq webhookId) }) {
            it[url] = safeUrl
            it[Webhooks.secret] = secret
            it[events] = eventsJoined
            it[isActive] = req.isActive
            it[updatedAt] = now
        }

        WebhookResponseDto(
            id = webhookId,
            blogId = blogId,
            url = safeUrl,
            secret = secret,
            events = req.events,
            isActive = req.isActive,
            createdAt = existing[Webhooks.createdAt].toString(),
            updatedAt = now.toString()
        )
    }

    suspend fun deleteWebhook(blogId: Long, webhookId: Long): Boolean = dbQuery {
        val count = Webhooks.deleteWhere {
            (Webhooks.blogId eq blogId) and (Webhooks.id eq webhookId)
        }
        count > 0
    }

    suspend fun listDeliveries(blogId: Long, webhookId: Long, limit: Int = 20): List<WebhookDeliveryDto> = dbQuery {
        val exists = Webhooks.selectAll()
            .where { (Webhooks.blogId eq blogId) and (Webhooks.id eq webhookId) }
            .count() > 0
        if (!exists) return@dbQuery emptyList()

        WebhookDeliveries.selectAll()
            .where { WebhookDeliveries.webhookId eq webhookId }
            .orderBy(WebhookDeliveries.createdAt, SortOrder.DESC)
            .limit(limit)
            .map { toDeliveryResponse(it) }
    }

    suspend fun sendTestPing(blogId: Long, webhookId: Long): TestWebhookResultDto {
        val webhook = getWebhook(blogId, webhookId)
            ?: throw IllegalArgumentException("Webhook not found")

        val payload = """
            {
               "event": "test.ping",
               "blog_id": $blogId,
               "timestamp": "${Instant.now()}",
               "message": "Webhook test ping successful!"
            }
        """.trimIndent()

        val signature = "sha256=${signPayload(payload, webhook.secret)}"
        var statusCode: Int? = null
        var responseBody: String? = null
        var errorMessage: String? = null

        val duration = measureTimeMillis {
            try {
                val safeUrl = validateWebhookUrl(webhook.url)
                val response = httpClient.post(safeUrl) {
                    contentType(ContentType.Application.Json)
                    header("User-Agent", "Blogs-Webhook/1.0")
                    header("X-Webhook-Event", "test.ping")
                    header("X-Webhook-Signature", signature)
                    setBody(payload)
                }
                statusCode = response.status.value
                responseBody = response.bodyAsText().take(2000)
            } catch (e: Exception) {
                errorMessage = e.message ?: "Failed to connect to webhook URL"
            }
        }.toInt()

        // Log the test delivery
        dbQuery {
            WebhookDeliveries.insert {
                it[WebhookDeliveries.webhookId] = webhookId
                it[event] = "test.ping"
                it[WebhookDeliveries.payload] = payload
                it[responseStatus] = statusCode
                it[WebhookDeliveries.responseBody] = responseBody
                it[durationMs] = duration
                it[WebhookDeliveries.errorMessage] = errorMessage
                it[createdAt] = Instant.now()
            }
        }

        return TestWebhookResultDto(
            success = statusCode != null && statusCode in 200..299,
            statusCode = statusCode,
            durationMs = duration,
            errorMessage = errorMessage
        )
    }

    fun dispatch(blogId: Long, event: String, payloadJson: String) {
        scope.launch {
            try {
                val targets = dbQuery {
                    Webhooks.selectAll()
                        .where { (Webhooks.blogId eq blogId) and (Webhooks.isActive eq true) }
                        .map {
                            Triple(
                                it[Webhooks.id].value,
                                it[Webhooks.url],
                                Pair(it[Webhooks.secret], it[Webhooks.events])
                            )
                        }
                }

                for ((webhookId, url, secretAndEvents) in targets) {
                    val (secret, eventsStr) = secretAndEvents
                    val eventsList = eventsStr.split(",").map { it.trim().lowercase() }
                    if (!eventsList.contains("*") && !eventsList.contains(event.lowercase())) {
                        continue
                    }

                    val signature = "sha256=${signPayload(payloadJson, secret)}"
                    var statusCode: Int? = null
                    var responseBody: String? = null
                    var errorMessage: String? = null

                    val duration = measureTimeMillis {
                        try {
                            val safeUrl = validateWebhookUrl(url)
                            val response = httpClient.post(safeUrl) {
                                contentType(ContentType.Application.Json)
                                header("User-Agent", "Blogs-Webhook/1.0")
                                header("X-Webhook-Event", event)
                                header("X-Webhook-Signature", signature)
                                setBody(payloadJson)
                            }
                            statusCode = response.status.value
                            responseBody = response.bodyAsText().take(2000)
                        } catch (e: Exception) {
                            errorMessage = e.message ?: "Delivery failed"
                        }
                    }.toInt()

                    try {
                        dbQuery {
                            WebhookDeliveries.insert {
                                it[WebhookDeliveries.webhookId] = webhookId
                                it[WebhookDeliveries.event] = event
                                it[WebhookDeliveries.payload] = payloadJson
                                it[responseStatus] = statusCode
                                it[WebhookDeliveries.responseBody] = responseBody
                                it[durationMs] = duration
                                it[WebhookDeliveries.errorMessage] = errorMessage
                                it[createdAt] = Instant.now()
                            }
                        }
                    } catch (dbEx: Exception) {
                        logger.error("Failed to record webhook delivery for webhookId=$webhookId: ${dbEx.message}", dbEx)
                    }
                }
            } catch (e: Exception) {
                logger.error("Failed to dispatch webhook event '$event' for blogId=$blogId: ${e.message}", e)
            }
        }
    }
}

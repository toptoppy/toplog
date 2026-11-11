package com.app.infrastructure.security

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.ConcurrentLinkedQueue

/**
 * Thread-safe sliding-window in-memory rate limiter.
 */
class RateLimiter(
    val maxRequests: Int,
    val windowMs: Long,
    var enabled: Boolean = true
) {
    private val clientRequests = ConcurrentHashMap<String, ConcurrentLinkedQueue<Long>>()

    fun tryAcquire(clientKey: String): Boolean {
        if (!enabled) return true
        val now = System.currentTimeMillis()
        val queue = clientRequests.computeIfAbsent(clientKey) { ConcurrentLinkedQueue() }

        val threshold = now - windowMs
        while (queue.isNotEmpty() && queue.peek() < threshold) {
            queue.poll()
        }

        return synchronized(queue) {
            while (queue.isNotEmpty() && queue.peek() < threshold) {
                queue.poll()
            }
            if (queue.size < maxRequests) {
                queue.add(now)
                true
            } else {
                false
            }
        }
    }

    fun reset() {
        clientRequests.clear()
    }
}

/**
 * Checks rate limiting on the incoming call. If rate limit is exceeded,
 * responds with 429 Too Many Requests and returns false.
 */
suspend fun ApplicationCall.checkRateLimit(rateLimiter: RateLimiter): Boolean {
    val key = request.header("X-Forwarded-For")?.split(",")?.firstOrNull()?.trim()
        ?: request.origin.remoteHost
    if (!rateLimiter.tryAcquire(key)) {
        respond(
            HttpStatusCode.TooManyRequests,
            mapOf("error" to "Too many requests. Please slow down and try again later.")
        )
        return false
    }
    return true
}

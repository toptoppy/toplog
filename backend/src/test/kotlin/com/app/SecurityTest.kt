package com.app

import com.app.config.AppConfig
import com.app.infrastructure.storage.StorageService
import com.app.infrastructure.security.RateLimiter
import com.app.service.CommentService
import com.app.service.WebhookService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.junit.jupiter.api.io.TempDir
import java.io.ByteArrayInputStream
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class SecurityTest {

    @Test
    fun testWebhookSsrfProtection() {
        val devWebhookService = WebhookService(allowLocalhost = true)
        val prodWebhookService = WebhookService(allowLocalhost = false)

        // 1. Cloud Instance Metadata Service (AWS/GCP/Azure 169.254.169.254) must be blocked universally
        assertThrows<IllegalArgumentException> {
            devWebhookService.validateWebhookUrl("http://169.254.169.254/latest/meta-data/")
        }
        assertThrows<IllegalArgumentException> {
            prodWebhookService.validateWebhookUrl("http://169.254.169.254/latest/meta-data/")
        }

        // 2. Dangerous schemes must be blocked
        assertThrows<IllegalArgumentException> {
            devWebhookService.validateWebhookUrl("file:///etc/passwd")
        }
        assertThrows<IllegalArgumentException> {
            devWebhookService.validateWebhookUrl("gopher://127.0.0.1:25")
        }

        // 3. Loopback in production must be blocked
        assertThrows<IllegalArgumentException> {
            prodWebhookService.validateWebhookUrl("http://127.0.0.1:8080/hook")
        }
        assertThrows<IllegalArgumentException> {
            prodWebhookService.validateWebhookUrl("http://localhost:3000/hook")
        }

        // 4. Loopback in development must be allowed for local integrations (toppy-personal-web at localhost:3000)
        val devSafeUrl = devWebhookService.validateWebhookUrl("http://localhost:3000/api/webhooks/toplog")
        assertEquals("http://localhost:3000/api/webhooks/toplog", devSafeUrl)
    }

    @Test
    fun testCommentUrlSanitizer() {
        // 1. Dangerous pseudo-protocols must be stripped (XSS prevention)
        assertNull(CommentService.sanitizeUrl("javascript:alert(document.cookie)"))
        assertNull(CommentService.sanitizeUrl("JAVASCRIPT:alert(1)"))
        assertNull(CommentService.sanitizeUrl("data:text/html,<script>alert(1)</script>"))
        assertNull(CommentService.sanitizeUrl("vbscript:msgbox(1)"))
        assertNull(CommentService.sanitizeUrl("file:///etc/hosts"))
        assertNull(CommentService.sanitizeUrl("ftp://evil.com"))
        assertNull(CommentService.sanitizeUrl("not-a-url"))

        // 2. Legitimate URLs must be preserved
        assertEquals("https://toppy.dev", CommentService.sanitizeUrl("https://toppy.dev"))
        assertEquals("http://myblog.com/about", CommentService.sanitizeUrl("http://myblog.com/about"))
        assertEquals("https://github.com/toptoppy", CommentService.sanitizeUrl("  https://github.com/toptoppy  "))
    }

    @Test
    fun testRateLimiterSlidingWindow() {
        val limiter = RateLimiter(maxRequests = 3, windowMs = 5000L)
        val clientIp = "192.168.1.100"

        // First 3 requests must succeed
        assertTrue(limiter.tryAcquire(clientIp))
        assertTrue(limiter.tryAcquire(clientIp))
        assertTrue(limiter.tryAcquire(clientIp))

        // 4th request exceeds burst quota within window
        assertFalse(limiter.tryAcquire(clientIp))

        // Different IP is independently tracked
        assertTrue(limiter.tryAcquire("10.0.0.5"))

        // Reset clears buckets
        limiter.reset()
        assertTrue(limiter.tryAcquire(clientIp))
    }

    @Test
    fun testStorageServicePathTraversalPrevention(@TempDir tempDir: File) {
        val config = AppConfig(
            dbUrl = "jdbc:postgresql://localhost:5432/blogdb",
            dbUser = "postgres",
            dbPass = "postgres",
            dbPoolSize = 5,
            jwtSecret = "secret-key-for-test-min-32-chars-long",
            jwtIssuer = "test-issuer",
            jwtAudience = "test-audience",
            jwtRealm = "test",
            jwtExpirationMs = 3600000L,
            uploadsDir = tempDir.absolutePath,
            baseDomain = "localhost",
            aiApiKey = null,
            aiBaseUrl = "https://openrouter.ai/api/v1",
            aiModel = "google/gemini-2.0-flash-001"
        )
        val storage = StorageService(config)

        // 1. Valid file save
        val content = "Hello Secure World".toByteArray()
        val (savedName, bytes) = storage.saveFile(1L, "photo.png", ByteArrayInputStream(content))
        assertTrue(bytes > 0)
        assertTrue(savedName.endsWith(".png"))

        // 2. Valid file retrieval
        val retrieved = storage.getFile(savedName)
        assertNotNull(retrieved)
        assertEquals(String(content), retrieved.readText())

        // 3. Path traversal attack attempts
        assertNull(storage.getFile("../../../etc/passwd"))
        assertNull(storage.getFile("..\\..\\windows\\win.ini"))
        assertNull(storage.getFile("sub/../../something"))
        assertNull(storage.getFile("/etc/passwd"))

        // 4. File extension validation - executable/dangerous script extensions stripped
        val (dangerousName, _) = storage.saveFile(1L, "exploit.sh", ByteArrayInputStream("echo hack".toByteArray()))
        assertTrue(!dangerousName.endsWith(".sh"), "Dangerous executable extension should not be preserved")

        // 5. Tenant isolation for media assets
        val (blog2File, _) = storage.saveFile(2L, "secret.png", ByteArrayInputStream("blog2 data".toByteArray()))
        val blog1Media = storage.listMediaForBlog(1L)
        val blog2Media = storage.listMediaForBlog(2L)

        assertTrue(blog1Media.any { it.filename == savedName })
        assertTrue(blog1Media.none { it.filename == blog2File }, "Blog 1 must not see Blog 2 assets")
        assertTrue(blog2Media.any { it.filename == blog2File })
        assertTrue(blog2Media.none { it.filename == savedName }, "Blog 2 must not see Blog 1 assets")

        // 6. Cross-tenant deletion prevention
        val crossDeleteSuccess = storage.deleteMediaFile(blogId = 1L, filename = blog2File)
        assertTrue(!crossDeleteSuccess, "Blog 1 must not be able to delete Blog 2 file")

        // 7. Legitimate deletion
        val selfDeleteSuccess = storage.deleteMediaFile(blogId = 1L, filename = savedName)
        assertTrue(selfDeleteSuccess, "Blog 1 should be able to delete its own file")
        assertNull(storage.getFile(savedName), "Deleted file must no longer be accessible")
    }
}

package com.app

import com.app.config.AppConfig
import com.app.infrastructure.storage.StorageService
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.io.TempDir
import java.io.ByteArrayInputStream
import java.io.File
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull
import kotlin.test.assertTrue

class SecurityTest {

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

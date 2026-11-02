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
    }
}

package com.app

import com.app.infrastructure.security.PasswordHasher
import org.junit.jupiter.api.Test
import kotlin.test.assertTrue

class ApplicationTest {

    @Test
    fun testPasswordHasher() {
        val hash = PasswordHasher.hash("password123")
        println("BCRYPT_HASH: $hash")
        assertTrue(PasswordHasher.verify("password123", hash))
    }
}

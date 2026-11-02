package com.app.infrastructure.storage

import com.app.config.AppConfig
import java.io.File
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.StandardCopyOption
import java.util.UUID

class StorageService(private val config: AppConfig) {
    private val rootDir = File(config.uploadsDir).apply {
        if (!exists()) mkdirs()
    }

    private val allowedExtensions = setOf(
        "jpg", "jpeg", "png", "gif", "webp", "svg", "ico",
        "avif", "pdf", "zip", "xml", "json", "txt", "md"
    )

    fun saveFile(blogId: Long, originalFilename: String, inputStream: InputStream): Pair<String, Long> {
        val extension = originalFilename.substringAfterLast('.', "").lowercase().trim()
        val safeExt = if (extension in allowedExtensions) ".$extension" else ""
        val uniqueName = "${blogId}_${UUID.randomUUID()}$safeExt"

        val targetFile = File(rootDir, uniqueName).canonicalFile
        val canonicalRoot = rootDir.canonicalFile

        // Path traversal guard
        if (!targetFile.toPath().startsWith(canonicalRoot.toPath())) {
            throw SecurityException("Invalid target file path")
        }

        val bytesCopied = Files.copy(inputStream, targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
        return Pair(uniqueName, bytesCopied)
    }

    fun getFile(filename: String): File? {
        // Reject path separators and parent directory references immediately
        if (filename.isBlank() || filename.contains('/') || filename.contains('\\') || filename.contains("..")) {
            return null
        }

        val targetFile = File(rootDir, filename).canonicalFile
        val canonicalRoot = rootDir.canonicalFile

        // Verify that target stays within uploads root directory
        if (!targetFile.toPath().startsWith(canonicalRoot.toPath())) {
            return null
        }

        return if (targetFile.exists() && targetFile.isFile) targetFile else null
    }
}

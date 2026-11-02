package com.app.infrastructure.storage

import com.app.api.dto.MediaItemDto
import com.app.config.AppConfig
import java.io.File
import java.io.InputStream
import java.nio.file.Files
import java.nio.file.StandardCopyOption
import java.time.Instant
import java.time.format.DateTimeFormatter
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

    fun listMediaForBlog(blogId: Long): List<MediaItemDto> {
        val prefix = "${blogId}_"
        val files = rootDir.listFiles { file ->
            file.isFile && file.name.startsWith(prefix)
        } ?: emptyArray()

        val formatter = DateTimeFormatter.ISO_INSTANT

        return files
            .sortedByDescending { it.lastModified() }
            .map { file ->
                val ext = file.extension.lowercase()
                val contentType = resolveContentType(ext)
                val instant = Instant.ofEpochMilli(file.lastModified())
                MediaItemDto(
                    filename = file.name,
                    url = "/uploads/${file.name}",
                    sizeBytes = file.length(),
                    contentType = contentType,
                    createdAt = formatter.format(instant)
                )
            }
    }

    fun deleteMediaFile(blogId: Long, filename: String): Boolean {
        val prefix = "${blogId}_"
        // Ensure the filename strictly belongs to this blogId and contains no path traversal
        if (!filename.startsWith(prefix) || filename.contains('/') || filename.contains('\\') || filename.contains("..")) {
            return false
        }
        val file = File(rootDir, filename).canonicalFile
        val canonicalRoot = rootDir.canonicalFile
        if (!file.toPath().startsWith(canonicalRoot.toPath()) || !file.exists() || !file.isFile) {
            return false
        }
        return file.delete()
    }

    private fun resolveContentType(ext: String): String = when (ext) {
        "jpg", "jpeg" -> "image/jpeg"
        "png" -> "image/png"
        "gif" -> "image/gif"
        "webp" -> "image/webp"
        "svg" -> "image/svg+xml"
        "ico" -> "image/x-icon"
        "avif" -> "image/avif"
        "pdf" -> "application/pdf"
        "zip" -> "application/zip"
        "xml" -> "application/xml"
        "json" -> "application/json"
        "txt", "md" -> "text/plain"
        else -> "application/octet-stream"
    }
}

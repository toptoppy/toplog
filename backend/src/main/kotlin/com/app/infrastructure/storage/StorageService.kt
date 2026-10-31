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

    fun saveFile(blogId: Long, originalFilename: String, inputStream: InputStream): Pair<String, Long> {
        val extension = originalFilename.substringAfterLast('.', "")
        val safeExt = if (extension.isNotBlank()) ".$extension" else ""
        val uniqueName = "${blogId}_${UUID.randomUUID()}$safeExt"

        val targetFile = File(rootDir, uniqueName)
        val bytesCopied = Files.copy(inputStream, targetFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
        return Pair(uniqueName, bytesCopied)
    }

    fun getFile(filename: String): File? {
        val file = File(rootDir, filename)
        return if (file.exists() && file.isFile) file else null
    }
}

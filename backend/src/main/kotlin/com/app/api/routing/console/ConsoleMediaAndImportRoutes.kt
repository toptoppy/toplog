package com.app.api.routing.console

import com.app.api.dto.DeleteMediaResponse
import com.app.api.dto.ImportResultDto
import com.app.infrastructure.storage.StorageService
import com.app.service.BlogService
import com.app.service.ImportService
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.utils.io.jvm.javaio.toInputStream

fun Route.consoleMediaAndImportRoutes(
    storageService: StorageService,
    importService: ImportService,
    blogService: BlogService
) {
    // --- MEDIA ASSET MANAGEMENT ---
    route("/media") {
        get {
            val blogId = call.parameters["blogId"]!!.toLong()
            val media = storageService.listMediaForBlog(blogId)
            call.respond(HttpStatusCode.OK, media)
        }

        post {
            val blogId = call.parameters["blogId"]!!.toLong()
            val multipart = call.receiveMultipart()
            var uploadedUrl: String? = null
            var savedFileName: String? = null

            multipart.forEachPart { part ->
                if (part is PartData.FileItem) {
                    val originalName = part.originalFileName ?: "file"
                    val inputStream = part.provider().toInputStream()
                    val (savedName, _) = storageService.saveFile(blogId, originalName, inputStream)
                    savedFileName = savedName
                    uploadedUrl = "/uploads/$savedName"
                }
                part.dispose()
            }

            if (uploadedUrl != null) {
                call.respond(HttpStatusCode.Created, mapOf("url" to uploadedUrl, "filename" to savedFileName))
            } else {
                call.respond(HttpStatusCode.BadRequest, "No file uploaded")
            }
        }

        delete("/{filename}") {
            val blogId = call.parameters["blogId"]!!.toLong()
            val filename = call.parameters["filename"]
                ?: return@delete call.respond(HttpStatusCode.BadRequest, mapOf("error" to "Filename required"))

            val deleted = storageService.deleteMediaFile(blogId, filename)
            if (deleted) {
                call.respond(HttpStatusCode.OK, DeleteMediaResponse(success = true, message = "Asset deleted successfully"))
            } else {
                call.respond(HttpStatusCode.NotFound, mapOf("error" to "Asset not found or access denied"))
            }
        }
    }

    // --- CONTENT IMPORTERS ---
    route("/import") {
        post("/wordpress") {
            val blogId = call.parameters["blogId"]!!.toLong()
            val blog = blogService.getBlogById(blogId)
                ?: return@post call.respond(HttpStatusCode.NotFound, "Blog not found")

            val multipart = call.receiveMultipart()
            var result: ImportResultDto? = null

            multipart.forEachPart { part ->
                if (part is PartData.FileItem) {
                    val inputStream = part.provider().toInputStream()
                    result = importService.importWordPressXml(blogId, inputStream, blog.defaultLanguage)
                }
                part.dispose()
            }

            if (result != null) {
                call.respond(HttpStatusCode.OK, result!!)
            } else {
                call.respond(HttpStatusCode.BadRequest, "No WordPress XML file uploaded")
            }
        }

        post("/markdown") {
            val blogId = call.parameters["blogId"]!!.toLong()
            val blog = blogService.getBlogById(blogId)
                ?: return@post call.respond(HttpStatusCode.NotFound, "Blog not found")

            val multipart = call.receiveMultipart()
            var result: ImportResultDto? = null

            multipart.forEachPart { part ->
                if (part is PartData.FileItem) {
                    val originalName = part.originalFileName ?: "post.md"
                    val isZip = originalName.endsWith(".zip", ignoreCase = true)
                    val inputStream = part.provider().toInputStream()
                    result = importService.importMarkdownBundle(
                        blogId = blogId,
                        inputStream = inputStream,
                        isZip = isZip,
                        defaultLanguage = blog.defaultLanguage,
                        fallbackFilename = originalName
                    )
                }
                part.dispose()
            }

            if (result != null) {
                call.respond(HttpStatusCode.OK, result!!)
            } else {
                call.respond(HttpStatusCode.BadRequest, "No Markdown or ZIP file uploaded")
            }
        }
    }
}

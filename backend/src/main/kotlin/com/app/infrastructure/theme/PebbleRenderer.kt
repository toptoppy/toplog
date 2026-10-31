package com.app.infrastructure.theme

import io.pebbletemplates.pebble.PebbleEngine
import io.pebbletemplates.pebble.loader.ClasspathLoader
import java.io.StringWriter

class PebbleRenderer {
    private val engine: PebbleEngine = PebbleEngine.Builder()
        .loader(ClasspathLoader().apply {
            prefix = null
        })
        .cacheActive(true)
        .build()

    fun render(templatePath: String, context: Map<String, Any?>): String {
        val cleanPath = templatePath.removePrefix("/")
        val template = engine.getTemplate(cleanPath)
        val writer = StringWriter()
        template.evaluate(writer, context)
        return writer.toString()
    }
}

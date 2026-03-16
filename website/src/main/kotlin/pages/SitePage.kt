package dev.luisramos.website.pages

import dev.luisramos.website.components.SEO
import kotlinx.html.FlowContent
import kotlinx.html.body
import kotlinx.html.head
import kotlinx.html.html
import kotlinx.html.link
import kotlinx.html.meta
import kotlinx.html.stream.createHTML

fun SitePage(title: String, content: FlowContent.() -> Unit): String = createHTML().html {
    head {
        SEO(title = title, description = null, imageUrl = null)
        meta(charset = "utf-8")
        link(rel = "stylesheet", href = "/styles.css")
    }
    body {
        content()
    }
}
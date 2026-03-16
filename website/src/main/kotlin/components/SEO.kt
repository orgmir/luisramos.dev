package dev.luisramos.website.components

import dev.luisramos.website.FrontMatter
import dev.luisramos.website.SiteMetadata
import kotlinx.html.HEAD
import kotlinx.html.meta
import kotlinx.html.title

fun HEAD.SEO(frontMatter: FrontMatter) {
    SEO(title = frontMatter.title, description = frontMatter.description, imageUrl = frontMatter.imageUrl)
}

fun HEAD.SEO(
    title: String,
    description: String?,
    imageUrl: String?
) {
    title(title)
    val metaDescription = description ?: SiteMetadata.Description
    meta(name = "viewport", content = "width=device-width, initial-scale=1, shrink-to-fit=no")
    meta(name = "description", content = metaDescription)
    meta(content = metaDescription) {
        attributes["property"] = "og:description"
    }
    meta(content = "website") {
        attributes["property"] = "og:type"
    }
    meta(content = title) {
        attributes["property"] = "og:title"
    }
    imageUrl?.let { imageUrl ->
        meta(content = imageUrl) {
            attributes["property"] = "og:image"
        }
    }
}
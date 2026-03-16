package dev.luisramos.website.pages

import dev.luisramos.website.components.Layout
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.p
import kotlinx.html.style

fun NotFoundPage(): String = SitePage("Page not found") {
    Layout("/not_found") {
        div(classes = "markdown") {
            h1(classes = "text-center text-gray-900") {
                style = "{ fontSize: '4rem' }"
                +"404"
            }
            p {
                +"The page you are trying to visit doesn't exist. Maybe check out one of"
                +"the posts in the "
                a(href = "/blog") { +"blog" }
                +"."
            }
            p {
                +"Or send me a "
                a(href = "https://bsky.app/profile/luisramos.dev") { +"skeet" }
                +" if you think something is wrong!"
            }
        }
    }
}
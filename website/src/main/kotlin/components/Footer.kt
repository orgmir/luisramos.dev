package dev.luisramos.website.components

import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.footer
import kotlinx.html.li
import kotlinx.html.ul
import java.time.Year

fun FlowContent.Footer() {
    footer(classes = "mx-0 sm:mx-4") {
        ul(classes = "flex flex-wrap-reverse sm:flex-wrap justify-center items-center sm:justify-end md:max-w-screen-md md:mx-auto text-xs py-6 mt-6 border-t border-orange-300") {
            li(classes = "w-screen sm:w-auto sm:flex-grow text-center sm:text-left mt-4 sm:mt-0") {
                +"© ${Year.now().value} Luis Ramos"
            }
            listOf(
                "Github" to "https://github.com/orgmir",
                "Bluesky" to "https://bsky.app/profile/luisramos.dev",
                "RSS Feed" to "/rss.xml"
            ).forEach { (text, href) ->
                li(classes = "pr-4") {
                    a(href = href, classes = "hover:text-orange-500") {
                        +text
                    }
                }
            }
        }
    }
}
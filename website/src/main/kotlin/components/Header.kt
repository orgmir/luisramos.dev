package dev.luisramos.website.components

import dev.luisramos.website.SiteMetadata
import kotlinx.html.FlowContent
import kotlinx.html.UL
import kotlinx.html.a
import kotlinx.html.header
import kotlinx.html.li
import kotlinx.html.nav
import kotlinx.html.ul

fun UL.navItem(href: String, name: String, selected: Boolean, index: Int) {
    val classes = buildString {
        append("block mx-5 text-sm")
        when {
            index == 0 -> append("inline font-bold text-center sm:text-left mb-6 sm:mb-0")
            selected -> append("sm:ml-4 border-b-2 border-orange-500 md:flex-grow-0")
            else -> append("sm:ml-4 border-b-2 border-transparent hover:border-orange-500")
        }
    }
    li(classes = if (index == 0) "w-screen sm:w-auto sm:flex-grow" else "md:flex-grow-0") {
        a(href = href, classes = classes) {
            +name
        }
    }
}

fun FlowContent.Header(currLink: String) {
    header {
        nav(classes = "border-b border-orange-300 mb-8") {
            ul(classes = "flex flex-wrap justify-center items-center sm:justify-end md:max-w-screen-md md:mx-auto my-6") {
                SiteMetadata.MenuLinks.forEachIndexed { index, (name, href) ->
                    navItem(
                        href = href,
                        name = name,
                        selected = when (href) {
                            "/" -> currLink == href // without this it would match all locations
                            else -> currLink.contains(href)
                        },
                        index = index
                    )
                }
            }
        }
    }
}
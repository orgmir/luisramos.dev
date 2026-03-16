package dev.luisramos.website.components

import kotlinx.html.FlowContent
import kotlinx.html.div
import kotlinx.html.main

fun FlowContent.Layout(location: String, content: FlowContent.() -> Unit) {
    Header(currLink = location)
    div(classes = "container mx-auto md:max-w-screen-md") {
        main {
            content()
        }
        Footer()
    }
}
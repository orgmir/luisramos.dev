package dev.luisramos.website.components

import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.p

fun FlowContent.Face() {
    div {
        div(classes = "bg-white text-lg mb-6") {
            Hello()
            p(classes = "mt-6 leading-7 px-4") {
                +"I am a software developer that builds mobile apps."
            }
            p(classes = "mt-2 leading-7 px-4") {
                +"I write native code for iOS and Android."
            }
            p(classes = "mt-2 leading-7 px-4") {
                +"I love Kotlin and Swift!"
            }
            p(classes = "mt-2 leading-7 px-4") {
                a(href = "mailto:luis@luisramos.dev", classes = "underline text-blue-500 font-normal hover:text-blue-700") {
                    +"Get in touch!"
                }
            }
            p(classes = "mt-6 leading-7 px-4") {
                +"Learn more "
                a(href = "/about", classes = "underline text-blue-500 font-normal hover:text-blue-700") {
                    +"about me here"
                }
                +"."
            }
        }
    }
}
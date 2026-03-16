package dev.luisramos.website.pages

import dev.luisramos.website.components.Hello
import dev.luisramos.website.components.Layout
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.h2
import kotlinx.html.li
import kotlinx.html.p
import kotlinx.html.role
import kotlinx.html.span
import kotlinx.html.ul

fun AboutPage() = SitePage("About | Luis Ramos") {
    Layout("/about") {
        Hello()
        div(classes = "markdown mt-6") {
            p {
                +"I am a portuguese software developer living in Sydney "
                span {
                    role = "img"
                    attributes["aria-label"] = "australian flag"
                    +"\uD83C\uDDE6\uD83C\uDDFA"
                }
                +". I started building Android and iOS apps in 2013 and I still love doing it!"
            }
            p {
                +"I have vast experience bringing greenfield mobile projects to life, "
                +"working in product teams, and solving problems for companies in the "
                +"mobile space. You can check my CV "
                a(href = "/cv") { +"here" }
                +". If you want to work with me, please "
                a(href = "mailto:luis@luisramos.dev") { +"reach out" }
                +"!"
            }
            p {
                +"I focus on Kotlin and Swift, with some Javascript on the side. "
                +"I believe that Kotlin Multiplatform, along with SwiftUI and Jetpack Compose, "
                +"will change the way we build mobile apps for both platforms. Get in touch if you "
                +"want to talk to me about it :)"
            }
            h2 {
                span {
                    role = "img"
                    attributes["aria-label"] = "link"
                    +"\uD83D\uDD17"
                }
                +" Links"
            }
            ul {
                li {
                    +"Send me an "
                    a(href = "mailto:luis@luisramos.dev") { +"email" }
                }
                li {
                    +"Send me a "
                    a(href = "https://bsky.app/profile/luisramos.dev") { +"skeet" }
                }
                li {
                    +"Buy me a "
                    a(href = "https://ko-fi.com/luisramosdev") { +"coffee" }
                    +" "
                    span {
                        role = "img"
                        attributes["aria-label"] = "coffee"
                        +"☕\uFE0F"
                    }
                }
                li {
                    +"Check out my "
                    a(href = "https://github.com/orgmir") { +"Github" }
                }
                li {
                    +"Check out my "
                    a(href = "https://www.linkedin.com/in/luisramosdev/") { +"LinkedIn" }
                }
            }
        }
    }
}
package dev.luisramos.website.templates

import dev.luisramos.website.PostContent
import dev.luisramos.website.components.Layout
import dev.luisramos.website.components.Post
import dev.luisramos.website.components.SEO
import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.body
import kotlinx.html.button
import kotlinx.html.div
import kotlinx.html.h4
import kotlinx.html.head
import kotlinx.html.html
import kotlinx.html.link
import kotlinx.html.meta
import kotlinx.html.p
import kotlinx.html.role
import kotlinx.html.script
import kotlinx.html.span
import kotlinx.html.stream.createHTML

fun PostTemplate(post: PostContent) = createHTML().html {
    head {
        link(rel = "stylesheet", href = "/styles.css")
        link(rel = "stylesheet", href = "/prism.css")
        SEO(post.frontMatter)
        meta(charset = "utf-8")
    }
    body {
        Layout("/blog") {
            Post(post)
            FriendlyCallout(post.frontMatter.slug)
        }
        script(src = "/prism.js") { attributes["async"] = "" }
    }
}

fun FlowContent.FriendlyCallout(postRelativePath: String?) {
    div(classes = "flex-col items-center pt-6") {
        div(classes = "mx-auto w-12 border-b-2 border-orange-300 text-center mb-4")
        div(classes = "flex justify-start") {
            div(classes = "flex-col px-4 py-4") {
                h4(classes = "text-base mb-2") {
                    +"Thank you for reading"
                }
                p(classes = "text-sm opacity-75 mb-4") {
                    +"Please get in touch if you have a suggestion, find an issue or want to say hello."
                }
                div(classes = "flex-row") {


                    if (postRelativePath != null) {
                        a(
                            href = "https://github.com/Orgmir/luisramos.dev/blob/main/website/src/main/resources/content$postRelativePath"
                        ) {
                            button(classes = "text-sm rounded text-black border-2 border-gray-300 py-1 px-2 mr-4") {
                                +"Edit in Github"
                            }
                        }
                    }
                    a(href = "luis@luisramos.dev") {
                        button(classes = "text-sm rounded text-black border-2 border-gray-300 py-1 px-2 mr-4") {
                            span {
                                role = "img"
                                attributes["area-label"] = "email"
                                +"\uD83D\uDCE7"
                            }
                            +" Email me"
                        }
                    }
                    a(href = "https://bsky.app/profile/luisramos.dev") {
                        button(classes = "text-sm rounded border-2 border-blue-200 text-blue-600 py-1 px-2") {
                            span {
                                role = "img"
                                attributes["aria-label"] = "birb"
                                +"\uD83D\uDC25"
                            }
                            +" Skeet at me!"
                        }
                    }
                }
            }
        }
    }
}
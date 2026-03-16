package dev.luisramos.website.components

import dev.luisramos.website.PostContent
import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.h2
import java.text.SimpleDateFormat
import java.util.Locale

val dayFullMonthYearFormatter = SimpleDateFormat("dd MMMM, yyyy", Locale.ENGLISH)

fun FlowContent.Post(post: PostContent) {
    div {
        h1(classes = "w-full sm:w-3/4 mx-auto px-4 mb-4 text-4xl sm:text-5xl text-center font-bold") {
            a(href = post.frontMatter.slug, classes = "hover:underline") {
                +post.frontMatter.title
            }
        }
        h2(classes = "text-center text-gray-700 text-sm mb-8") {
            +dayFullMonthYearFormatter.format(post.frontMatter.date)
        }
        if (post.frontMatter.isDraft) {
            div(classes = "blockquote alert mt-6") {
                +"This is a draft post."
            }
        }
        div(classes = "markdown") {
            consumer.onTagContentUnsafe { +post.htmlBody }
        }
    }
}
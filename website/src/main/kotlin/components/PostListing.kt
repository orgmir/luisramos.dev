package dev.luisramos.website.components

import dev.luisramos.website.PostContent
import kotlinx.html.UL
import kotlinx.html.a
import kotlinx.html.h3
import kotlinx.html.li
import kotlinx.html.time

fun UL.PostListing(post: PostContent) {
    li(classes = "pr-4 pl-3 py-3 text-lg first:mt-2 leading-none hover:bg-orange-100 border-l-4 border-transparent hover:border-orange-300 radius") {
        a(href = post.frontMatter.slug) {
            h3(classes = "font-medium pb-1 w-auto") {
                +post.frontMatter.title
            }
            time(classes = "text-sm text-black text-opacity-50 block w-auto") {
                +dayFullMonthYearFormatter.format(post.frontMatter.date)
            }
        }
    }
}
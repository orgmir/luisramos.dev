package dev.luisramos.website.pages

import dev.luisramos.website.PostContent
import dev.luisramos.website.components.Layout
import dev.luisramos.website.components.PostListing
import kotlinx.html.h1
import kotlinx.html.ul

fun BlogPage(posts: List<PostContent>) = SitePage("Blog | Luis Ramos") {
    Layout("/blog") {
        h1(classes = "text-5xl px-4 mb-6") { +"Posts" }
        ul {
            posts.sortedByDescending { it.frontMatter.date }.forEach { post ->
                PostListing(post)
            }
        }
    }
}
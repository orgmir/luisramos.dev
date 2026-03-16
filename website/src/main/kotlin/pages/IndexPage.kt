package dev.luisramos.website.pages

import dev.luisramos.website.PostContent
import dev.luisramos.website.components.Face
import dev.luisramos.website.components.Layout
import dev.luisramos.website.components.PostListing
import kotlinx.html.UL
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.h2
import kotlinx.html.h3
import kotlinx.html.li
import kotlinx.html.time
import kotlinx.html.ul

fun IndexPage(posts: List<PostContent>) = SitePage("Olá | Luis Ramos") {
    Layout("/") {
        Face()
        div(classes = "mx-4 pb-1 flex border-b-2 border-orange-300") {
            h2(classes = "text-2xl font-medium") {
                +"Latest posts"
            }
            a(
                href = "/blog",
                classes = "self-center ml-8 text-xs px-2 py-1 bg-orange-200 text-orange-900 rounded-sm shadow-sm hover:shadow"
            ) {
                +"View all"
            }
        }
        ul {
            posts.sortedByDescending { it.frontMatter.date }.take(4).forEach { post ->
                PostListing(post)
            }
        }
        h2(classes = "mx-4 text-2xl font-medium pb-1 border-b-2 border-orange-300 pt-6") {
            +"Projects"
        }
        ul {
            ProjectListing(
                title = "📙 Ler",
                subTitle = "A RSS Aggregator app for Android. Open source!",
                slug = "/ler-rss-aggregator-for-android",
            )
            ProjectListing(
                title = "⏰ Clock in a dock",
                subTitle = "A clock for your macOS dock",
                slug = "/clock-in-a-dock",
            )
            ProjectListing(
                title = "👾 Pico8 games",
                subTitle = "Sometimes I build tiny games in pico8",
                slug = "/games",
            )
        }
    }
}

fun UL.ProjectListing(
    title: String,
    subTitle: String,
    slug: String,
) {
    li(classes = "pr-4 pl-3 py-3 text-lg first:mt-2 leading-none hover:bg-orange-100 border-l-4 border-transparent hover:border-orange-300 radius") {
        a(href = slug) {
            h3(classes = "font-medium pb-1 w-auto") {
                +title
            }
            time(classes = "mt-1 text-black text-opacity-50 block w-auto") {
                +subTitle
            }
        }
    }
}

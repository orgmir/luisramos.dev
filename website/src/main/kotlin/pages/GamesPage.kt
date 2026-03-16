package dev.luisramos.website.pages

import dev.luisramos.website.components.Layout
import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.img
import kotlinx.html.p

fun FlowContent.GameCartTile(
    title: String,
    imgSrc: String,
    altText: String,
    href: String
) {
    div(classes = "text-center") {
        a(href = href, target = "_black") {
            attributes["rel"] = "noopener noreferrer"
            img(src = imgSrc, alt = altText, classes = "mx-auto mb-2")
            +title
        }
    }
}

fun GamesPage() = SitePage("Games | Luis Ramos") {
    Layout("/games") {
        div(classes = "markdown") {
            div(classes = "px-4") {
                h1(classes = "text-5xl mb-2") { +"Games" }
                p {
                    +"I build tiny games in "
                    a(href = "https://www.lexaloffle.com/pico-8.php") { +"pico8" }
                    +", a fantasy console!"
                }
                div(classes = "mt-8 grid grid-cols-3 gap-x-4 gap-y-8") {
                    GameCartTile(
                        title = "Sweep the mines",
                        imgSrc = "https://www.lexaloffle.com/bbs/cposts/ha/hakegefiso-0.p8.png",
                        altText = "Sweep the mines cart",
                        href = "https://www.lexaloffle.com/bbs/?tid=35066"
                    )
                    GameCartTile(
                        title = "10 Grids",
                        imgSrc = "https://www.lexaloffle.com/bbs/cposts/na/narubihefa-0.p8.png",
                        altText = "10 Grids cart",
                        href = "https://www.lexaloffle.com/bbs/?tid=35065"
                    )
                    GameCartTile(
                        title = "Bullet Dodge",
                        imgSrc = "https://www.lexaloffle.com/bbs/cposts/pu/puzibimepu-0.p8.png",
                        altText = "Bullet Dodge cart",
                        href = "https://www.lexaloffle.com/bbs/?tid=34423"
                    )
                    GameCartTile(
                        title = "Four Room Dungeon",
                        imgSrc = "https://www.lexaloffle.com/bbs/cposts/fa/fasudabewi-0.p8.png",
                        altText = "Four Room Dungeon cart",
                        href = "https://www.lexaloffle.com/bbs/?tid=32993"
                    )
                    GameCartTile(
                        title = "Snake Clone",
                        imgSrc = "https://www.lexaloffle.com/bbs/cposts/ya/yarunakj-0.p8.png",
                        altText = "Snake Clone cart",
                        href = "https://www.lexaloffle.com/bbs/?tid=32884"
                    )
                }
            }
        }
    }
}
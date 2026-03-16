package dev.luisramos.website.components

import kotlinx.html.FlowContent
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.img

//<div className="flex text-gray-900 justify-center items-center text-center">
//<div className="">
//<img className="rounded-full" src={eu} alt="Luis' Face" width="90" height="90"/>
//</div>
//<h1 className="flex-initial text-3xl sm:text-5xl font-bold ml-2 sm:ml-6">
//Olá! I'm Luis
//</h1>
//</div>

fun FlowContent.Hello() {
    div(classes = "flex text-gray-900 justify-center items-center text-center") {
        div {
            img(alt = "Luis' Face", src = "/images/EU.png") {
                width = "90"
                height = "90"
            }
        }
        h1(classes = "flex-initial text-3xl sm:text-5xl font-bold ml-2 sm:ml-6") {
            +"Olá, I'm Luis"
        }
    }
}
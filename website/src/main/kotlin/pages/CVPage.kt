package dev.luisramos.website.pages

import dev.luisramos.website.components.Layout
import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.div
import kotlinx.html.h1
import kotlinx.html.h2
import kotlinx.html.h3
import kotlinx.html.img
import kotlinx.html.li
import kotlinx.html.p
import kotlinx.html.span
import kotlinx.html.ul

fun CVPage() = SitePage("CV | Luis Ramos") {
    Layout("/cv") {
        div(classes = "px-4") {
            h1(classes = "text-5xl mb-2") { +"Curriculum Vitae" }

            h2(classes = "border-b-2 border-orange-300 pb-1 text-2xl mb-8 mt-6") {
                a(href = "#work-experience") {
                    +" Work Experience "
                }
            }

            Job(
                company = "Remote",
                image = "/images/remote.jpg",
                link = "https://www.remote.com/",
                title = "Senior Mobile Engineer (iOS and Android)",
                location = "Anywhere 🌎",
                dates = "March 2023 - ★ Present",
            ) {
                p {
                    +"I joined Remote to build the best mobile user experience for iOS and Android, using Kotlin "
                    +"Multiplatform to leverage a shared code base."
                }
                p {
                    +"I believe tools and code architecture should be transparent in the effort to create a great user experience, so my initial "
                    +"focus was to improve the existing architecture to cut the necessary platform specific presentation boilerplate. "
                    +"I moved the existing architecture to one based of "
                    a(href = "https://github.com/pointfreeco/swift-composable-architecture") {
                        +"The Composable Architecture (TCA)"
                    }
                    +" (but in Kotlin) that allows logic to be shared up to the presentation layer. "
                    +"This architecture relied on SwiftUI and Jetpack Compose to build the best native experience for each "
                    +"platform, while reducing development time for new features and improve code testability."
                }
                ul {
                    li { +"Implemented a shared codebase architecture that is a close port of TCA for the Kotlin language." }
                    li {
                        +"Planned and executed a rolling full app migration that replaced the existing architecture logic with the new one"
                        +" reducing tech debt."
                    }
                    li {
                        +"Developed custom "
                        a(href = "https://github.com/google/ksp") { +"KSP" }
                        +" processors to generate boilerplate code to fast track development of features, "
                        +"in a similar fashion to what TCA macros do for Swift."
                    }
                    li { +"Developed Kotlin+Swift glue layer that bridged the shortcomings of Kotlin/Native Obj-C bridge around generic types." }
                    li {
                        +"Lifted platform capabilities to shared code land by building unified interfaces for platform specific "
                        +"frameworks like push notifications and background work queues."
                    }
                    li {
                        +"Implemented a Feature Flag system backed by "
                        a(href = "https://firebase.google.com/docs/remote-config/") { +"Firebase Remote Config" }
                        +" that allowed fast development cycles and dog-fooding of features for Remote internal users."
                    }
                    li { +"Prioritized customer feedback around app experience, with the aim to always satisfy our users and reduce friction." }
                    li { +"Lead the development of new features, from Figma designs to final deployment." }
                    li { +"Mentored the mobile team in good code practices and long term decision impact analysis." }
                    li {
                        +"Improved team code review experience and codebase health by adding "
                        a(href = "https://danger.systems/") { +"Danger.systems" }
                        +" rules that covered common review issues."
                    }
                }
            }

            Job(
                company = "Audience Republic",
                image = "/images/audience-republic.jpg",
                link = "https://www.audiencerepublic.com/",
                title = "Independent Mobile Developer",
                location = "Sydney",
                dates = "October 2021 - November 2022"
            ) {
                p {
                    +"I was hired to build Wave, an "
                    a(href = "https://play.google.com/store/apps/details?id=com.audiencerepublic.wave.android") {
                        +"Android"
                    }
                    +" and iOS (unreleased) app. I built it using Kotlin Multiplatform "
                    +"Mobile which enabled code sharing between both platforms, with "
                    +"platform dependent UI. This enabled me to implement new features "
                    +"quickly while following native conventions on both platforms."
                }
                ul {
                    li {
                        +"Architected and built a kotlin multiplaform solution, a custom "
                        +"kotlin version of "
                        a(href = "https://github.com/pointfreeco/swift-composable-architecture") {
                            +"The Composable Architecture (TCA)"
                        }
                    }
                    li { +"Add unit test coverage for most of the business logic, facilitated by the multiplatform architecture" }
                    li { +"UI was built using Jetpack Compose for Android and SwiftUI used for iOS, levering the best the mobile platform has to offer" }
                    li { +"Implemented automatic local deployment via Makefile and fastlane, that can ease the integration into a CI/CD platform" }
                    li { +"Provided regular updates on the progress of the project via Slack and Jira" }
                }
            }

            Job(
                company = "Streamotion",
                image = "/images/streamotion-icon.png",
                link = "https://streamotion.com.au/",
                title = "Senior Mobile Software Developer",
                location = "Sydney",
                dates = "December 2020 - July 2021"
            ) {
                p {
                    +"Streamotion is a digital B2C streaming and technology business, "
                    +"makers of entertainment streaming service "
                    a(href = "https://binge.com.au/") { +"Binge" }
                    +", and multi-sport streaming service "
                    a(href = "https://kayosports.com.au/") { +"Kayo Sports" }
                    +"."
                }
                p {
                    +"I joined the team to build a new yet-to-be-announced app. My "
                    +"responsibilities lie in upgrading the existing architecture to reuse "
                    +"more code across the apps, and also fostering a culture that enables "
                    +"the team to be more involved and productive while working on the "
                    +"code."
                }
            }

            Job(
                company = "Phoenix DX",
                image = "/images/phoenix-icon.jpg",
                link = "https://phoenix-dx.com/",
                title = "Consultant Mobile Software Developer",
                location = "Sydney",
                dates = "March 2020 - December 2020"
            ) {
                p {
                    +"Phoenix DX is a digital transformation company leveraging the "
                    a(href = "https://www.outsystems.com/") { +"OutSystems" }
                    +" platform. I worked as a mobile software consultant, helping them with native "
                    +"support for their "
                    a(href = "https://cordova.apache.org") { +"Cordova" }
                    +" plugins."
                }
            }

            Job(
                company = "Colonial First State",
                image = "/images/cfs-icon.jpg",
                link = "https://www3.colonialfirststate.com.au/",
                title = "Specialist Software Developer",
                location = "Sydney",
                dates = "March 2019 - October 2020"
            ) {
                p(classes = "text-sm italic") {
                    +"Colonial First State was a child company of "
                    a(href = "https://www.commbank.com.au/") { +"Commonwealth Bank" }
                    +". It was "
                    a(href = "https://www.commbank.com.au/articles/newsroom/2020/05/cba-announces-agreement-cfs-kkr.html") {
                        +"recently sold"
                    }
                    +" to KKR."
                }
                p {
                    +"I joined Colonial First State to build the "
                    a(href = "https://play.google.com/store/apps/details?id=au.com.cfs.mobile") { +"Android app" }
                    +" that would bring superannuation to the hands of CFS customers. I was "
                    +"the solo android dev on the team, responsible for:"
                }
                ul {
                    li { +"Design the architecture of the app to match the business' expectations" }
                    li { +"Advising the Product Owner on the capabilities of the platform" }
                    li {
                        +"Setup the teams CI pipeline into the company's "
                        a(href = "https://www.jetbrains.com/teamcity/") { +"TeamCity" }
                        +" platform."
                    }
                    li {
                        +"Analyze post launch app analytics and monitoring crashes using "
                        a(href = "https://appcenter.ms/") { +"App Center" }
                    }
                    li { +"Interfacing with offshore team to handle customers' feedback and prioritise issues" }
                    li { +"Advise wider team architects on how to best support the mobile platform" }
                }
            }

            Job(
                company = "Future Friendly",
                image = "/images/mf-icon.jpg",
                link = "https://futurefriendly.team/",
                title = "Senior Software Developer",
                location = "Sydney",
                dates = "May 2016 - November 2018"
            ) {
                p(classes = "text-sm italic") {
                    +"Previously "
                    a(href = "https://mentallyfriendly.com/") { +"Mentally Friendly" }
                    +"."
                }
                p {
                    +"As the company's mobile dev, I was tasked with architecting, "
                    +"implementing and maintaining apps for our clients. I would often "
                    +"co-design and build proof of concepts web frontends and native apps "
                    +"to show case our ideas to clients."
                }

                p {
                    a(href = "https://russellinvestments.com/au") { +"Russell Investments" }
                    +" (iOS):"
                }
                ul {
                    li { +"Shipped bi-weekly updates to the App Store" }
                    li { +"Refactor the application away from a single Storyboard, to reduce merge conflicts" }
                    li {
                        +"Implement in memory local storage using "
                        a(href = "https://developer.apple.com/documentation/coredata") { +"Core Data" }
                    }
                    li {
                        +"Setup automated testing and local deployment using "
                        a(href = "https://fastlane.tools/") { +"fastlane" }
                    }
                    li { +"Interface with client to manage app maintenance and future roadmap" }
                }

                p {
                    a(href = "https://ahbeard.com/") { +"A.H. Beard" }
                    +" - "
                    a(href = "https://sleepsense.com.au/") { +"Sleepsense" }
                    +" (iOS & Android):"
                }
                ul {
                    li {
                        +"Shipped an iOS and an Android app that controlled a smart bed with three BT devices "
                        +"(bed frame, mattress, sleep tracker) using "
                        a(href = "https://github.com/ReactiveX/RxSwift") { +"RxSwift" }
                        +" and "
                        a(href = "https://github.com/Polidea/RxBluetoothKit") { +"RxBluetooth" }
                    }
                    li { +"Built an onboarding flow that would detect user's breathing rythim to pair them with their smart bed" }
                    li { +"Lead a team of two devs through know problems and pitfalls for the Android build." }
                }

                p {
                    a(href = "https://www.abc.net.au/triplej/") { +"Triple J" }
                    +" (iOS & Android):"
                }
                ul {
                    li { +"Built proof of concept app to showcase feature feasibility" }
                    li { +"Worked integrated with ABC mobile team to bootstrap the initial prototype for an internal release" }
                    li {
                        +"Integrated "
                        a(href = "https://developer.android.com/guide/topics/media/exoplayer") { +"ExoPlayer" }
                        +" to stream audio sourced from custom Rest APIs"
                    }
                }

                p {
                    +"My skills in web development were also put to use. I worked on several "
                    +"internal prototypes and websites that used "
                    a(href = "https://reactjs.org/") { +"React" }
                    +" and "
                    a(href = "https://vuejs.org/") { +"Vue.js" }
                    +". I also worked on migrating legacy web projects to "
                    a(href = "https://www.docker.com/") { +"Docker" }
                    +" so we could reduce our maintenance burden."
                }
            }

            Job(
                company = "Mullen Lowe Profero",
                image = "/images/mullenlowe-icon.png",
                link = "https://www.mullenloweprofero.com",
                title = "Mobile Software Developer",
                location = "Sydney",
                dates = "September 2015 - April 2016"
            ) {
                p {
                    +"Joined Profero to be part of the mobile team responsible for the "
                    a(href = "https://www.eastlandssc.com.au/") { +"Eastlands Shopping Center" }
                    +" app. I was involved in both iOS and Android builds, sadly the Android build never saw the playstore."
                }
                ul {
                    li {
                        +"Integrated "
                        a(href = "https://meridianapps.com/") { +"Meridian" }
                        +" iOS sdk for indoor navigation in the shopping center, that made use of bluetooth low energy beacons"
                    }
                    li {
                        +"Setup the local deployment of the iOS app using "
                        a(href = "https://fastlane.tools/") { +"fastlane" }
                    }
                    li {
                        +"Setup certificate management for the team using "
                        a(href = "https://docs.fastlane.tools/actions/match/") { +"fastlane match" }
                    }
                    li {
                        +"Integrated "
                        a(href = "https://www.jenkins.io/") { +"Jenkins CI" }
                        +" with our repository to run our tests against several simulators"
                    }
                }
            }

            Job(
                company = "Gleam SA",
                image = "/images/gleam-icon.jpg",
                link = "https://www.linkedin.com/company/gleam/",
                title = "Mobile Software Developer",
                location = "Lisbon, Portugal",
                dates = "August 2014 - July 2015"
            ) {
                p(classes = "text-sm italic") {
                    +"Gleam was in business from July 2013 until August 2016, when it was "
                    a(href = "https://observador.pt/2016/08/11/farfetch-abre-novo-escritorio-em-lisboa-e-cria-50-postos-de-trabalho/") {
                        +"adquired"
                    }
                    +" by "
                    a(href = "https://www.farfetch.com") { +"Farfetch" }
                    +"."
                }
                p {
                    +"Gleam was a mobile fashion app that brought a feed of curated fashion items to your fingertips. "
                    +"I joined the team looking to augment my product experience and was tasked with building version "
                    +"2.0 of the app:"
                }
                ul {
                    li { +"Architectured the app to better handle the existing load, support the new redesign, and allow for faster iteration" }
                    li { +"Workshop with the team new features and revenue streams" }
                    li { +"Advise the CEO on the capabilities of the mobile platform" }
                }
            }

            Job(
                company = "Bliss Applications",
                image = "/images/bliss-icon.jpg",
                link = "https://www.blissapplications.com/",
                title = "Mobile Software Developer",
                location = "Lisbon, Portugal",
                dates = "August 2012 - August 2014"
            ) {
                p {
                    +"I joined Bliss Applications while I was still finishing university. I was involved in various "
                    +"projects, focusing on bringing the best mobile experiences to the market and learning from my peers. "
                    +"In the end I built so many apps that I only remember a few and have no track record of them."
                }
                ul {
                    li { +"Applied my uni knowledge into developing an iOS skill set, later adding Android to my toolbelt" }
                    li { +"Self managed the projects I was responsible for, communicating frequently with other team members and management" }
                }
            }
        }
    }
}

fun FlowContent.Job(
    company: String,
    image: String,
    link: String,
    title: String?,
    location: String,
    dates: String,
    content: FlowContent.() -> Unit = {}
) {
    div(classes = "flex mt-6") {
        div(classes = "flex-none h-auto") {
            img(src = image, alt = company, classes = "border-r-2 border-b-2 border-orange-300 shadow") {
                width = "75"
                height = "75"
            }
        }
        div(classes = "flex flex-col ml-4 items-start") {
            a(href = link, classes = "hover:underline", target = "_blank") {
                h3 {
                    span(classes = "text-xl font-medium") { +company }
                    if (title != null) {
                        +" - "
                        span(classes = "font-light") { +title }
                    }
                }
            }
            p(classes = "text-sm opacity-50 mt-1") {
                +"$location · $dates"
            }
            div(classes = "mt-3 markdown-cv") { content() }
        }
    }
}
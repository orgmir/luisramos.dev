plugins {
    alias(libs.plugins.kotlin.jvm)
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation(libs.kotlinx.html.jvm)
    implementation(libs.commonmark)
    implementation(libs.snakeyaml)
}

application {
    mainClass.set("dev.luisramos.website.MainKt")
}

tasks.register<Copy>("copyAssets") {
    description = "Copy assets"
    from("src/main/resources/assets")
    into(layout.buildDirectory.dir("site"))
}

tasks.named("run") {
    dependsOn("copyAssets")
}

tasks.register<Exec>("serve") {
    description = "Serve build/site on http://localhost:8080"
    workingDir = projectDir
    commandLine("python3", "-m", "http.server", "--directory", "build/site", "8080")
}
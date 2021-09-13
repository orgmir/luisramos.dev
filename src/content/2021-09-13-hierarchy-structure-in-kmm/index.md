---
date: 2021-09-13
title: 'Hierarchy structure in KMM: Sharing platform code between iOS and MacOS'
slug: /hierarchy-structure-in-kmm
tags:
  - 'iOS'
  - 'mobile'
  - 'Kotlin'
  - 'swift'
  - 'Xcode'
  - 'KMM'
  - 'Kotlin Multiplatform Mobile'
---

Recently I came across the hierarchy structure feature, a Kotlin Mobile Multiplatform setting that enables you to share platform specific code between similar platforms. In this post I will explain what this useful feature does and help you set it up.

As an example, lets take one of my recent KMM side projects. It has 3 target platforms: Android, iOS and MacOS. In it, I have the need to generate a UUID as an identifier in the shared code. This is something not available in Kotlin standard library, but available in each target platform.

There are libraries that provide this functional already, but it is something very simple to implement by ourselves using the `expect`/`actual` construct:

```kotlin
// commonMain/generateUUID.kt
expect fun generateUUID(): String

// androidMain
actual fun generateUUID(): String = UUID.randomUUID().toString()

// iosMain
actual fun generateUUID(): String = NSUUID().UUIDString

// macOSMain
actual fun generateUUID(): String = NSUUID().UUIDString
```

The Android implementation uses Java `UUID` class. The code for iOS and MacOS uses Foundation `NSUUID` class. The way the project is setup right now, we end up with a duplicate `actual` declaration for the `NSUUID` call.

This is exactly the type of problem the hierarchy structure feature solves. You can declare an intermediate source set that holds the shared platform code which the target platforms will depend on.

The [documentation page](https://kotlinlang.org/docs/mpp-share-on-platforms.html#share-code-on-similar-platforms) explains how to enable support for this. You have to add the following option to `gradle.properties`:

```kotlin
kotlin.mpp.enableGranularSourceSetsMetadata=true
```

You can then use the target shortcuts the KMM plugin gives you or, in our case, you have to setup the targets manually. The shortcuts available don't actually cover our case of shared code between MacOS and iOS.

Here is the sources in `build.gradle.kts` for the shared module, named `nativeMain`. Note the `creating {}` call, instead of just `getting()`:

```kotlin
kotlin {
    android()

    ios()
    macosX64("macos")

    cocoapods {
        summary = "Shared Framework"
        homepage = "Shared"
    }

    sourceSets {
        val commonMain by getting
        val androidMain by getting
        val iosMain by getting
        val macosMain by getting
        val nativeMain by creating {
            dependsOn(commonMain)
            iosMain.dependsOn(this)
            macosMain.dependsOn(this)
        }
    }
}
```

With this setup, our project is now using an hierarchy structure for our MacOS and iOS targets, and we no longer need to duplicate our actual declarations:

```kotlin
// generateUUID.kt
expect fun generateUUID(): String

// androidMain
actual fun generateUUID(): String = UUID.randomUUID().toString()

// nativeMain
actual fun generateUUID(): String = NSUUID().UUIDString
```

Hope this information helps with your KMM setup, it really helped me clean up some code duplication in my project.

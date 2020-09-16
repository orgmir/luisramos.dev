---
draft: true
date: 2020-03-04
title: 'Mobile App Architecture for Ler App'
slug: /mobile-architecture-for-ler
tags:
  - Android
  - Mobile
---

I am in the process of opening the source for [Ler](ler-app), and a thought crossed my mind. I want to write about android development and use this app to draw examples from. So this post acts as the architecture explanation that I would give another developer joining the project.

This app uses a Model-View-ViewModel (MVVM) architecture, where the code base is split into three different layers: data, domain, and ui. There is a lot of info around MVVM, so I'll assume you know the drill already. The entire app is written in Kotlin. Her is the folder structure for the project:

```
src/main/java/app/luisramos/ler
  /di <-- Dependency injection magic
  /data
  /domain
  /ui
```

## Data layer

The data layer keeps all the code related to the, you guessed it, data used in the app. It contains the models for the feeds and articles. It also contains the database logic for storing and retrieving those models. 

This layer would also contain the network stack and any API definitions, if I had them. Since the network calls made in this app are mostly http get requests, I kept it simple and created an extension for the `URL` class:

```kotlin
fun URL.download(): InputStream? {
    return (openConnection() as? HttpURLConnection)?.run {
        try {
            readTimeout = 10000
            connectTimeout = 15000
            requestMethod = "GET"
            doInput = true
            connect()
            inputStream
        } catch (e: Exception) {
            Timber.e(e)
            null
        }
    }
}
```

Pretty simple, to use it you just call it like `feedUrl.download()` and you get a input stream with the data.

## Domain layer

The domain layer sits between the data layer and the ui layer and contains all the logic related to the actual business logic of the app.

## User interface layer

The UI layer contains all the android UI code, with its activities and fragments, as well as the view models for each. 

## Roundup

To glue all of this together and keep everything as testable as possible, I am using [koin](koin-library), a dependency injection library.

Putting all of your code under one module might not be a good option if you want to work in a big team. Breaking the code base into several modules can decrease build times in CI, since you can then leverage gradle build cache for modules that have no changes. Since this is a one man show and the app is small, several modules would mean more headaches for me.



[ler-app]: /ler-rss-aggregator-for-android
[koin-library]: https://insert-koin.io/


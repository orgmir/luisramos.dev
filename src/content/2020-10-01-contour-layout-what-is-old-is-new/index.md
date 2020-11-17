---
date: 2020-10-01
title: 'Contour Layout: say goodbye to your XML layouts'
slug: /contour-layout-bye-bye-xml
tags: ['Android', 'Mobile', 'xml', 'contour']
---

I came across [Contour](contour), an android UI library written entirely in Kotlin and that allows you to write your UI code also in Kotlin! As I read throught the README file, and looked at the sample app I instantly fell in love. The kind of love that just makes you rewrite your entire app to adopt this new library. Which is exactly what I did!

So I'm proud to announce that my [RSS aggregator app Ler](ler) has been re-written to completly drop XML layouts in favor of using ContourLayout views! Also, while I was at it, I went ahead and removed all fragments as well.

- Removed fragments in favor of screens
  - Copied implementation of Leak Canary nav
  - Life is easy in non fragment world
- Remove xml layout views in favor of contourlayout
  - Brings me back to Obj-C, pre-autolayout days, where every iPhone was 320x480, and thats all the device sizes you knew
  - From AS 4.2 forward, custom views have preview support, which makes developing with Countour a breeze!
  - Use isInEditMode to help out those previews
  - Writing aligment code never felt better. No complex UIs in this app, but I can see the potencial in it. Layout is just kotlin lamdas!

[contour]: https://github.com/cashapp/contour
[ler]: https://play.google.com/store/apps/details?id=app.luisramos.ler

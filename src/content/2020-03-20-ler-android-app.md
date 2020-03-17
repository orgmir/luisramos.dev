---
draft: true
date: 2020-03-20
title: 'Ler - Another RSS Aggregator for Android!'
slug: /ler-rss-aggregator-for-android
tags:
  - Android
  - Mobile
---

I have been working on my free time in a new RSS aggregator app called Ler. Its published on Google Play, you should check it out!

I know, I know, why another RSS reader/aggregator thingy? Well, let me tell you. I did this so I could spend my time better! I checked my phone "Digital Wellbeing" settings and turns out I was spending close to _four hours_ a day just browsing Twitter!!

So I had to cut down on that time. Turns out that a lot of the blogs I read, I find them on Twitter, so not wanting to lose that I decided that it was time well spend building an app to fix that issue.

Main features of this thing:

- You can add/remove feeds, manually via the app, or sharing a webpage with the app
- You can filter articles by read/unread and by a particular feed
- You can mark articles read/unread by swiping, or mark an entire feed at once
- Feeds get updated every hour (using the new nifty androidx.work library :gem:)

I am pretty proud of how it turned out, despite not being great at UI design, I kept it simple and it does the job!

I applied most of what I know about android architectures to build this, so my plan is to open-source it as an example of a simple architeture to use that can scale really well to more complex apps. Some things I wanna higlight in future blog posts: using uses cases, coroutines, and androidx.livedata libs.

Give it a spint, and tweet me what you think of it! (I have set an one hour daily limit, so I might only be able to answer you the following day :wink:)

---
date: 2021-04-26
title: 'A year of Ler'
slug: /a-year-of-ler
tags: ['android', 'mobile', 'ler']
---

A year ago, I published [Ler - a feed aggregator app](https://luisramos.dev/ler-rss-aggregator-for-android) for Android. After releasing it, my plan was to clean the code to open source it, and write posts about its architecture and how I code. Almost none of that happened but version 1.1 is out!

## Recap

Not much writing happened in regards to the app, but I kept working on it. Not often, but enough to rewrite a lot of the old implementation.

I replaced the usage of `Fragment` with a custom `Screen`s navigation implementation. Because, why not? Also, I ditched the XML layouts in favor of using regular Android views. Big props to [Contour](https://github.com/cashapp/contour), a layout view for Android by CashApp, it really helped with that.

I use this app as a test bed for new frameworks and libraries. These changes didn't add anything to the feature set, but they felt really good! And I learned how to build an app without relying on fragments.

One thing I am still learning is how to cut scope so I can finish something. I had to give up on the idea of "cleaning up" the code base. By that I mean adding missing tests and restructure the files to make more sense to some other dev. I realised that I would not be able to muster the energy to do it, so the project is now [open source](https://github.com/Orgmir/ler-android) for everyone to check out.

## Version 1.1 is out!

After a year, the new release of Ler comes with a new feature and a couple of fixes. You can [download it here](https://play.google.com/store/apps/details?id=app.luisramos.ler), or check for an update if you are already a user.

Changes since 1.0.2:

- New posts notification! You will now be notified when there are new posts for you to read
- New settings screen, where you can configure the new posts notification time (or disable it)
- You can now disable the subscriptions background refresh
- Fixed update URL for a subscription not getting parsed correctly
- Fixed post published date parsing, now uses the device locale (and it actually works)

## Ding, there are new posts!

I have the notification set so it triggers about the time I wake up, that way I don't miss any new posts. It really helps me stay on top of things, and I can read posts while eating breakfast ;) You can set this to trigger at any time of day.

The rate subscriptions refresh data changed as well, it was overly eager before and now I have set it to refresh every 12 hours. You can disable the refresh in the settings.

## Happy reading!

I hope you like the new notification, it was surprisingly complicated to build. I almost gave up on it. A year ago I would have parked the idea before completion. But something I learned this year is how to keep at it, instead of waiting for the right motivation to come around.

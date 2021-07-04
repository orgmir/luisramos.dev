---
title: Fastlane Supply uploads everything!
description: Quick tip on using supply to deploy android apps
date: 2017-09-05
slug: /fastlane-supply-uploads-everything
tags:
  - android
  - mobile
---

Ever since I found out about [`fastlane`][fastlane], I've been using it to deploy Android and iOS apps. It's amazing how streamlined things can get: it saves you a bunch of time when deploying a release; it supports integrations with your favorite distribution platforms (yay Crashlytics); and you can easily copy the setup from one app to the other! Couldn't be happier with it.

Here's a tip for the Android devs out there using [`fastlane`][fastlane], add this to your `before_all` step:

```ruby
before *all do
  sh "rm -f ../app/build/outputs/apk/*/\_/\*.apk"
end
```

I've found that when deploying Android builds using `supply`, the tool tries to upload whatever it can find in your `build/outputs` folder. And often the error you get are unrelated like:

```objc
Google Api Error: apkUpgradeVersionConflict:
APK specifies a version code that has already been used.
```

This is obviously not true if you check your google play console and your build.gradle file. Looking at the output the (at the `GRADLE_ALL_APK_OUTPUT_PATHS` variable), it seems supply is trying to upload every apk he finds, including debugging version and other flavors. Adding that line will save you some time and stop you from screaming "Why don't the versions match??"

[fastlane]: https://fastlane.tools/

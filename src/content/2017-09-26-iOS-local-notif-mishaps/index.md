---
title: iOS local notifications ninja bug!
description: Take care with what you set in userInfo dictionary! It might haunt you back!
date: 2017-09-26
slug: /ios-local-notification-ninja-bug
tags:
  - iOS
  - mobile
---

Recently I was working in a project that require me to show a local notification. And for the love of XCode, the app would not show an alert! I was at a loss!

Beggining with iOS 10, the iOS notification framework was revamped to unify both remote and local notifications. This threw me into a loop while trying to figure out the problem. The only thing I had to go by was an error message that poped up when adding the notification to UNUserNotificationCenter:

```objc
Adding notification request failed with error: Error Domain=NSCocoaErrorDomain Code=4097 "connection to service named com.apple.usernotifications.usernotificationservice" UserInfo={NSDebugDescription=connection to service named com.apple.usernotifications.usernotificationservice}
```

What a cryptic message, thanks Apple Dev team! I had a custom action setup, so the user could open a url with more info. I was adding this URL to the `userInfo` of the notification and here was where the bug lived! The issue was that I was adding the URL object, instead of an absolute string of the url. As soon as I changed this, everything worked.

Of course, a [stackoverflow answer][answer] helped me figure this out!

[answer]: https://stackoverflow.com/questions/41360531/unmutablenotificationcontent-with-custom-object-in-userinfo

---
title: iOS Project Structure
date: 2016-01-11
description: Projecture structure for a iOS project
slug: /ios-project-structure
tags:
  - iOS
  - mobile
---

To better organized my code, I have been changing my project structure along the years. I think I've finally set with one, so time to record it for the future!

There are two basic guidelines when creating a project structure. First, keep it simple. Second, use something that makes sense to you.

If you google a bit for this topic you may find this quora [answer](https://www.quora.com/How-should-I-structure-my-iOS-app) or these [guidelines](https://github.com/futurice/ios-good-practices#project-structure). They both suggest something like this:

- View Controllers
- Views
- View Models
- UI (aka storyboards)

If you have small projects, this structure will work fine. But when you start adding more files to it it becomes confusing. I rather organize files in a functional way, separating them by areas and layers of the app. So it ends up something more like this:

- Interface
  - Base
  - Onboarding
  - Feed
  - User
  - Settings
- Networking
- Local Storage
- Classes
  - Categories/Extensions
  - Classes that don't fit anywhere else
- Resources

Inside those folders I usually follow the first setup, separating files by Views, ViewControllers, etc. This way you have almost every file related to an area of the app in one folder. All my images are stored in XCAssets. Fonts and other raw files are in Resources (usually with a dedicated folder for each).

If you have an even awesome setup or if you just want to share yours, feel free to [send me a tweet](https://twitter.com/luisramos1337).

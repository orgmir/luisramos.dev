---
draft: true
date: 2020-03-31
title: 'My Simple Android Architecture'
slug: /simple-android-architecture
tags:
  - Android
  - Mobile
---

I always try to follow a simple pattern when making desicions around architecturing the mobile apps that I build. When faced with a problem and trying to come up with a solution I always try to build something that is:

- Easy to explain
- Easy to understand
- Easy to test

I want to give some examples pulled from [Ler](/ler-rss-aggregator-for-android) (the app that I built and that you should check out),

### Easy to explain

When building something easy to explain, I am mainly thinking of how hard will it be to onboard someone onto it. I find most of the common architectures out there to be easy to explain the concepts, but getting down to the actual technical details becomes increasingly hard explain clearly.

For example, in [Ler](/ler-rss-aggregator-for-android) (the app that I built and that you should check out) I used UseCases to abstract away business logic from the ViewModels



When starting a new application, picking the right way to structure your code will go a long way to preserve your sanity. In this post I would like to detail how do I structure my projects, how do I pick a proper architecture, and what problems we are trying to solve when making these decisions.

Here is what I want in an app architecture:

- Easy to explain and understand
- Easy to test
- Easy to build UI

Keeping these concepts in mind when building the foundations of a new project usually means maintaining it in the long run will be a breeze. Future me is very forgetfull, this way both future me and future devs joining the team can jump in without issue.

 I always have in mind not only future me (I forget things), but also future developers joining the team.



When structuring my code, I try to keep in mind the number of people that are going to work on it in the future, as well as how flexible



In this post I want to talk about the architecture I used in [Ler](https://play.google.com/store/apps/details?id=app.luisramos.ler), an RSS aggregator app that I build. It mostly follows the Model-View-ViewModel architecture, but I want to highlight a couple of decisions around it that I think are cool.

Most of the android apps I build lately follow this pattern, or draw a lot of inspiration from it. Basically, it is Model-View-ViewModel architecture (MVVM), with some Jetpack libraries stuck to it!

Let me take you through what led me here, and the lessons I learned to get here.

What do I want out of an architecture???

Reference three things and BE DONE WITH IT!

### MVVM and androidx.lifecycle

[Google Jetpack]() suite of libraries and guidance really helped setting this architecture up. There are tons that you could talk about around the libraries made available, let me start with [`androidx.lifecycle`](https://developer.android.com/jetpack/androidx/releases/lifecycle). This library gives us the `ViewModel` class, as an "official" way to setup the interaction between our views and our models. This class fits pretty snugly into the MVVM architecture.

// give of a view model, and how it is created in Ler

I feel the greatest problem this class solves is memory leaks. Before, a developer would need to make sure the business logic responsible for a view would clean itself up correctly when said view went away. Now, since the view models are bound to the specific `Activity` or `Fragment` lifecycle, you don't need to worry about it!

This magic only works if you pair the communication between view model and view with an Observable pattern. And `androidx.lifecycle` also has you covered on that end, with the `LiveData` and `MutableLiveData` classes. These are very simple implementation of the observable pattern, with some insurances added specific to Android.

// example of a livedata object being used

Since the observers of said `LiveData` object are always bound to a lifecycle, we are garanteed proper cleanup when that lifecycle is destroyed.

### The Case for Use Cases

I am going to do a more detailed post on this, but the business end of the deal is held in the use cases section!
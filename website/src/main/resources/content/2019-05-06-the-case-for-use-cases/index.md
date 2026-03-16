---
draft: true
date: 2019-05-06
title: 'The Case for Use Cases: How to Architecture an Android App using Kotlin Coroutines'
slug: /the-case-for-use-cases
tags:
  - Android
  - Mobile
---

<!--
Iɴᴛʀᴏᴅᴜᴄᴛɪᴏɴ

An introduction is a 1-2 paragraph overview of what the blog post talks about. It should describe the technologies related to the blog post, but not explain them. Write this last.
-->

# Intro

What technologies are around this, why do I want to talk about use cases

<!--
Mᴀɪɴ Bᴏᴅʏ

There are a lot of different ways to structure the main body of a blog post, but a straightforward approach is to have a paragraph or two dedicated to the following (in order):

- Problem statement (a feature request, a bug report, an outage).
- Context (anything the reader needs to know beyond the problem statement).
- Initial Attempt.
  - Describe your initial approach and why you thought it would work.
  - Then, explain why it didn't suit your needs.
- Subsequent Attempt.
  - Describe what you learned from the initial attempt and how it helped lead you to what did finally work.
  - Explain what surprised you about the solution you ended up using.
  - Describe your thought process: how did you look for a solution to the problem? Who helped you? What was something that initially confused you and how did you overcome that confusion?
- Evaluate the solution in terms of how well it applies to the problem statement.

Spend most of your time writing this section.

If starting is difficult, just write out some links to PRs, issues, Slack messages, or libraries. Write a rough problem statement, then send a work-in-progress pull request so others can help get you unstuck.

-->

## Problem statement

Starting a greenfield project is always an opportunity to apply new learnings. I have recently been reading up on the new [Android Jetpack](https://developer.android.com/jetpack/) libraries and the possibilities they bring to an android app developer are awesome.

I have been trying to zoom in on an architecture that fits my needs while still following close with Google recommendations. So, grab a seat and enjoy the ride while I tell you about my current architecture pick: MVVM + Use Cases + Coroutines!

## A bit of context

Before we dive into the details of it, let me start with an overview of the several components of this architecture. You probably have read a bit about all the different kinds of UI architectures by the year of our lord 2019, so suffice to say that I rather like Model-View-ViewModel, mostly because of Google's [ViewModel](https://developer.android.com/topic/libraries/architecture/viewmodel).

The glue to all the code will be Kotlin's [Coroutines](https://kotlinlang.org/docs/reference/coroutines-overview.html). They are the async programming approach that Kotlin brings to the table and enable a developer to write readable and easy to test async code. If you are not using them already (or Kotlin for that mather) I highly recommend it.

Finally, the last piece of this puzzle are the Use Cases. They will act as one piece of our model layer in our MVVM combo, and are the bits that hold the business logic for our app.

## MVVM + Coroutines = Magic

Let's imagine we are building an app that has a login screen. If you think about the data flow when the user enters some details and pressed the login button, it goes something like this:

1. User enters some text in the email/password fields and presses the login button, the activity/fragments sends that to the view model
2. View model calls the model layer to perform the login with email/password, and waits
3. Model layer calls back the view model with the response from the login request

Let's look at snippets of a possible implementation, so I can talk about how cool coroutines are. So your view code might look something like this:

```kotlin
loginButton.setOnClickListener {
	val email = emailTextView.text
	val password = passwordTextView.text
	launch {
		viewModel.login(email, password)
	}
}
```

We create a listener for the login button click and call the view model. Now notice the `launch` method. It spins a coroutine tied to the activity scope that will do work on the main thread _without blocking it!_ The launch method is an extension on `CoroutineScope`, so for that to work we need to implement that interface:

```kotlin
class BaseActivity: AppCompatActivity(), CoroutineScope {
private lateinit var job: Job
override val coroutineContext: CoroutineContext
get() = Dispatchers.Main + job

override fun onCreate(savedInstanceState: Bundle?) {
super.onCreate(savedInstanceState)
job = Job()
}

override fun onDestroy() {
super.onDestroy()
job.cancel()
}
}
```

That is just a possible example. The important part is that by calling our view model code inside a coroutine that is tied to the activity lifecycle, we are free to do all the work we need without worrying about leaking anything. As soon as the activity is destroyed, the coroutine scope is cancelled and any pending requests will be dropped.

But the best is still to come, let us look at a possible implementation of the view model `login()` function:

```kotlin
suspend fun login(email: String?, password: String?) {
// ... do some validation, show/hide progress
val result = userRepo.login(email, password)
if (result is Result.Error) {
\_onError.postValue(eventOf(true)))
} else {
\_onSuccess.postValue(eventOf(true))
}
}
```

Notice the `suspend` identifier for this function, enabling this function to be suspended at any time. This is really what brings coroutines home for me. Even if `userRepo.login()` does requests on a background thread, execution will not continue until a result is returned (or the coroutine is cancelled). This means the code is very readable, a developer coming in to the project will have no trouble understanding what this method is trying to do.

To handle the login request, lets create a model for it in the form of a `UserRepository`. This is going to be responsible for making an authentication request, saving if the user is logged in or not, and returning a success or error result.

For completeness, lets take a look at possible implementation for `UserRepository`:

```kotlin
class UserRepository(
val userRemoteDatasource: UserRemoteDatasource
) {
private var \_isUserLoggedIn = false
val isUserLoggedIn: Boolean

suspend fun login(email: String, password: String) =
withContext(Dispatchers.IO) {
val result = userRemoteDatasource.login(email, password)
if (result is Result.Success) {
\_isUserLoggedIn = true
}
result
}
}
```

As you can see we call the remote datasource and wait for a result. If the result is successful, we save that the user is now logged in, and proceed. Otherwise, we just return the result. The only magical bit here is `withContext()`, that switches our context to a background thread, provided by `Dispatchers.IO`. This means our network request won't be executed on the main thread, but our main coroutine will wait for this work to be done before continuing execution. Magical stuff.

## Requirements keep changing!

What if our initial simple login logic now becomes a tad more complex? The client we are working with in our imaginary app just made two new requests: We need check if users have a locked account, not logging them in if they do; and we need to show a progress message while the login is ongoing.

What ends up happening is that my repositories end up with a lot more responsibilities and become inflexible. For example, lets consider this business rule for our app: after login in the user, we need to make another request to the server to check if there are any messages to show. An outage message might actually block the user from progressing, so we need to check this before we show the next screen. Where should we put this logic?

In my initial attempt, the `UserRepository` would handle all of this logic:

```kotlin
class DefaultUserRepository: UserRepository {
fun loginAndGetMessages(email: String, password: String)
: Result<Array<Message>> {
val loginResult = userRepo.login(email, password)
if (loginResult.isError()) {
return loginResult
}
val messagesResult = messageRepo.getMessages()
if (messagesResult.isError()) {
return messagesResult
}
// Success, so save login state!
isUserLoggedIn = true
val messages = messagesResult.get()
return Result.Success(messages)
}
}
```

But this means that the `UserRepository` now depends on `MessageRepository` so we can perform the right request. This is a big code smell for me, since this `login()` method now does a lot more than just login in the user. If another developer picks up this app, and he starts working on building another login screen using the same `UserRepository`, he will need to be made aware that this `login()` method is a bit fat, or he will just loose time to figure that out alone.

Let's try moving this logic to the view model:

```kotlin
class LoginViewModel(
private val userRepo: UserRepository,
private val messageRepo: MessageRepository
): ViewMode() {

    suspend fun onSubmit(email: String, password: String) {
    	// ... validate input
    	val loginResult = userRepo.login(email, password)
    	if (loginResult.isError()) {
    		onError.postValue(true)
    		return
    	}
    	val messagesResult = messageRepo.getMessages()
    	if (messagesResult.isError()) {
    		onError.postValue(true)
    		return
    	}
    	val messages = messagesResult.get()
    	messageListLiveData.postValue(messages)
    }

}
```

The business logic is very similar, but the code is still smelly! Now all of our work splitting the app into models, view models and views is weakened by having business logic on this view model.

**Notes**
Switch order of things, view model first, user repo second, then present use cases. Take the same code and keep changing it each step until the use case. Structure the intro for it better
Give full code example of all the implementations so people get a good picture of what I'm thinking.

Use cases for everything!

<!--
Cᴏɴᴄʟᴜsɪᴏɴ

The conclusion of your post should mirror the introduction: an overview of the post that describes (but does not explain) the technologies involved. Repetition helps emphasize your points, so make sure to re-state any high-level takeaways from the main body of your post. Maybe a list makes sense, or a paragraph.

The conclusion should also include links to pull requests or issues related to the post, as well as provide any thanks you'd like to extend to your colleagues or community members.
-->

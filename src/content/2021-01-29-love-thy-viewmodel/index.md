---
draft: true
date: 2021-01-29
title: 'Love thy ViewModel'
slug: /love-thy-viewmodel
tags: ['Android', 'Mobile']
---

Long are the days when android developers had to spend lots of time dealing with activity lifecycles when building their apps. Well, maybe not so long ago! Now there are a lot more tools to make our jobs easier, like the google provided [androidx.lifecycle](https://developer.android.com/reference/androidx/lifecycle/package-summary) package.

Let's talk about ViewModels, why they are a good tool, and how to use it properly.

What makes them great is that you can take view state that used to be held by an activity (or fragment) and give it to this ViewModel. This state will now survive configuration changes without being leaked.

Add LiveData to the mix and you strike gold:

```kotlin
class ProfileViewModel: ViewModel() {

	val username = MutableLiveData("John Silverhand")

	val cyberhacks = MutableLiveData<List<CyberHack>>()
}

class ProfileActivity: Activity() {

	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		setContentView(R.layout.profile_activity_layout);

 		val viewModel = ViewModelProvider(this).get(UserModel::class.java)
 		viewModel.username.observe(this) {
 			textView.text = it
 		}
 		// ...
	}
}
```

The ViewModel is provided to us bound to the activity lifecycle. The LiveData objects will hold the lastest data set. The activity will observe both of these LiveData objects when created, always getting the latest data available. Life is good!

With this, we can establish a one way flow of data, from the ViewModel to the activity and its views. This makes unit testing the ViewModel very easy.

## Mistakes were made

Now, here is an example of something you should **not** do with ViewModels:

```kotlin
class ProfileViewModel: ViewModel() {

	lateinit var recyclerView: RecyclerView

	fun setView(view: View) {
		view.textView = "John Silverhand"
		recyclerView = view.recyclerView
	}

	fun loadData() {
		Repository.loadCyberHacks { hacks ->
			recyclerView.adapter.items = hacks
		}
	}
}
```

In this case, the view and its implementation details are inside the ViewModel. Surviving configuration changes now works against us, since holding a reference to a view will leak it after the activity gets rid of it.

This will also complicate testing. The dependency on the android framework means we will need to write instrumentation tests, which are slow, harder to write, and not run as often as unit tests.

## ViewModelProvider is King

The ViewModel class is very simple in its implementation. Take a peek [here](https://cs.android.com/androidx/platform/frameworks/support/+/androidx-main:lifecycle/lifecycle-viewmodel/src/main/java/androidx/lifecycle/ViewModel.java;l=107?q=ViewModel&sq=)! It almost has more comments than actual code.

Just because of it's simplicity, we should not be tricked into using it everywhere. The usage of ViewModels in an application implies the use of ViewModelProvider to create them.

```kotlin
class ProfileViewModel: ViewModel() {
	fun reloadData() {
		Repository.loadCyberHacks { hacks ->
			hacks.map { CyberHackViewModel(hack) }
		}
	}
}

class CyberHackViewModel(hack: CyberHack): ViewModel() {
	val title = "${hack.name} - ${$hack.expirationDate}"
}
```

In the previous snippet, there is no benefit in using a ViewModel for this mapping. A data class fits this situation much better.

Whenever you see yourself creating a ViewModel using its constructor instead of a ViewModelProvider, stop! The only exception to this is, of cource, writing unit tests.

## Read the manual before driving

Always a good idea to read the documentation for a class before you start using it in your code. Pulled from the ViewModel javadoc:

> Thee purpose of the ViewModel is to acquire and keep the information that is necessary for an Activity or a Fragment. The Activity or the Fragment should be able to observe changes in the ViewModel. ViewModels usually expose this information via `LiveData` or Android Data Binding. You can also use any observability construct from you favorite framework.

ViewModel's only responsibility is to manage the data for the UI. It **should never** access your view hierarchy or hold a reference back to the Activity or the Fragment.

<hr/>

Hope this post helped! I leave you with two classes to help writing unit tests for ViewModels if you use LiveData objects. The `InstantTaskExecutorRule` will override the ArchTaskExecutor used by the LiveData to dispatch notifications:

```kotlin
class InstantTaskExecutorRule : TestWatcher() {
    override fun starting(description: Description?) {
        super.starting(description)
        ArchTaskExecutor.getInstance().setDelegate(object : TaskExecutor() {
            override fun executeOnDiskIO(runnable: Runnable) {
                runnable.run()
            }

            override fun postToMainThread(runnable: Runnable) {
                runnable.run()
            }

            override fun isMainThread(): Boolean = true
        })
    }

    override fun finished(description: Description?) {
        super.finished(description)
        ArchTaskExecutor.getInstance().setDelegate(null)
    }
}
```

If you use coroutines with `viewModelScope`, this `CoroutineDispatcherRule` will also be useful. It sets up the main coroutine dispatcher to be a `TestCoroutineDispatcher`:

```kotlin
class CoroutineDispatcherRule(
    private val testDispatcher: TestCoroutineDispatcher = TestCoroutineDispatcher()
) : TestWatcher() {
    override fun starting(description: Description?) {
        super.starting(description)
        Dispatchers.setMain(testDispatcher)
    }

    override fun finished(description: Description?) {
        super.finished(description)
        Dispatchers.resetMain()
        testDispatcher.cleanupTestCoroutines()
    }
}
```

---
date: 2021-03-19
title: 'Testing your Android ViewModel - with examples'
slug: /testing-your-android-viewmodel
tags: ['Android', 'Mobile']
---

An android application can get really complicated, so in this post I will give some examples on how I write and test `ViewModels`.

These days my usual tech stack makes use of `androidx.lifecycle` classes with Kotlin extensions and coroutines. Setting up unit tests for all this just takes a couple of JUnit rules!

Let's start by imagining a fantasy app where you can buy cyber implants.

## Start small

This is a view model for a listings screen that shows all available implants:

```kotlin
interface Api {
	fun getCyberImplants(block:()->List<CyberImplant>)
}

class CyberImplantListViewModel(val api: Api): ViewModel() {

	val data = MutableLiveData<List<CyberImplant>>()

	fun loadData() {
		api.getCyberImplants { list ->
			data.value = list
		}
	}
}
```

Every time `loadData()` is called we load some data from a backend and we update the live data object in the callback. Here is the unit test for it:

```kotlin
class CyberImplantListViewModelTests {

	@get:Rule
	val instantTaskRule = InstantTaskExecutorRule()

	val api = FakeApi() // FakeApi with canned responses
	val viewModel = CyberImplantListViewModel(api)

	@Test
	fun `when loadData() is called, should load data`() {
		viewModel.loadData()
		assertThat(viewModel.data.value, `is`(api.mockImplantsList))
	}
}
```

We use `InstantTaskExecutorRule` so we can make sure our `LiveData` objects don't call the android main thread. Our view model logic is simple, the test mirrors that: we just need to verify if the live data value property matches what we expect.

## Start small + Coroutines

Let me refactor `CyberImplantListViewModel`, to make use of the lovely Kotlin coroutines (with `androidx.lifecycle:lifecycle-viewmodel-ktx` extensions):

```kotlin
// Coroutines ❤️
interface Api {
	suspend fun getCyberImplants(): List<CyberImplant>
}

class CyberImplantListViewModel(val api: Api): ViewModel() {

	val data = MutableLiveData<List<CyberImplant>>()

	fun loadData() {
		viewModelScope.launch {
			data.value = api.getCyberImplants()
		}
	}
}
```

The tests will remain the same, except you now need to add a rule to change the coroutines dispatcher to `TestDispatcher`. You can use [this rule](https://luisramos.dev/love-thy-viewmodel)! We don't control the `ViewModel.viewModelScope` extension, so the rule is the only way to make sure we can set up the correct dispatcher to run the coroutines.

In this case, the `Api` call is responsible for changing the context to the correct one for a background task.

<div class="blockquote info">
Always make it so that every suspend method is safe to call on the main thread, since it simplifies the code a lot.
</div>

```kotlin
class CyberImplantListViewModelTests {

	@get:Rule
	val instantTaskRule = InstantTaskExecutorRule()

	// Make sure viewModelScope uses a test dispatcher
	@get:Rule
	val coroutinesDispatcherRule = CoroutineDispatcherRule()

	val api = FakeApi()
	val viewModel = CyberImplantListViewModel(api)

	@Test
	fun `when loadData() is called, should load data`() = runBlockingTest {
		viewModel.loadData()
		assertThat(data.value, `is`(api.mockImplantsList))
	}
}
```

We have a `ViewModel`, using `LiveData` and Kotlin coroutines, with unit tests to cover all of it. Nice job.

## Add error handling!

Turns out this implementation only covers the happy path, so let's keep going and add some error handling. I really like Kotlin sealed classes to help us out with this.

```kotlin
// Wrap our API results so we can avoid using try/catch in the ViewModel
sealed class Result<out T> {
	data class Error<T>(val message: String): Result<T>()
	data class Success<T>(val data: T): Result<T>()
}

interface Api {
	suspend fun getCyberImplants(): Result<List<CyberImplant>>
}

class CyberImplantListViewModel(val api: Api): ViewModel() {

	val uiState = MutableLiveData<UiState>(Loading)

	fun loadData() {
		viewModelScope.launch {
			uiState.value = Loading
			val result = api.getCyberImplants()
			uiState.value = when(result) {
				is Result.Error -> Error(result.message)
				is Result.Success -> Success(result.data)
			}
		}
	}

	// Magical 🧙‍♀️
	sealed class UiState {
		object Loading: UiState
		data class Error(val message: String): UiState
		data class Success(val implants:List<CyberImplant>): UiState
	}
}
```

Now our logic not only handles any errors the API throws, but can also show a progress bar to the user while the loading operation happens.

Lets write some tests:

```kotlin
class CyberImplantListViewModelTests {

	@get:Rule
	val instantTaskRule = InstantTaskExecutorRule()

	@get:Rule
	val coroutinesDispatcherRule = CoroutineDispatcherRule()

	val api = FakeApi()
	val viewModel = CyberImplantListViewModel(api)

	@Test
	fun `given api success, when loadData() is called, should show implants`() = runBlockingTest {
		api.prepareSuccess()

		val expected = listOf(
			UiState.Loading,
			UiState.Success(api.mockImplantsList)
		)
		assertThat(uiStates, `is`(expected))
	}

	@Test
	fun `given api error, when loadData() is called, should show error`() = runBlockingTest {
		api.prepareError()

		val expected = listOf(
			UiState.Loading,
			UiState.Error("test error")
		)
		assertThat(uiStates, `is`(expected))
	}
}
```

I really like how, with data classes, you can declared an expected array of states and the assertThat() will give you a really good error message if the test fails. Really cleans up the test code.

## Keep it flexible

To keep our UI flexible, we shouldn't be relying on the models coming from the Api. By adding models just for UI and mapping functions, if the underlying data changes, for example, a `name` property becomes two `firstName` and `lastName` properties, we just need to update our mapping of the data.

```kotlin
class CyberImplantListViewModel(val api: Api): ViewModel() {

	val uiState = MutableLiveData<UiState>(Loading)

	fun loadData() {
		viewModelScope.launch {
			uiState.value = Loading
			val result = api.getCyberImplants()
			uiState.value = when(result) {
				is Result.Error -> Error(result.message)
				is Result.Success -> Success(result.data.toUiModel())
			}
		}
	}

	sealed class UiState {
		object Loading: UiState
		data class Error(val message: String): UiState
		data class Success(val implants:List<ImplantUiModel>): UiState
	}
}

data class ImplantUiModel(
	val id: Int,
	val title: String,
	val value: String
)

fun CyberImplant.toUiModel() = ImplantUiModel(
	id = id,
	title = title,
	value = formattedValue
)

fun List<CyberImplant>.toUiModel() = map { it.toUiModel() }
```

Looks exactly the same as before, but we future proof our `ViewModel` some.

Now, we just need to update the tests for the mapping logic:

```kotlin
class CyberImplantListViewModelTests {

	@get:Rule
	val instantTaskRule = InstantTaskExecutorRule()

	@get:Rule
	val coroutinesDispatcherRule = CoroutineDispatcherRule()

	val api = FakeApi()
	val viewModel = CyberImplantListViewModel(api)

	@Test
	fun `given api success, when loadData() is called, should show implants`() = runBlockingTest {
		api.prepareSuccess()

		val expected = listOf(
			UiState.Loading,
			UiState.Success(api.mockImplantsList.toUiModel()) // <== UPDATE
		)
		assertThat(uiStates, `is`(expected))
	}

	@Test
	fun `given api error, when loadData() is called, should show error`() = runBlockingTest {
		api.prepareError()

		val expected = listOf(
			UiState.Loading,
			UiState.Error("test error")
		)
		assertThat(uiStates, `is`(expected))
	}
}
```

Here is are the tests for the mapping function:

```kotlin
class ImplantUiModelTests {

	@Test
	fun `api model to ui model should map correctly`() {
		val apiModel = StubCyberImplant()
		val expected = ImplantUiModel(
			id = "test_id",
			title = "test_title",
			value = "formatted_value"
		)
		assertThat(apiModel.toUiModel(), `is`(expected))
	}
}
```

## Make it wait

What if we only want to show the loading state if the API request takes longer than a certain amount of time? Let's say 200ms. With Kotlin coroutines, this isn't hard to implement and not hard at all to test!

```kotlin
fun loadData() {
	viewModelScope.launch {
		val loadingJob = launch {
			delay(LOADING_SHOW_DELAY) // delay for 200ms
			uiState.value = Loading
		}

		val result = api.getCyberImplants()
		uiState.value = when(result) {
			is Result.Error -> Error(result.message)
			is Result.Success -> Success(result.data.toUiModel())
		}
		loadingJob.cancel()
	}
}
```

When `loadData()` is called, instead of setting the state to Loading immediately, we launch a coroutine that will wait for the required amount of time and only after the Loading state will be updated. We save the `Job` the loading coroutine returns, and cancel it after the api request is done.

If the API takes less than 200ms to return, `loadingJob.cancel()` will be called and cancel that coroutine execution. If it takes longer, then the `delay()` suspension expires, and the state is set to loading. Pretty cool!

Now what about the tests?

```kotlin
class FakeApi(val requestDelay: Int): Api {
	var mockImplantsList: List<CyberImplant> = ...
	override suspend fun getCyberImplants(): Result<List<CyberImplant>> {
		delay(requestDelay)
		return mockImplantsList
	}

)

class CyberImplantListViewModelTests {

	// Let's say that the default delay is half a second
	// so the existing tests still pass
	val api = FakeApi(requestDelay = 500)
	val viewModel = CyberImplantListViewModel(api)

	// ...

	@Test
	fun `given a very fast api, when loadData() is called, should not post loading state`()  = runBlockingTest {
		api.requestDelay = 0

		viewModel.loadData()

		val expected = listOf(
			UiState.Success(api.mockImplantsList.toUiModel()) // only sucess state
		)
		assertThat(uiStates, `is`(expected))
	}
}
```

The `runBlockingTest` is really doing all the heavy work. We are unit testing time passing but the tests run instantly! From the [documentation](https://kotlin.github.io/kotlinx.coroutines/kotlinx-coroutines-test/kotlinx.coroutines.test/run-blocking-test.html) for `runBlockingTest()`:

> This is similar to runBlocking but it will immediately progress past delays and into launch and async blocks. You can use this to write tests that execute in the presence of calls to delay without causing your test to take extra time.

You could also use `delay()` to debounce user clicks, or make sure you refresh data after a certain amount of time. And all of that can be tested instantly.

## TAP TAP TAP

To wrap up this list, let's implement a way for our users to select a implant and navigate to a detail screen. I tend to keep most of the logic in the ViewModel (easy to test), so lets have a `Navigation` interface with all the navigation calls.

```kotlin
class CyberImplantListViewModel(
	val api: Api,
	val navigation: Navigation
): ViewModel() {

	val uiState = MutableLiveData<UiState>(Loading)

	// ...

	fun onItemTapped(position: Int) {
		val state = uiState.value as? UiState.Success	?: return
		// find the correct item
		val item = state.data.getOrNull(position)
		item?.let { navigation.goToImplantDetail(it.id) }
	}
}
```

Our current adapter implementation calls `viewModel.onItemTapped()` when an item is clicked, passing the clicked position as an argument. Our tests look like this:

```kotlin
class FakeNavigation() {
	var didCallGoToImplantDetail = false
	var goToImplantDetailId = -1
	fun goToImplantDetail(id: Int) {
			didCallGoToImplantDetail = true
			goToImplantDetailId = id
	}
}

class CyberImplantListViewModelTests {

	val api = FakeApi(requestDelay = 500)
	val navigation = FakeNavigation()
	val viewModel = CyberImplantListViewModel(api, navigation)

	// ...

	@Test
	fun `when user taps an item, it should navigate to detail`() = runBlockingTest {
		// tapping before the data is loaded shouldn't do anything
		viewModel.onItemTapped(0)
		assertThat(navigation.didCallGoToImplantDetail, `is`(false))

		// load some data
		viewModel.loadData()

		viewModel.onItemTapped(0)
		assertThat(navigation.didCallGoToImplantDetail, `is`(true))
		val expectedId = api.mockImplantsList.first().id
		assertThat(navigation.goToImplantDetailId, `is`(expectedId))
	}
}
```

## Wrapping up

We started with a pretty basic view model for showing a list of cybernetic implants to the user, and the respective test coverage. We then added coroutines, some logic to handle a loading state, and possible API errors. Then we wrapped it up with a "navigate to detail" example.

Hope these examples where useful to you in some way. I really enjoy writing this, so if you want to see more examples or just want to chat about android, reach out!

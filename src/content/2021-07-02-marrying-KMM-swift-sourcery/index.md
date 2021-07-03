---
date: 2021-07-02
title: 'Marrying KMM and Swift with Sourcery'
slug: /marrying-kmm-and-swift-with-sourcery
tags: ['ios', 'mobile', 'kotlin', 'swift', 'xcode', 'kmm']
---

My bet is that Kotlin Multiplatform Mobile is here to stay. It offers a great way to build mobile apps natively that share code, without compromising the best each platform has to offer. Of course, it comes with its own trade-offs.

Let me tell you how you can smooth out some of the quirks using the Swift meta-programming library [Sourcery](https://github.com/krzysztofzablocki/Sourcery)!

## The problem: Kotlin extensions in Swift

The [interop](https://kotlinlang.org/docs/native-objc-interop.html) between Swift and Kotlin uses Objective-C as a medium, and it doesn't support Kotlin extensions has one would expect. An extension function like:

```kotlin
// file name is RocketExtensions.kt
fun Rocket.launch(): Boolean
```

Will translate into Swift like this:

```kotlin
class RocketKt {
	class func launch(_ receiver: Rocket): Bool
}

// How we expect to use it
rocket.launch()

// How we actually have to use it
let rocket = Rocket()
RocketExtensionsKt.launch(rocket)
```

The way Kotlin/Native generates the Objective-C header files for our extensions means they are accessible in Swift via a `RocketExtensionsKt` class. Note that the class matches the file name, not the class it is actually extending, which is a bummer. Nothing we can do for now in the Kotlin side, until pure Swift modules are supported.

## The solution: Sourcery!

One library that you need to be aware if you are building iOS apps is [Sourcery](https://github.com/krzysztofzablocki/Sourcery) from [@merowing\_](https://twitter.com/merowing_). The description says "Meta-programming for Swift, stop writing boilerplate code." and I am totally there for it.

I have only started to use it recently, but the flexability you gain is truly incredible. How does this help with our extensions situation? Well, we can write a template that Sourcery can use to generate actual extensions in Swift, shadowing the extension classes from our shared framework.

<div class="blockquote info">
If you are new to Sourcery, you can follow the <a href="https://github.com/krzysztofzablocki/Sourcery#installation">instalation guide</a> to set it up, and I found <a href="https://www.hackingwithswift.com/articles/85/introduction-to-sourcery">this article</a> by Paul Hudson to be a great introduction.
</div>

### Speed bump

Sourcery only works with Swift files and a KMM project will generate extensions in a framework with Obj-C headers. So we need to make Sourcery aware of our shared framework code!

If you open up an Obj-C file in Xcode while you are in a Swift project, Xcode will show you a generated interface for the Obj-C file to help you out. We can actually use the Swift CLI to the same effect, and generate a Swift interface for our shared framework that can be feed into Sourcery.

Add a "Run Script Phase" to your Xcode target with this bit of code:

```bash
echo "import shared\n:type lookup shared" | \
	xcrun --sdk macosx swift -F../shared/build/cocoapods/framework/ | \
	tail -n+2 >| ./Sources/Shared/Shared.swift
```

Here is what the script does:

1. We `echo` to the Swift CLI that we want to do a type lookup of the `shared` framework. Replace `shared` with your shared code framework.
2. Use `xcrun` to call `swift` and generate the interface file. We also take care include a path to our framework in the framework search paths using the `-F` flag.
3. Save the output to a Swift file, somewhere where Sourcery can read it.

<div class="blockquote alert">
Make note of adding this step before the Sourcery step, otherwise Sourcery might only pick up new types on the second build. Also note the <code class="language-text">--sdk macosx</code> flag. Running this inside Xcode will make `swift` default to whatever arch you are building, and if it is iOS it won't work.
</div>

### Write the Stencil template

Now, we just need to write a template that makes use of our shared framework types to create the extensions we want. Here is what I came up with:

```swift
import shared

{% macro paramsWithoutSelf method %}{% for param in method.parameters %}{% if forloop.first %}{% else %}
		{{ param.argumentLabel }}: {{param.typeName}}{% if not forloop.last %},{% endif%}
	{% endif %}{% endfor %}{% endmacro %}
{% macro argsWithoutSelf method %}
	{% for param in method.parameters %}
		{% if forloop.first %}
			{% if param.argumentLabel %}{{ param.argumentLabel }}: {% endif %}self{% if forloop.length > 1%},{% endif %}
		{% else %}
			{{ param.argumentLabel }}: {{ param.name }}{% if not forloop.last %},{% endif%}
		{% endif %}
	{% endfor %}
{% endmacro %}
{% for type in types.all where type.name|contains:"Kt" %}
{% for method in type.methods %}
{% if method.parameters.count > 0 %}
{% set isObsolete %}{% for attr in method.attributes where attr|contains:"available"%}{{attr}}{% endfor %}{% endset %}
{% if not isObsolete %}
{% set extensionName %}{% if method.parameters.first.typeName|contains:"?" %}Optional where Wrapped == {{ method.parameters.first.typeName|replace:"?","" }}{% else %}{{ method.parameters.first.typeName }}{% endif %}{% endset %}
extension {{ extensionName }} {
	func {{ method.shortName }}({% call paramsWithoutSelf method %}) -> {{ method.returnTypeName }} {
		{{ type.name }}.{{ method.shortName }}(
		{% call argsWithoutSelf method %}
		)
	}
}

{% endif %}
{% endif %}
{% endfor %}
{% endfor %}
```

<div class="blockquote info">
Sentcil is pretty hard to read for the uninitiated. But don't be intimidated, you can checkout the <a href="https://stencil.fuller.li/en/latest/templates.html#">language overview</a> to get a good graps of what it can do, and refer to the <a href="https://cdn.rawgit.com/krzysztofzablocki/Sourcery/master/docs/writing-templates.html">Sourcercy documentation</a> to get an idea of what is available to you.
</div>

This template makes some safe assumptions regarding our shared types:

- A Kotlin extension class name will always end with "Kt" in Swift
- The first parameter of the Kotlin extension method is the class we want to extend
- For the previous to work, we ignore methods without parameters, like `init()`
- We can skip methods tagged with `obsoleted`

The other thing of note is that `Optional` types are extended correctly with type coersion, otherwise we would generate `extension Rocket? {}` which doesn't compile.

Using our previous `Rocket` extension as an example, here is what we end up with:

```swift
// Swift generate code
import shared

extension Rocket {
	func launch() -> Bool {
		RocketKt.launch(
			self
		)
	}
}
```

I am sure the template can be improved, but for now it covers all my extensions without issues and saves me from writing all this boilerplate.

### The magic doesn't stop here...

Sourcery fits really well bridging the Kotlin to Swift gap. Its usage doesn't stop with the extensions! Another example of how I use it is with a shared theme configuration.

```kotlin
object Theme {
	val backgroundColor = 0xFFFF00FF
	val salmonColor = 0xFFFF0000
	val shadowColor = 0xFF00000
}
```

For iOS I wrote a template that creates an extension to `SwiftUI.Color` with the theme colors. Now everytime you add a new color in the `Theme` object, you automatically get the extensions in Swift. We end up with a file like:

```swift
import SwiftUI
import shared

extension Color {
	var backgroundColor: Color {
		Theme().backgroundColor.toColor()
	}
	...
}

// Here is how you use it!
struct DotView: View {
	var body: some View {
		Circle()
			.fill(Color.backgroundColor)
	}
}
```

Here is the Stencil template:

```kotlin
import shared
import SwiftUI

{% for type in types.all where type.name == "Theme" %}
extension Color {
	{% for variable in type.variables %}
	static var {{ variable.name }}: Color {
		{{ type.name }}().{{ variable.name }}.toColor()
	}

	{% endfor %}
}
{% endfor %}
```

## Conclusion

We made use of a Soucercy template to generate code that makes our Kotlin extensions actually extend the correct Swift classes. We also used the Swift CLI to generate an interface of our shared framework that Sourcery could read. And we set it up so it runs everytime Xcode builds, so changes in the shared framework are automatically propagated to Swift.

Integrating Sourcery early into a KMM project pays off in the short and in the long run. With this setup, you avoid writing a lot of boilerplate code and bridge the gap between Kotlin and Swift a bit better. Best part is that you can keep adding templates to fit your usage and make it easy to keep switching contexts.

Hope you enjoyed this post and that it makes your life a little bit easier in the KMM world.

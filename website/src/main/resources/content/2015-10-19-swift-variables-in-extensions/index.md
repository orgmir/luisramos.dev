---
title: Swift Variables in Extensions
date: 2015-10-19
description: How to add variables in Swift extensions
slug: /swift-variables-in-extensions
tags:
  - iOS
  - Swift
  - mobile
---

I have recently started working on a project that uses Swift2.0! I have been using Obj-C for the past 3 years, and when Swift came I wasn't one of the early adopters. Problems with the language and with SourceKit always crashing in XCode 6 didn't make for a good dev environment. Now with the 2.0 released to the wild, the promise of open source and XCode 7, Swift is good to go!

One of the first problems I had is one that happens to many iOS developers that use extensions/categories in their projects: How do I add a variable (static or not) to an extension?

Since I seem to always be googling for this one, I'll log it here for future convenience.

### Static Variables

For a static variable, there is actually a really neat way:

```swift
extension UIView {
  struct Static {
    static var defaultPadding : CGFloat = 16
  }
  func widthWithPadding() -> CGFloat {
    return self.bounds.width + Static.defaultPadding
  }
}
```

Since you can declare structs in an extension, you can use these value objects to hold your static variables and they function the same way as declaring a static variable on the class. If you don't like the extra `Static.` declaration, you can create wrappers using computed variables:

```swift
extension UIView {
  var defaultPadding : CGFloat { return Static.defaultPadding }
}
```

### Instance Variables

For instance variables the solution is to use the obj-c runtime. You need to create computed variables that get and set an associated object using `objc_getAssociatedObject()` and `objc_setAssociatedObject()`. This is the same approach taken if using it with Obj-C.

```swift
import ObjectiveC

extension UIViewController {
  struct Static {
    static var MainTitle = "\_MainTitle"
  }
  var mainTitle: String? {
    get{
      return objc_getAssociatedObject(self,&Static.MainTitle) as? String
    }
    set(value){
      if newValue = newValue {
        objc_setAssociatedObject(self,&Static.GenericTitle,newValue as NSString?,.OBJC_ASSOCIATION_RETAIN_NONATOMIC)
      }
    }
  }
}
```

That way you can extend to your heart desire! If you want to understand the difference between structs and classes check out the [Apple docs](appledocs-class-vs-strutc). And to find out more about what kind of magic you can do with obj-c runtime check out [NSHipster post on it](nshipster-objc).

[appledocs-class-vs-strutc]: https://developer.apple.com/library/ios/documentation/Swift/Conceptual/Swift_Programming_Language/ClassesAndStructures.html#//apple_ref/doc/uid/TP40014097-CH13-ID82
[nshipster-objc]: http://nshipster.com/swift-objc-runtime/

---
date: 2019-04-30
title: 'Auto Layout UIView Extension: A quick way to programatically create layouts'
slug: /autolayout-uiview-extension
tags:
  - iOS
  - mobile
  - snippets
---

Recently I have taken a renewed interest into this blog. I have revamped the theme (mostly stealing it from my friend's blog, [check it out](https://accidental.dev/)) and now I'm focusing on writing more regularly. I noticed that a lot of my code snippets are just sitting quietly on Github or Gitlab and could use a post or two to describe why I made them!

The first one I want to talk about is a UIView extension that I always use in my iOS projects. I always prefer to build my interface programatically, so that lead me to search for a few auto layout libraries.

The issue I have with using an auto layout library is that if a new developer joins the team, that person will need to deal with my choice of library that usually comes with its own set of idioms and abstractions. My experience is that people enjoy building layouts differently and the preference will always be for some other library! Also, the added abstractions leave me a bit too far away from the auto layout specifics.

Instead of choosing a library, a few years ago I created an extension with just a couple of methods to see if I could get away without adding a dependency.

```swift
func align(with view:UIView, constant:CGFloat = 0.0) {
  translatesAutoresizingMaskIntoConstraints = false
  leftAnchor.constraint(equalTo: view.leftAnchor, constant: constant).isActive = true
  rightAnchor.constraint(equalTo: view.rightAnchor, constant: -constant).isActive = true
  topAnchor.constraint(equalTo: view.topAnchor, constant: constant).isActive = true
  bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -constant).isActive = true
}
```

I kept adding to it as I needed and it kept growing. Currently it looks more like this:

```swift
@discardableResult
func align(with view: UIView, constant: CGFloat = 0.0) -> [NSLayoutConstraint] {
  translatesAutoresizingMaskIntoConstraints = false
  let constraints = [
    leftAnchor.constraint(equalTo: view.leftAnchor, constant: constant),
    rightAnchor.constraint(equalTo: view.rightAnchor, constant: -constant),
    topAnchor.constraint(equalTo: view.topAnchor, constant: constant),
    bottomAnchor.constraint(equalTo: view.bottomAnchor, constant: -constant),
  ]
  NSLayoutConstraint.activate(constraints)
  return constraints
}

@discardableResult
func alignTop(to anchor: NSLayoutYAxisAnchor, constant: CGFloat = 0.0, priority: UILayoutPriority = .required, isActive: Bool = true) -> NSLayoutConstraint {
  translatesAutoresizingMaskIntoConstraints = false
  let constraint = topAnchor.constraint(equalTo: anchor, constant: constant)
  constraint.priority = priority
  constraint.isActive = isActive
  return constraint
}
```

As you can see, some wrapper functions with sensible defaults make auto layout better to work with. The code becomes cleaner and easier to read, and you don't loose any of the features that auto layout gives us.

```swift
func viewDidLoad() {
  super.viewDidLoad()
  // ... setup view code

  containerView.align(with: view)
  textView.alignTop(with: view, constant: 40)
  textView.alignLeadingTrailing(with: view, constant: 20)
}
```

This extension has grown after several years of copying this over to each new project and adding something that was missing. It fits my needs well, so I have stopped looking for an auto layout library! The full extension is available [in this public gist.](https://gist.github.com/Orgmir/a140b15c1f2ab86b2a72d4c09570cd52) Thanks for reading!

---
title: 'Xcode crash on auto-complete: Snippets!'
date: 2016-02-07
description: I stumbled with a crash involving XCode and custom snippets
slug: /xcode-crash-autocomplete-snippets
tags:
  - iOS
  - mobile
---

My XCode crashed after updating it to version 7.2. It happened every time I tried to use auto-complete in an Obj-c file. Since my project was in Swift, it didn't bother me much. Things got worse when I actually needed to edit some library code!

It crash with this exception:

```objc
(NSInvalidArgumentException): -[__NSCFData isEqualToString:]: unrecognized selector sent to instance 0x7fd01c5d4530
```

Since I got bored fast using a text editor to work around it, I tried to fix it. I use some plugins, one of them being [fuzzy-autocomplete][fuzzy-auto] (if you don't use it, check it out, it's awesome!) I assumed the problem was with one of them. I removed them one by one and everytime I tried, BAM! Still crashing!

This was bad, because plugins where my only option. After googling for a while, I didn't find anyone with a similar problem, so I guessed it had something to do with my custom installation. And this is dumb, but I should have looked to the XCode crash log sooner...

```objc
6 0x00000001038f4708 +[IDECodeSnippetLibraryCompletionStrategy_scope:matchesScope:atBOL:] (in IDEKit)
```

After checking the crash log, it was apparent who the culprit was: Snippets!

It was the only custom thing left on my installation. I renamed the snippets folder, effectively stopping XCode from finding them. And guess what? Yes! Auto-complete worked again! I re-added all my loved plugins (fuzzy-autocomplete included), and back to coding I was. I didn't add my snippets, because I wasn't using them at all. But recreating them with the new XCode should solve the problem.

Just another day working with XCode...

PS: On a side note, if you don't use plugins with XCode, check [Alcatraz][alcatraz], a plugin manager! You are bound to find something that will improve your XCode usage :)

[fuzzy-auto]: https://github.com/FuzzyAutocomplete/FuzzyAutocompletePlugin
[alcatraz]: http://alcatraz.io/

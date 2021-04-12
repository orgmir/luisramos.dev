---
date: 2021-04-09
title: 'Mint: A language for Single Page Applications'
slug: /mint-language
tags: ['web', 'mint']
---

Android and iOS are my tech stacks of choice, both for work and pleasure, but I often keep tabs on what's going on on the web.

This post is about [Mint](https://www.mint-lang.com), a domain specific type-safe language created to build single page web applications. It has all the necessary utilities that a SPA will use bundled in the framework: components, stores, router, and more! And it makes them part of the language, with specific keywords.

Here is how you declare a component:

```jsx
component Main {
  style button {
    background: red;
    color: white;
    border: 0;
  }

  fun render : Html {
    <button::button>
      "Click ME!"
    </button>
  }
}
```

There is a `styles` keyword that allows you to use CSS to style your components, and it will all be sandboxed properly per component.

The syntax is similar to React, and the way it actually works underneath the hood is by offering React as a platform! It has a compiler and the build system will let you know of any errors you might have in your code. You are completely removed from the implementations specifics, and can focus on building your website.

Here is how you could declare a store and use it in a component, from [Mint documentation](https://www.mint-lang.com/guide/reference/components/connecting-stores):

```jsx
// This is our store. You can have multiple stores per app
store Counter {
  state count : Number = 0

  fun setCount (count : Number) : Promise(Never, Void) {
    next { count = count }
  }
}

component Main {
  // Connecting the store to the component
  connect Counter exposing { count, setCount }

  fun handleClick (event : Html.Event) : Promise(Never, Void) {
    setCount(count + 1)
  }

  fun handleContextMenu (event : Html.Event) : Promise(Never, Void) {
    setCount(0)
  }

  fun render : Html {
    <div
      onContextMenu={handleContextMenu}
      onClick={handleClick}>

      <{ "Count: " + Number.toString(count) }>

    </div>
  }
}
```

Really like how easy to ready everything is. There is a lot more to it, and I strongly suggest you read through its [learning guide/documentation](https://www.mint-lang.com/guide).

### Double edged sword

I really enjoy the power of this abstraction. But like all software it comes as a trade-off. By abstracting away the platform, it cuts us off from the ever expanding Javascript ecosystem.

It's package system only allows for packages with Mint code in them. There is no way to use an existing Javascript library in Mint, without wrapping it.

Mint has Javascript interop, allowing you to declare standard Javascript in your Mint code by surrounding it with backticks: 

```jsx
fun handleClick (event : Html.Event) : Void {
  `alert("Hello")`
}
```

But this interoperability only exists at the code level. There is no build step hooks, so an existing Javascript library would need to be backticked and probably exposed as a `module` to be available in Mint world. 

Let's say if you want to integrate [TailwindCSS](https://tailwindcss.com/) into your Mint SPA. Tailwind hooks into your build preprocessor step, in fact it assumes you will have one. Without acces to a preprocessor hook, the only option is to generate all Tailwind CSS and include it in the head, like [Mint's docs suggest](https://www.mint-lang.com/guide/recipes/using-third-party-css).

We could have our own script that parses the Mint files, looking for css classes, and then feed that to TailwindCSS. And then hook this with a file watcher. But at this point, you would have to run `npm install && mint install` to start up the project, which means you are back into regular Javascript land. Is this effort worth it? What if we want to use a date parsing library, or a Javascript form library...

### Still try it out!

Mint wants to do everything for you in the name of developer experience, but it cuts us away from web-dev Javascript tools and environment. Enabling a strong developer ecosystem is what makes Javascript one of the most popular environemnts to work in, and I think Mint should enable that if it wants to keep growing.

Nevertheless, if you keep to its boundaries, building a SPA with Mint is a breeze!

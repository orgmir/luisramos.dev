---
draft: true
date: 2020-03-17
title: 'My new blog! - Creating a Gatsby website'
slug: /new-blog-creating-gatsby-website
tags:
  - Javascript
---

Welcome to my new blog! Hope you enjoy it, I have spent the last couple of weeks building it. Now that it is done, I can finally start writing about stuff! 

_I kinda rebuilt it because I wanted to write about building it..._

So let me tell you how it works, what I learned, and how easy it is to do it!

## Tech stack

To be upfront about it, this blog is built using [Gatsby](https://www.gatsbyjs.org/), and deployed using Github Actions to a Digital Ocean droplet. And I am very happy with it. This entire website is open source, so if you wanna check the code [go ahead](https://github.com/orgmir/luisramos.dev)!

One day I was reading some blog posts from Tania Rascia and [this post](https://www.taniarascia.com/migrating-from-wordpress-to-gatsby/) made me look into Gatsby. In it she migrated her wordpress blog to a Gatsby website that she built from a pretty bare bones template. I have been thinking of revamping my blog again, since the last one was [more than a year ago](/migration-to-hugo/). Pairing that with my interest with this new JAMStack thing, I just got excited and started looking through the docs!

After building this website, I really enjoyed working with the plugin system and I loved that it used React and Graphql.

### Getting started

Following Tania's footsteps, I installed the `gatsby-cli` and created a website using the [gatsby-advanced-starter](https://github.com/vagr9k/gatsby-advanced-starter/). Turns out, that was totally overkill for me, and most of the things there overwhelmed me. So I tried again running `gatsby new luisramos.dev` and slowly added the plugins I needed as I went along.

Starting with the empty project, the first thing I did was setup [Tailwind CSS](tailwindcss.com/), which turned out pretty easy. I am not very good in terms of design skills, and playing around with CSS is fun but can also become a huge waste of time. Tailwind offers a fantastic documentation page, and fits super well into the React components world. You can quickly create your components using the existing classes, and when it you start duplicating a lot of styles, you move to create a component around it! Which fits very nicelly with React👍

Setting up Tailwind with Gatsby, was as easy as adding the plugin `gatsby-plugin-postcss` to gatsby configuration, adding a `postcss.config.js` requiring the Tailwind library, and adding the Tailwind css imports to the `global.css` file.

I am very impressed with the plugin system for this. Anything you require, and you bet there is a plugin to handle it! I wanted a RSS feed with all my posts, there's a plugin for that: `gatsby-plugin-feed`. I want my posts to be in markdown, so I needed a parser, there's a plugin for that: `gatsby-transformer-remark`. I wanted syntax highlighting for my code snippets, there's a plugin for the plugin: `gatsby-remark-prismjs`! Overall, very cool to work with.

This plugin system even got me wanting to build more websites!

### React+Graphql

Another feature I enjoyed was the React and Graphql support. In the beggining it felt very overkill to have a graphql query everywhere, but the more I read the documentation, the more it made sense to me.

I have enough experience with React that I could jump straight into this new website building my layout. After I had build the header/footer/nav combo, I started thinking about the main page, and I decided that I wanted latest three posts there. So when you land, you can immediatly read some stuff.

To do this, you can export a graphql query in your React page component that Gatsby will use to feed data into your component when it is created. The whole experience around this was incredible: I played around with the graphql browser until I had the data I wanted, I pasted the query into the page component, and like magic the data was there! Graphql is pretty sweet.

After that, I added some code to `gatsby-node.js` so it would create a page for all of my posts, using a template that reused the same `Post` component I created for the index page. After that, contact and about pages, an RSS feed, some more styling and a bit of writing. Sooner than I was expecting, I had a website ready to be deployed!

## Deployment via Github Actions




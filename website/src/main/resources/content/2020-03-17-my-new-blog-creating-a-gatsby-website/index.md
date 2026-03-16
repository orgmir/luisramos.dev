---
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

To be upfront about it, this blog is built using [Gatsby](https://www.gatsbyjs.org/), and deployed using GitHub Actions to a Digital Ocean droplet. And I am very happy with it. This entire website is open source, so if you wanna check the code [go ahead](https://github.com/orgmir/luisramos.dev)!

One day I was reading some blog posts from Tania Rascia and [this post](https://www.taniarascia.com/migrating-from-wordpress-to-gatsby/) made me look into Gatsby. In it she migrated her WordPress blog to a Gatsby website that she built from a pretty bare bones template. I have been thinking of revamping my blog again, since the last one was [more than a year ago](/migration-to-hugo/). Pairing that with my interest with this new JAMStack thing, I just got excited and started looking through the docs!

After building this website, I really enjoyed working with the plugin system and I loved that it used React and Graphql.

### Getting started

Following Tania's footsteps, I installed the `gatsby-cli` and created a website using the [gatsby-advanced-starter](https://github.com/vagr9k/gatsby-advanced-starter/). Turns out, that was totally overkill for me, and most of the things there overwhelmed me. So I tried again running `gatsby new luisramos.dev` and slowly added the plugins I needed as I went along.

Starting with the empty project, the first thing I did was setup [Tailwind CSS](tailwindcss.com/). I am not very good in terms of design skills, and playing around with CSS is fun but can also become a huge waste of time. Tailwind fits nicely into the "just make a component" React world, and paired with a fantastic documentation page, it is very easy to work with. You can quickly create your styles using the existing classes, and when it you start duplicating a lot, you move everything to a component! 👍

Setting up Tailwind with Gatsby was as easy as adding the plugin `gatsby-plugin-postcss` to gatsby configuration, adding a `postcss.config.js` requiring the Tailwind library, and adding the Tailwind css imports to the `global.css` file.

I am very impressed with the plugin system. Anything you need, and you bet there is a plugin that does it! I wanted a RSS feed with all my posts, there's a plugin for that: `gatsby-plugin-feed`. I want my posts to be in markdown, there's a plugin for that: `gatsby-transformer-remark`. I wanted syntax highlighting for my code snippets, there's even a plugin for the plugin: `gatsby-remark-prismjs`! Overall, very wonderful to work with.

This plugin system even got me wanting to build more websites!

### React+Graphql

Another feature I enjoyed was the React and Graphql support. In the beginning it felt very overkill to have a graphql query everywhere, but the more I read the documentation, the more it made sense to me.

I have enough experience with React that I could jump straight into this new website building my layout. After I had build the header/footer/nav combo, I started thinking about the main page, and I decided that I wanted the latest three posts there. So when you land, you can immediately read some stuff.

To do this, you write a graphql query in your React page, name it `pageQuery` and export it. Then, Gatsby will take the data generated from that query and feed it to the component.

The whole experience around this was incredible: I played around with the graphql browser until I had the data I wanted, I pasted the query into the page component, and like magic the data was there! Graphql is pretty sweet.

After that, I added some code to `gatsby-node.js` so it would create a page for all of my posts. It uses a template, so I don't need to create a component for each post manually. After that, I added a contact and about pages, an RSS feed, some more styling and a bit of content. Sooner than I was expecting, I had a website ready to be deployed!

## Deployment via GitHub Actions

My previous blog was hosted on the same [Digital Ocean](<[https://www.digitalocean.com](https://www.digitalocean.com/)>) droplet that this one is. I have this one box that I use to play around with several things, so since I am already paying for it, and I don't drive a lot of traffic, I planned the same for this blog.

The deployment steps to get this into the server are:

- Run `gatsby build` to get the static version of the website
- Upload the generated folder to the server, preferably using `rsync`

So I shopped around a bit, and I am impressed by the amount of GitHub actions already available. I created a workflow that checkouts my code, runs the build and uploads the website to my server in less than half an hour. And it caches the `~/.npm` folder, so it all runs in 2 mins on CI.

## Yay Gatsby

I am very happy with the current setup. This website already has pulled this post out of me, so lets see if it makes me write more! Hope you enjoyed this write up as much as I have enjoyed building the site.

If you liked this post, or if you just wanna send me some feedback, send me a [tweet](https://twitter.com/luisramos1337).

As a final note, I wrote this post in a very cool markdown editor, [Typora](https://typora.io/). It is free during beta, so give it a try!

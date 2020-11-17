---
date: 2018-09-27
title: 'Blog revamp: Migrating to Hugo'
slug: /migration-to-hugo
tags:
  - web
  - hugo
---

_**Update:**_ Since this post was made, I have moved my blog to a new website and tech stack. Check out the post about the new [revamp](/new-blog-creating-gatsby-website)!

<p></p>

-------

The blog has a new look! I like to think it looks a bit better now. Of course the fun side of it is the tech stack. It is now generated using [hugo], deployed using [Gitlab][gitlab] incredible CI pipelines, and also I'm hosting it on a [Digital Ocean][digitalocean] droplet.

I want to talk about my experience migrating from Jekyll to hugo, and how I went about setting everything up.

## Migrating to Hugo

This blog was previously hosted in Github pages, and it used Jekyll to render the static pages. All the content was in markdown already, so it was relatively easy to migrate it to hugo. The content structure is relatively similar in both frameworks. I only had trouble with the syntax higlight for my code snippets, and with processing the template sass files to css.

Hugo uses a code syntax generator called [Chroma][chroma]. The only change is that instead of using the normal markdown code marks, it uses specific tags:

```go
< highlight swift >
```

You also need to declare the language you are highlighting (`swift` in that example).

Generating new content is super easy and fast, you just run the following command:

```sh
hugo new posts/title-of-blog-post.md
```

This command will create a new file in the specified content folder, with some front-matter meta data already setup for you to fill.

The template system is also straighforward to use, and you can easily define new content types and front-matter, to be used by the `hugo new` command.

### Hugo Extended

I found a gap in documentation about this, but it seems that hugo has an "extended" version. It adds extras, like sass processing, to the usual binary.

When I tried to edit the template sass files, the changes weren't visible on refresh. They were being ignored, and since I was running locally there was no change it could be some cache issue.
I eventually figured out that the template was using generated resources in a `resources/_gen/` folder, and deleting that basically broke the generation. Since no css was found, hugo errored out and didn't generate the website.

After googling around, I found out about the extended version of hugo that you can download from their releases page. Running the extended version compiled the sass files into css, and made everything work again. But now this means I need the extended version to generate my website, since I want to process the sass files on every generation.

## Deployment with Gitlab CI

If you haven't tried [Gitlab][gitlab] you should really give it a spin. I'll to not fanboy about it too much, but they have some amazing features.

One of them is the ability to setup a CI pipeline, writing some configuration on a `.gitlab-ci.yml` at the root of your repo. This way, everytime I push a commit to master, a deployment is triggered by Gitlab.
You get 1000 free minutes of running time each month, more than enough for all your blogging needs.

Since I have to use hugo extended to generate my website, I couldn't use the suggested image to run my build. I created a new Dockerfile that installs the right hugo binary, and also all the commands needed for deployment. This highlights another cool feature of Gitlab: you have a container register for each project, meaning you can have your container images right next to the project they are relevant to.

After I built and pushed the image, I just needed to reference it in my CI file to get it running the deployment without a hitch! It's pretty satisfying to finally get a CI job green. Check out the [`.gitlab-ci.yml`][gitlab-snippet] and the [`Dockerfile`][dockerfile-snippet] used for this.

## Hosting on Digital Ocean

The final command of the deployment is a rsync into a Digital Ocean droplet. Pretty satisfied with the setup process for creating a droplet, it's a one button click for most of what you need. Haven't had an issue with it yet!

I am using nginx to serve the website on the droplet, which was fairly easy to setup with all the info that is available online. I setup certbot to create and automatically renew ssl certificates for the website. It also takes care of updating the website config for you.

Also, since Cloudflare has a one website free tier, I got all of my traffic running through it. So hopefully, my droplet will barelly be touched!

## DevOps for the common man

I am really happy with this setup. Hugo is a powerful framework, quick to setup but roboust enough to handle more heavy duty websites. Gitlab enables DevOps for the common man, giving me control over it but in a way that I'm not overwhelmed. And hosting solutions like Digital Ocean used in conjuction with CDNs like Cloudflare mean that you can serve a lot of people for cheap. A lot can be done by leveraging this infrastructure, which gets me excited!

Next up, I'll add a static CMS like [Netlify] to this blog so I can write from anywhere!

[hugo]: http://gohugo.io/
[gitlab]: http://gitlab.com/
[digitalocean]: https://www.digitalocean.com/
[chroma]: https://github.com/alecthomas/chroma
[gitlab-snippet]: https://gitlab.com/snippets/1757791
[dockerfile-snippet]: https://gitlab.com/snippets/1757792
[netlify]: https://www.netlifycms.org/

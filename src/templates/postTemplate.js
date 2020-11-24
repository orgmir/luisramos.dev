import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'
import Layout from '../components/layout'
import SEO from '../components/seo'
// import { Disqus } from 'gatsby-plugin-disqus'

export default function PostTemplate({ location, data }) {
  const { markdownRemark /*, site */ } = data
  const { frontmatter, html } = markdownRemark
  // const disqusConfig = {
  //   url: `${site.siteMetadata.siteUrl + location.pathname}`,
  //   identifier: frontmatter.slug,
  //   title: frontmatter.title,
  // }
  return (
    <Layout location={location}>
      <SEO title={frontmatter.title} slug={frontmatter.slug} />
      <Post
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
        slug={frontmatter.slug}
      />
      <FriendlyCallout />
    </Layout>
  )
}

const FriendlyCallout = () => (
  <div class="flex-col items-center pt-6">
    <div class="mx-auto w-12 border-b-2 border-orange-300 text-center mb-4"></div>
    <div class="flex justify-start">
      <div class="flex-col px-4 py-4">
        <h4 class="text-base mb-2">Thank you for reading</h4>
        <p class="text-sm opacity-75 mb-4">
          Please get in touch if you have a suggestion, spot an issue, or want
          to say hello.
        </p>
        <div class="flex-row">
          <a href="mailto:luis.ramos@hey.com">
            <button class="text-sm rounded text-black border-2 border-gray-300 py-1 px-2">
              Send email
            </button>
          </a>
          <a href="https://twitter.com/luisramos1337">
            <button class="text-sm rounded border-2 border-blue-200 text-blue-600 py-1 px-2 ml-4">
              Send tweet
            </button>
          </a>
        </div>
      </div>
    </div>
  </div>
)

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        slug
        title
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

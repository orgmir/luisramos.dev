import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'
import Layout from '../components/layout'
import SEO from '../components/seo'

export default function PostTemplate({ location, data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout location={location}>
      <SEO title={frontmatter.title} slug={frontmatter.slug} />
      {frontmatter.draft && (
        <div class="blockquote alert">
          <i>You are looking at a draft post.</i>
        </div>
      )}
      <Post
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
        slug={frontmatter.slug}
      />
      <FriendlyCallout postRelativePath={data.file.relativePath} />
    </Layout>
  )
}

const FriendlyCallout = ({ postRelativePath }) => (
  <div class="flex-col items-center pt-6">
    <div className="mx-auto w-12 border-b-2 border-orange-300 text-center mb-4" />
    <div class="flex justify-start">
      <div class="flex-col px-4 py-4">
        <h4 className="text-base mb-2">Thank you for reading</h4>
        <p class="text-sm opacity-75 mb-4">
          Please get in touch if you have a suggestion, spot an issue or want to
          say hello.
        </p>
        <div class="flex-row">
          {postRelativePath != null && (
            <a
              href={
                'https://github.com/Orgmir/luisramos.dev/blob/main/src/content/' +
                postRelativePath
              }
            >
              <button class="text-sm rounded text-black border-2 border-gray-300 py-1 px-2 mr-4">
                Edit in Github
              </button>
            </a>
          )}
          <a href="mailto:luis.ramos@hey.com">
            <button class="text-sm rounded text-black border-2 border-gray-300 py-1 px-2 mr-4">
              📧 Email me
            </button>
          </a>
          <a href="https://twitter.com/luisramos1337">
            <button class="text-sm rounded border-2 border-blue-200 text-blue-600 py-1 px-2">
              🐥 Tweet at me!
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
        draft
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    file {
      relativePath
    }
  }
`

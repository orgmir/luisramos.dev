import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'

export default function PostTemplate({ location, data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout location={location}>
      <SEO title={frontmatter.title} />
      <div className="md:hidden">
        <Face />
      </div>
      <Post
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
        slug={frontmatter.slug}
      />
    </Layout>
  )
}

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
  }
`

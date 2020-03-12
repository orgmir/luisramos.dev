import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'

export default function PostTemplate({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Post
      title={frontmatter.title}
      date={frontmatter.date}
      html={html}
      slug={frontmatter.slug}
    />
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

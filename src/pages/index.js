import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'
import Post from '../components/post'

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges.map(({ node }) => (
    <Post
      title={node.frontmatter.title}
      date={node.frontmatter.date}
      slug={node.frontmatter.slug}
      html={node.html}
    />
  ))
  return (
    <Layout>
      <SEO title="Home" />
      <Face />
      <div className="text-left px-8 text-xl mb-4">Latest posts:</div>
      {posts}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 3
    ) {
      edges {
        node {
          html
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            slug
            title
          }
        }
      }
    }
  }
`

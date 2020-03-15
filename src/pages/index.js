import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'
import Post from '../components/post'

const IndexPage = ({
  location,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges.map(({ node }, index) => (
    <>
      <Post
        title={node.frontmatter.title}
        date={node.frontmatter.date}
        slug={node.frontmatter.slug}
        html={node.html}
      />
      {index != edges.length - 1 && <PostSeparator />}
    </>
  ))
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Face />
      {posts}
    </Layout>
  )
}

export default IndexPage

const PostSeparator = () => (
  <div className="mt-10 mb-10 border-b boder-gray-200"></div>
)

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

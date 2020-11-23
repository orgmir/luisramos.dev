import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'
import PostListing from '../components/post-listing'

const BlogPage = ({
  location,
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout location={location}>
    <SEO title="Blog" />
    <h1 className="text-5xl px-4 mb-6">Posts</h1>
    <ul>
      {edges.map(({ node: { frontmatter } }) => (
        <PostListing
          title={frontmatter.title}
          date={frontmatter.date}
          slug={frontmatter.slug}
          key={frontmatter.slug}
        />
      ))}
    </ul>
  </Layout>
)

export default BlogPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
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

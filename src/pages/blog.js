import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'
import { Link, graphql } from 'gatsby'

const BlogPage = ({
  location,
  data: {
    allMarkdownRemark: { edges },
  },
}) => (
  <Layout location={location}>
    <SEO title="Blog" />
    <Face />
    <h1 className="text-3xl px-4 mb-6">Posts</h1>
    {edges.map(({ node: { frontmatter } }) => (
      <PostListing
        title={frontmatter.title}
        date={frontmatter.date}
        page={frontmatter.slug}
        key={frontmatter.slug}
      />
    ))}
  </Layout>
)

const PostListing = ({ title, date, page }) => (
  <Link to={page}>
    <div className="mb-4 mx-4 flex bg-gray-200 hover:bg-orange-300">
      <div className="w-2 flex-grow-0"></div>
      <div className="pl-2 py-1 bg-white flex-grow hover:bg-orange-100">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-700 mt-1">{date}</p>
      </div>
    </div>
  </Link>
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

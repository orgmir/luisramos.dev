import React from 'react'
import { graphql, Link } from 'gatsby'

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
      <div class="px-4">
        <Link to={node.frontmatter.slug + '#comments'} className="link-blue">
          Add to the discussion >
        </Link>
      </div>
      {index !== edges.length - 1 && <PostSeparator />}
    </>
  ))
  return (
    <Layout location={location}>
      <SEO title="Home" pathname={location.pathname} />
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
      filter: { frontmatter: { draft: { ne: true } } }
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

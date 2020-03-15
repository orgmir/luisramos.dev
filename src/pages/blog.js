import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'

const BlogPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Blog" />
    <Face />
    <p>This is the blog.</p>
  </Layout>
)

export default BlogPage

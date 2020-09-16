import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

export default function PostTemplate({ location, data }) {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark
  const disqusConfig = {
    url: `${site.siteMetadata.siteUrl + location.pathname}`,
    identifier: frontmatter.slug,
    title: frontmatter.title,
  }
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
      <Disqus config={disqusConfig} className="px-4" />
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

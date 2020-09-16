import React from 'react'
import { graphql } from 'gatsby'
import Post from '../components/post'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'
import { Disqus } from 'gatsby-plugin-disqus'

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
      <SEO title={frontmatter.title} pathname={location.pathname} />
      <div className="md:hidden">
        <Face />
      </div>
      <Post
        title={frontmatter.title}
        date={frontmatter.date}
        html={html}
        slug={frontmatter.slug}
      />
      <div id="comments" class="px-4">
        <Disqus config={disqusConfig} />
      </div>
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

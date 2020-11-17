import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'
import LFW from '../components/lfw'
import Post from '../components/post'
import PostListing from '../components/post-listing'

const ProjectListing = ({ title, subtitle, slug }) => (
  <li className="pr-4 pl-3 py-3 text-lg first:mt-2 leading-none hover:bg-orange-100 border-l-4 border-transparent hover:border-orange-300 radius">
    <Link to={slug}>
      <h3 className="font-medium pb-1 w-auto">{title}</h3>
      <time className="mt-1 text-black text-opacity-50 block w-auto">
        {subtitle}
      </time>
    </Link>
  </li>
)

const IndexPage = ({
  location,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const posts = edges.map(({ node }, index) => (
    <PostListing
      title={node.frontmatter.title}
      date={node.frontmatter.date}
      slug={node.frontmatter.slug}
    />
  ))
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <Face />
      <LFW />
      <div className="mx-4 pb-1 flex border-b-2 border-orange-300">
        <h2 className="text-2xl font-medium">Latest posts</h2>
        <Link
          to="/blog"
          className="self-center ml-8 text-xs px-2 py-1 bg-orange-200 text-orange-900 rounded-sm"
        >
          View all
        </Link>
      </div>
      <ul>{posts}</ul>
      <h2 className="mx-4 text-2xl font-medium pb-1 border-b-2 border-orange-300 pt-6">
        Projects
      </h2>
      <ul>
        <ProjectListing
          title="📙 Ler"
          subtitle="A RSS Aggregator app for Android. Open source!"
          slug="/ler-rss-aggregator-for-android"
        />
        <ProjectListing
          title="🐊 Kroclin"
          subtitle="Kotlin snapshot testing made easy."
          slug="https://github.com/Orgmir/kroclin"
        />
        <ProjectListing
          title="⏰ Clock in a dock"
          subtitle="A clok for your macOS dock"
          slug="https://twitter.com/luisramos1337/status/1316981357076221953"
        />
      </ul>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: 3
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

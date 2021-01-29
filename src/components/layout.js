/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'
// import "./layout.css"

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)
  return (
    <>
      <Header
        menuLinks={data.site.siteMetadata.menuLinks}
        location={location}
      />
      <div className="container mx-auto md:max-w-screen-md">
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout

import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { Link } from 'gatsby'

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <div className="markdown">
      <h1 className="text-center text-gray-900" style={{ fontSize: '4rem' }}>
        404
      </h1>
      <p className="">
        The page you are trying to visit doesn't exist. Maybe check out one of
        the posts in the <Link to="/blog">blog</Link>.
      </p>
      <p>
        Or send me a <a href="https://twitter.com/luisramos1337">tweet</a> if
        you think something is wrong!
      </p>
    </div>
    <img src="/etphonehome.gif?s=404" />
  </Layout>
)

export default NotFoundPage

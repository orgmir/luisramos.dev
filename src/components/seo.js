/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import favicon16 from '../images/favicon16.png'
import favicon32 from '../images/favicon32.png'
import favicon64 from '../images/favicon64.png'

function SEO({ description, lang, meta, title, slug }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  let expandedMeta = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ].concat(meta)

  if (slug) {
    expandedMeta = [
      ...expandedMeta,
      {
        name: 'og:image',
        content: `${site.siteMetadata.siteUrl}${slug}/twitter-card.jpg`,
      },
      {
        name: 'twitter:image',
        content: `${site.siteMetadata.siteUrl}${slug}/twitter-card.jpg`,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ]
  } else {
    expandedMeta = [
      ...expandedMeta,
      {
        name: 'og:image',
        content: `${site.siteMetadata.siteUrl}/big_me.png`,
      },
      {
        name: 'twitter:image',
        content: `${site.siteMetadata.siteUrl}/big_me.png`,
      },
    ]
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={expandedMeta}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: `${favicon16}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: `${favicon32}`,
        },
        { rel: 'shortcut icon', type: 'image/png', href: `${favicon64}` },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO

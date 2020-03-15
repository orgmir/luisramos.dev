module.exports = {
  siteMetadata: {
    title: 'Luis Ramos',
    description:
      'I do a lot of things software related, but mainly I develop native iOS and Android apps. These are their stories DUM DUM.',
    author: '@luisramos1337',
    menuLinks: [
      {
        name: 'Luis Ramos',
        link: '/',
      },
      {
        name: 'About',
        link: '/about',
      },
      {
        name: 'Blog',
        link: '/blog',
      },
      {
        name: 'Contact',
        link: '/contact',
      },
    ],
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-prismjs`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#ff9800',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-postcss',
  ],
}

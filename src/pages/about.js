import React from 'react'
import Layout from '../components/layout'
import Face from '../components/face'
import SEO from '../components/seo'

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="About" pathname={location.pathname} />
    <Face />
    <div className="markdown">
      <p className="mb-4">
        I’m a software developer, currently working in Sydney. I do a lot of
        things software related, mainly I develop native iOS and Android apps.
      </p>
      <p>
        This blog exists to document what I have learned developing apps, since
        most of my findings are sure to be lost in my memory. It also doubles as
        a portfolio and as a test ground for keeping my web dev skills somewhat
        up to date.
      </p>
      <p>
        My latest language focus are: Kotlin and Swift, with some Javascript on
        the side. Send me a{' '}
        <a href="https://twitter.com/luisramos1337">tweet</a> if you wanna get
        in touch, or an <a href="mailto:luis.ramos@hey.com">email</a> if that
        suits you better. And check my projects on{' '}
        <a href="https://http://github.com/orgmir">github</a>.
      </p>
      <p>
        This website is made using <a href="https://www.gatsbyjs.org">Gatsby</a>
        . Since my design skills are not on par with my coding ones, I used{' '}
        <a href="https://tailwindcss.com">Tailwind</a> to build it. The font
        used is the lovely{' '}
        <a href="https://github.com/JetBrains/JetBrainsMono">JetBrains Mono</a>.
      </p>
    </div>
  </Layout>
)

export default AboutPage

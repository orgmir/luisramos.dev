import React from 'react'

import { Link } from 'gatsby'
import Layout from '../components/layout'
import Hello from '../components/hello'
import SEO from '../components/seo'

const AboutPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="About" />
    <Hello />
    <div className="markdown mt-6">
      <p>
        I am a portuguese software developer living in Sydney{' '}
        <span role="img" aria-label="australian flag">
          🇦🇺
        </span>
        . I have been building native Android and iOS apps since 2013 and loving
        it!
      </p>
      <p>
        I have vast experience bringing greenfield mobile projects to life,
        working in product teams, and solving problems for companies in the
        mobile space. You can check my CV <Link to="/cv">here</Link>. If you
        want to work with me, please{' '}
        <a href="mailto:luis.ramos@hey.com">reach out</a>!
      </p>
      <p>
        I also write software using other stacks and languages. One example is
        this website, made using <a href="https://www.gatsbyjs.org">Gatsby</a>{' '}
        and <a href="https://tailwindcss.com">Tailwind</a>. It uses the lovely{' '}
        <a href="https://github.com/JetBrains/JetBrainsMono">JetBrains Mono</a>{' '}
        font for code snippets. If you see any issues, please{' '}
        <a href="https://github.com/Orgmir/luisramos.dev/">
          open a pull request
        </a>{' '}
        since this website is open source!
      </p>
      <p>
        My latest language focus are Kotlin and Swift, with some Javascript on
        the side. I believe that Kotlin Multiplatform Mobile, along with SwiftUI and
        Jetpack Compose, will change the way we build apps for all platforms!
        Get in touch if you want to talk to me about it ;)
      </p>
      <h2>
        <span role="img" aria-label="link">
          🔗
        </span>{' '}
        Links
      </h2>
      <ul>
        <li>
          Send me an <a href="mailto:luis.ramos@hey.com">email</a>
        </li>
        <li>
          Send me a <a href="https://twitter.com/luisramos1337">tweet</a>
        </li>
        <li>
          Buy me a <a href="https://ko-fi.com/luisramosdev">coffee</a>{' '}
          <span role="img" aria-label="coffee">
            ☕️
          </span>
        </li>
        <li>
          Check out my <a href="https://github.com/orgmir">Github</a>
        </li>
        <li>
          Check out my{' '}
          <a href="https://www.linkedin.com/in/lpramos/">LinkedIn</a>
        </li>
      </ul>
    </div>
  </Layout>
)

export default AboutPage

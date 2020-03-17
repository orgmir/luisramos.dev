import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Face from '../components/face'

const ContactPage = ({ location }) => (
  <Layout location={location}>
    <SEO title="Contact" />
    <Face />
    <div className="markdown">
      <h1>Contact</h1>
      <p className="mb-4">
        Hello there, I'm Luis, a software developer from Portugal, now based out
        of Sydney. I build native mobile apps for Android and iOS, and I write
        about what I learn.
      </p>
      <p>
        I also like to build stuff with other languages and stacks, like this
        blog, so I write about that as well.
      </p>
      <p>
        If you like what you read here, or if you just want to give me some
        feedback or ideas, give me a follow on{' '}
        <a href="https://twitter.com/luisramos1337">twitter</a> and tweet my
        way.
      </p>
      <h2>Where you can find me:</h2>
      <ul>
        <li>
          Email: <a href="mailto:luis@luisramos.app">luis@luisramos.app</a>
        </li>
        <li>
          GitHub: <a href="https://github.com/Orgmir">Orgmir</a>
        </li>
        <li>
          Twitter: <a href="https://twitter.com/luisramos1337">luisramos1337</a>
        </li>
        <li>
          Ko-Fi: <a href="https://ko-fi.com/luisramosdev">luisramosdev</a>
        </li>
        <li>
          Feed: <a href="/rss.xml">RSS</a>
        </li>
      </ul>
    </div>
  </Layout>
)

export default ContactPage

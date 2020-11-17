import React from 'react'

const Footer = () => (
  <footer className="mx-4">
    <ul className="flex flex-wrap justify-center items-center sm:justify-end md:max-w-screen-md md:mx-auto text-xs py-6 mt-6 border-t border-orange-300">
      <li className="w-screen sm:w-auto sm:flex-grow">© 2020 Luis Ramos</li>
      <li className="pr-4">
        <a className="hover:text-orange-500" href="https://github.com/orgmir">
          Github
        </a>
      </li>
      <li className="pr-4">
        <a
          className="hover:text-orange-500"
          href="https://twitter.com/luisramos1337"
        >
          Twitter
        </a>
      </li>
      <li className="pr-4">
        <a className="hover:text-orange-500" href="/sitemap.xml">
          Sitemap
        </a>
      </li>
      <li className="">
        <a className="hover:text-orange-500" href="/rss.xml">
          RSS Feed
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer

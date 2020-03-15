import React from 'react'
import { Link } from 'gatsby'

const Footer = () => (
  <footer>
    <div className="flex flex-wrap justify-between px-8 pt-4 pb-12 text-sm border-t border-gray-200 mt-8">
      <div className="text-gray-500 py-2">
        A blog by{' '}
        <a
          className="text-gray-600 hover:text-gray-800"
          href="https://twitter.com/luisramos1337"
        >
          Luis Ramos
        </a>
      </div>
      <ul className="flex">
        <li className="py-2 pr-4">
          <Link className="text-gray-600 hover:text-gray-800" to="/">
            Home
          </Link>
        </li>
        <li className="py-2 pr-4">
          <a
            className="text-gray-600 hover:text-gray-800"
            href="https://http://github.com/orgmir"
          >
            Github
          </a>
        </li>
        <li className="py-2 pr-4">
          <a
            className="text-gray-600 hover:text-gray-800"
            href="https://twitter.com/luisramos1337"
          >
            Twitter
          </a>
        </li>
        <li className="py-2">
          <a className="text-gray-600 hover:text-gray-800" href="">
            RSS Feed
          </a>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer

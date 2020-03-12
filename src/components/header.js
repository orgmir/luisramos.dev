import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <header>
    <nav>
      <ul className="flex justify-center sm:justify-end px-8 py-4">
        <li className="mr-6 sm:mr-8 py-4">
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About Me
          </Link>
        </li>
        <li className="mr-6 sm:mr-8 py-4">
          <Link href="/blog" className="text-gray-700 hover:text-gray-900">
            Blog
          </Link>
        </li>
        <li className="py-4">
          <Link href="/contact" className="text-gray-700 hover:text-gray-900">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

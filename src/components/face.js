import React from 'react'

import Hello from '../components/hello'
import { Link } from 'gatsby'

const Face = () => (
  <div>
    <div className="bg-white text-lg">
      <Hello />
      <p className="mt-6 leading-7 px-4">
        I'm a freelance mobile developer. I{' '}
        <a
          className="underline text-blue-500 font-normal hover:text-blue-700"
          href="https://github.com/orgmir"
        >
          build
        </a>{' '}
        native apps for iOS and Android and{' '}
        <Link
          className="underline text-blue-500 font-normal hover:text-blue-700"
          to="/blog"
        >
          write
        </Link>{' '}
        about what I learn. Check out my{' '}
        <a
          className="underline text-blue-500 font-normal hover:text-blue-700"
          href="https://github.com/orgmir"
        >
          contributions
        </a>{' '}
        to open source and my{' '}
        <Link
          className="underline text-blue-500 font-normal hover:text-blue-700"
          to="/blog"
        >
          personal projects
        </Link>
        .
      </p>
      <p className="mt-6 leading-7 px-4">
        Learn more{' '}
        <Link
          className="underline text-blue-500 font-normal hover:text-blue-700"
          to="/about"
        >
          about me here
        </Link>
        .
      </p>
    </div>
  </div>
)

export default Face

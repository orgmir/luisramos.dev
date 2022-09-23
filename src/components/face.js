import React from 'react'

import Hello from '../components/hello'
import { Link } from 'gatsby'

const Face = () => (
  <div>
    <div className="bg-white text-lg">
      <Hello />
      <p className="mt-6 leading-7 px-4">
        I am a freelance software developer helping companies develop their
        mobile apps. I work on both ends of the spectrum, writing native code
        for iOS and Android. Seriously, I do both iOS and Android at the same
        time!{' '}
        <a
          className="underline text-blue-500 font-normal hover:text-blue-700"
          href="mailto:luis.ramos@hey.com"
        >
          > Get in touch!
        </a>
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

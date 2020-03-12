import React from 'react'

import eu from '../images/eu.jpeg'

const Face = () => (
  <div className="border-b border-gray-200 mb-8 text-center">
    <div className="max-w-sm mx-auto mb-6 p-4 bg-white">
      <img
        className="mx-auto w-20 h-20 rounded-full mb-2"
        src={eu}
        alt="My Face"
      />
      <div className="text-gray-900">
        <h1 className="text-2xl">Olá! I'm Luis</h1>
        <p className="text-lg mt-1">
          I'm a software developer{' '}
          <a
            className="underline text-blue-500 font-normal hover:text-blue-700"
            href="https://github.com/orgmir"
          >
            building
          </a>{' '}
          mobile native apps and{' '}
          <a
            className="underline text-blue-500 font-normal hover:text-blue-700"
            href="https://www.luisramos.dev/blog"
          >
            writing
          </a>{' '}
          about what I learn.
        </p>
      </div>
    </div>
  </div>
)

export default Face

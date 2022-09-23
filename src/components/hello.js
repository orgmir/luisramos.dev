import React from 'react'

import eu from '../images/EU.png'

const Hello = () => (
  <div className="flex text-gray-900 justify-center items-center text-center">
    <div className="">
      <img className="rounded-full" src={eu} alt="Luis' Face" />
    </div>
    <h1 className="flex-initial text-3xl sm:text-5xl font-bold ml-2 sm:ml-6">
      Olá! I'm Luis
    </h1>
  </div>
)

export default Hello

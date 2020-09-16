import React from 'react'
import { Link } from 'gatsby'

const Post = ({ title, date, html, slug }) => (
  <div className="">
    <h1 className="px-4 mb-4 text-4xl sm:text-5xl text-center font-bold">
      <Link className="hover:underline" to={slug}>
        {title}
      </Link>
    </h1>
    <h2 className="text-center text-gray-700 text-sm mb-8">{date}</h2>
    <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
  </div>
)

export default Post

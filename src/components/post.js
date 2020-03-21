import React from 'react'
import { Link } from 'gatsby'

const Post = ({ title, date, html, slug }) => (
  <div className="">
    <h1 className="px-4 text-3xl text-center font-thin">
      <Link className="hover:underline" to={slug}>
        {title}
      </Link>
    </h1>
    <h2 className="text-center mt-2 text-gray-700 text-sm mb-4">{date}</h2>
    <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
  </div>
)

export default Post

import React from 'react'
import { Link } from 'gatsby'

const Post = ({ title, date, html, slug }) => (
  <div className="">
    <h1 className="text-3xl text-center">
      <Link to={slug}>{title}</Link>
    </h1>
    <h2>{date}</h2>
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
)

export default Post

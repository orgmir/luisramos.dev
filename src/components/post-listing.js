import React from 'react'
import { Link } from 'gatsby'

const PostListing = ({ title, date, slug }) => (
  <li className="pr-4 pl-3 py-3 text-lg first:mt-2 leading-none hover:bg-orange-100 border-l-4 border-transparent hover:border-orange-300 radius">
    <Link to={slug}>
      <h3 className="font-medium pb-1 w-auto">{title}</h3>
      <time className="text-sm text-black text-opacity-50 block w-auto">
        {date}
      </time>
    </Link>
  </li>
)

export default PostListing

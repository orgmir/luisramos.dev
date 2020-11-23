import React from 'react'
import { Link } from 'gatsby'

const NavItem = ({ link, name, selected, index }) => {
  let className = 'block mx-5 text-sm'
  if (index === 0) {
    className += 'inline font-bold text-center sm:text-left mb-6 sm:mb-0'
  } else if (selected) {
    className += 'sm:ml-4 border-b-2 border-orange-500 md:flex-grow-0'
  } else {
    className += 'sm:ml-4 border-b-2 border-transparent hover:border-orange-500'
  }
  return (
    <li
      className={
        index === 0 ? 'w-screen sm:w-auto sm:flex-grow' : 'md:flex-grow-0'
      }
    >
      <Link to={link} className={className}>
        {name}
      </Link>
    </li>
  )
}

const Header = ({ menuLinks, location }) => (
  <header>
    <nav className="border-b border-orange-300 mb-8">
      <ul className="flex flex-wrap justify-center items-center sm:justify-end md:max-w-screen-md md:mx-auto my-6">
        {menuLinks.map(({ name, link }, index) => (
          <NavItem
            name={name}
            link={link}
            selected={
              location.pathname === link || location.pathname === link + '/'
            }
            index={index}
            key={index}
          />
        ))}
      </ul>
    </nav>
  </header>
)

export default Header

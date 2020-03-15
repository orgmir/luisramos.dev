import React from 'react'
import { Link } from 'gatsby'

const NavItem = ({ link, name, selected, index }) => {
  let className = 'block px-4 py-3 my-2 rounded '
  if (index === 0) {
    className +=
      'text-gray-700 hover:text-gray-900 md:flex-grow hidden md:inline'
  } else if (selected) {
    className += 'sm:ml-4 text-gray-900 bg-gray-200 md:flex-grow-0'
  } else {
    className += 'sm:ml-4 text-gray-700 hover:text-gray-900 hover:bg-gray-200'
  }
  return (
    <li className={index === 0 ? 'md:flex-grow' : 'md:flex-grow-0'}>
      <Link to={link} className={className}>
        {name}
      </Link>
    </li>
  )
}

const Header = ({ menuLinks, location }) => (
  <header>
    <nav>
      <ul className="flex justify-center items-center sm:justify-end py-4 md:max-w-screen-md md:mx-auto">
        {/* <li className="px-4 sm:mr-4 py-3 my-2 md:flex-grow hidden md:inline">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Luis Ramos
            </Link>
          </li> */}
        {menuLinks.map(({ name, link }, index) => (
          <NavItem
            name={name}
            link={link}
            selected={location.pathname === link}
            index={index}
            key={index}
          />
        ))}
      </ul>
    </nav>
  </header>
)

export default Header

import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
      <Link to='/'>
        <span>Landing</span>
      </Link>
      <Link to='/videogames'>
        <span>Home</span>
      </Link>
      <Link to='/videogames/create'>
        <span>Create Product</span>
      </Link>
    </div>
  )
}

export default NavBar
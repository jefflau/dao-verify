import React from 'react'
import { Link } from 'react-router'

export default () => {
  return (
    <header>
      <h1><Link to="/">Site Title</Link></h1>
      <ul>
        <li><Link to="/add-link">Add Link</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </header>
  )
}

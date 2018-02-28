// Module imports
import React from 'react'





// Component imports
import { Link } from '../routes'
import Nav from './Nav'





export default (props) => (
  <header role="banner">
    <Link href="/">
      <a><div className="brand" /></a>
    </Link>

    <Nav path={props.path} />
  </header>
)

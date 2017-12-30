// Module imports
import Link from 'next/link'
import React from 'react'





// Module imports
import Nav from './Nav'





export default (props) => (
  <header role="banner">
    <Link href="/">
      <a><div className="brand" /></a>
    </Link>

    <Nav path={props.path} />
  </header>
)

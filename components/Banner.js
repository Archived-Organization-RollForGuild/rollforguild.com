// Module imports
import React from 'react'





// Component imports
import { Link } from '../routes'
import Nav from './Nav'





export default (props) => (
  <React.Fragment>
    <input
      hidden
      id="application-banner-control"
      type="checkbox" />

    <header role="banner">
      <label
        className="button success"
        data-openNav
        htmlFor="application-banner-control">
        <i className="fas fa-fw fa-bars" />
      </label>

      <label
        className="button secondary"
        data-closeNav
        htmlFor="application-banner-control">
        <i className="fas fa-fw fa-times" />
      </label>

      <Link href="/">
        <a><div className="brand" /></a>
      </Link>

      <Nav path={props.path} />
    </header>
  </React.Fragment>
)

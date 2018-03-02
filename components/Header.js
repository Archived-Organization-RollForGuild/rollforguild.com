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

    <footer>
      <nav className="social">
        <a href="//twitter.com/RollForGuild">
          <i
            aria-label="Twitter Icon"
            role="img"
            className="fab fa-fw fa-twitter" />
        </a>

        <a href="//instagram.com/RollForGuild">
          <i
            aria-label="Instagram Icon"
            role="img"
            className="fab fa-fw fa-instagram" />
        </a>

        <a href="//facebook.com/RollForGuild">
          <i
            aria-label="Facebook Icon"
            role="img"
            className="fab fa-fw fa-facebook" />
        </a>
      </nav>
    </footer>
  </header>
)

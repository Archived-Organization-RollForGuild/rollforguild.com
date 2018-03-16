// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
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
        data-opennav
        htmlFor="application-banner-control">
        <FontAwesomeIcon icon="bars" fixedWidth />
        Menu
      </label>

      <label
        className="button secondary"
        data-closenav
        htmlFor="application-banner-control">
        <FontAwesomeIcon icon="times" fixedWidth />
        Close
      </label>

      <Link href="/">
        <a><div className="brand" /></a>
      </Link>

      <Nav path={props.path} />

      <footer>
        <small>
          Questions, comments, or concerns? <a href="//rollforguild.atlassian.net/servicedesk/customer/portal/1" rel="noopener noreferrer" target="_blank">Let us know!</a>
        </small>

        <nav className="social">
          <a href="//twitter.com/RollForGuild">
            <FontAwesomeIcon icon={['fab', 'twitter']} fixedWidth />
          </a>

          <a href="//instagram.com/RollForGuild">
            <FontAwesomeIcon icon={['fab', 'instagram']} fixedWidth />
          </a>

          <a href="//facebook.com/RollForGuild">
            <FontAwesomeIcon icon={['fab', 'facebook']} fixedWidth />
          </a>
        </nav>
      </footer>
    </header>
  </React.Fragment>
)

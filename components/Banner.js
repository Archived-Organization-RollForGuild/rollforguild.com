// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'




// Component imports
import Link from './Link'
import Nav from './Nav'





//Component Constants
const isDevOrStaging = preval`module.exports = process.env.NODE_ENV !== 'production' || process.env.CIRCLE_BRANCH === 'develop'`
const buildCommitHash = preval`module.exports = process.env.CIRCLE_SHA1 ? process.env.CIRCLE_SHA1.slice(0,10) : 'DEVELOPMENT'`
const buildUrl = preval`module.exports = process.env.CIRCLE_COMPARE_URL || process.env.CIRCLE_REPOSITORY_URL || process.env.RFG_REPOSITORY_URL`




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

      <Link
        category="Navigation"
        route="/"
        label="Brand">
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
        {isDevOrStaging && (
          <small><a href={buildUrl} rel="noopener noreferrer" target="_blank">{buildCommitHash}</a></small>
        )}
      </footer>
    </header>
  </React.Fragment>
)

// Module imports
import getConfig from 'next/config'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'




// Component imports
import Link from './Link'
import Nav from './Nav'





//Component Constants
const { publicRuntimeConfig } = getConfig()
const { buildUrl } = publicRuntimeConfig.git
const isDevOrStaging = publicRuntimeConfig.environment !== 'production'
const buildCommitHash = publicRuntimeConfig.git.hash




export default (props) => (
  <header role="banner">
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
)

// Module imports
import getConfig from 'next/config'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { activateZenDesk } from '../helpers'
import Button from './Button'
import Link from './Link'
import Nav from './Nav'





//Component Constants
const { publicRuntimeConfig } = getConfig()
const { buildUrl } = publicRuntimeConfig.git
const isDevOrStaging = publicRuntimeConfig.environment !== 'production'
const buildCommitHash = publicRuntimeConfig.git.hash





const Banner = (props) => (
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
        Questions, comments, or concerns? <Button category="Navigation" className="inline link" label="Support" onClick={activateZenDesk}>Let us know!</Button>
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





export default Banner

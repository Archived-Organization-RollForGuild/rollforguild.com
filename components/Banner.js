// Module imports
import getConfig from 'next/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <nav className="support">
        <ul>
          <li>
            <Button
              category="Navigation"
              className="inline link"
              label="Terms and Conditions"
              onClick={activateZenDesk}>
              <FontAwesomeIcon icon="question-circle" fixedWidth />
              Help &amp; Support
            </Button>
          </li>

          <li>
            <Link
              action="view"
              category="Footer"
              label="Terms and Conditions"
              route="terms and conditions">
              <a>
                <FontAwesomeIcon icon="book" fixedWidth />
                Terms &amp; Conditions
              </a>
            </Link>
          </li>

          <li>
            <Link
              action="view"
              category="Footer"
              label="Privacy Policy"
              route="privacy policy">
              <a>
                <FontAwesomeIcon icon="user-secret" fixedWidth />
                Privacy Policy
              </a>
            </Link>
          </li>

          {isDevOrStaging && (
            <li>
              <a
                href={buildUrl}
                rel="noopener noreferrer"
                target="_blank">
                <FontAwesomeIcon icon="code-branch" fixedWidth />
                {buildCommitHash}
              </a>
            </li>
          )}
        </ul>
      </nav>

      <nav className="social">
        <ul className="inline">
          <li>
            <a href="//twitter.com/RollForGuild">
              <FontAwesomeIcon
                fixedWidth
                icon={['fab', 'twitter']}
                title="Roll For Guild on Twitter" />
            </a>
          </li>

          <li>
            <a href="//instagram.com/RollForGuild">
              <FontAwesomeIcon
                fixedWidth
                icon={['fab', 'instagram']}
                title="Roll For Guild on Instagram" />
            </a>
          </li>

          <li>
            <a href="//facebook.com/RollForGuild">
              <FontAwesomeIcon
                fixedWidth
                icon={['fab', 'facebook']}
                title="Roll For Guild on Facebook" />
            </a>
          </li>

          {/* Tumblr

          Twitch */}

          <li>
            <a href="//kickstarter.com/projects/589540064/roll-for-guild">
              <FontAwesomeIcon
                fixedWidth
                icon={['fab', 'kickstarter']}
                title="Roll For Guild on Kickstarter" />
            </a>
          </li>

          <li>
            <a href="//youtube.com/channel/UCW9fAESWXx9z5nqspxS_DXw">
              <FontAwesomeIcon
                fixedWidth
                icon={['fab', 'youtube']}
                title="Roll For Guild on YouTube" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  </header>
)





export default Banner

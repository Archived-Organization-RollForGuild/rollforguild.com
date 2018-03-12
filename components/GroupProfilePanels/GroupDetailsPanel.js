// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { Link } from '../../routes'
import { convertObjectToQueryParams } from '../../helpers'
import ShareableLink from '../ShareableLink'





const GroupDetailsPanel = ({ group }) => {
  const { description, name, slug } = group.attributes
  const permalink = `https://rfg.group/${slug}`

  const twitterShareParams = {
    // hashtags: 'lfg,rfg',
    related: 'RollForGuild',
    text: encodeURIComponent(`Come join my group, ${name}!`),
    url: encodeURIComponent(permalink),
    via: 'RollForGuild',
  }

  return (
    <React.Fragment>
      <section className="description">
        <h4>Description</h4>

        <div className="section-content">
          <p>{description || 'No description.'}</p>
        </div>
      </section>

      <section className="sharing">
        <h4>Sharing</h4>
        <div className="section-content">
          <div className="input-group">
            <div className="input-group">
              <Link href={`//twitter.com/intent/tweet${convertObjectToQueryParams(twitterShareParams)}`}>
                <a className="button secondary">
                  <FontAwesomeIcon icon={['fab', 'twitter']} fixedWidth />
                </a>
              </Link>
            </div>

            <ShareableLink link={permalink} />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}





export default GroupDetailsPanel

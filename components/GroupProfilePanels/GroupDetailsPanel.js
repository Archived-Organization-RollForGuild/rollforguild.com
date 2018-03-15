// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { Link } from '../../routes'
import { convertObjectToQueryParams } from '../../helpers'
import Component from '../Component'
import ShareableLink from '../ShareableLink'





class GroupDetailsPanel extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  // _showFacebookDialog () {
  //   window.FB.ui({
  //     method: 'share',
  //     // href: `https://rollforguild.com/groups/${this.props.group.attributes.slug}`,
  //     href: 'https://rollforguild.com/',
  //   })
  //   console.log('success?', this)
  // }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const { group } = this.props
    const { description, name } = group.attributes

    const emailShareParams = {
      body: encodeURIComponent(`Hey friend,\n\nCome join my group, ${name}, on Roll For Guild!\n\n${this.permalink}`),
      subject: encodeURIComponent(`Come join my group, ${name}, on Roll For Guild!`),
    }

    const twitterShareParams = {
      related: 'RollForGuild',
      text: encodeURIComponent(`Come join my group, ${name}, on @RollForGuild!`),
      url: encodeURIComponent(this.permalink),
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

                <a
                  className="button secondary"
                  href={`mailto:${convertObjectToQueryParams(emailShareParams)}`}>
                  <FontAwesomeIcon icon="envelope" fixedWidth />
                </a>

                {/* <button
                  className="secondary"
                  onClick={this._showFacebookDialog}>
                  <FontAwesomeIcon icon={['fab', 'facebook']} fixedWidth />
                </button> */}
              </div>

              <ShareableLink link={this.permalink} />
            </div>
          </div>
        </section>
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get permalink () {
    return `https://rfg.group/${this.props.group.attributes.slug}`
  }
}





export default GroupDetailsPanel

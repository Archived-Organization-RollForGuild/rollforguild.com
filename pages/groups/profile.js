// Module imports

import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import Avatar from '../../components/Avatar'
import connect from '../../helpers/connect'
import GroupDetailsPanel from '../../components/Groups/GroupDetailsPanel'
import Main from '../../components/Main'

import GroupHeader from '../../components/Groups/GroupHeader'
import GroupPage from '../../components/Groups/GroupPage'
import StaticMap from '../../components/StaticMap'





// Component constants
const title = 'Group Profile'





class GroupProfile extends GroupPage {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  renderPage = () => {
    const {
      currentUserId,
      group,
    } = this.props

    const {
      address,
      currentUserIsMember,
      geo,
      name,
    } = group.attributes

    return (
      <React.Fragment>
        <GroupHeader
          currentUserId={currentUserId}
          currentPage="details"
          group={group}
          title={name} />

        <Main title={title}>
          <div className="profile">
            <header>
              <Avatar src={group} />

              {(currentUserIsMember && geo) && (
                <section className="location">
                  <h4>Location</h4>
                  <StaticMap
                    address={address}
                    category="Groups"
                    location={geo}
                    markers={[{ ...geo }]} />
                </section>
              )}
            </header>
            <GroupDetailsPanel group={group} />
          </div>
        </Main>
      </React.Fragment>
    )
  }
}





export default connect(GroupProfile)

// Module imports
import React from 'react'





// Component imports
import connect from '../../helpers/connect'
import GroupSettingsPanel from '../../components/Groups/GroupSettingsPanel'
import GroupHeader from '../../components/Groups/GroupHeader'
import GroupPage from '../../components/Groups/GroupPage'
import Main from '../../components/Main'





// Component constants
const title = 'Group Profile'





class GroupEvents extends GroupPage {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  renderPage = () => {
    const {
      currentUserId,
      group,
      slug,
    } = this.props

    return (
      <React.Fragment>
        <GroupHeader
          currentPage="settings"
          currentUserId={currentUserId}
          group={group}
          slug={slug}
          title={title} />
        <Main title={title}>
          <div className="profile">
            <GroupSettingsPanel group={group} />
          </div>
        </Main>
      </React.Fragment>
    )
  }
}





export default connect(GroupEvents)

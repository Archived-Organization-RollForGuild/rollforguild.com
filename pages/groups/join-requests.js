// Module imports
import React from 'react'





// Component imports
import connect from '../../helpers/connect'
import GroupHeader from '../../components/Groups/GroupHeader'
import GroupPage from '../../components/Groups/GroupPage'
import Main from '../../components/Main'
import JoinRequestCard from '../../components/groups/GroupJoinRequestCard'




// Component constants
const title = 'Group Profile'





class GroupJoinRequests extends GroupPage {
  /***************************************************************************\
    Class Properties
  \***************************************************************************/

  state = {
    joinRequests: [],
    gettingJoinRequests: true,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _acceptJoinRequest = async (userId) => {
    await this._handleJoinRequest(userId, 'accepted')
  }

  _handleJoinRequest = async (userId, status) => {
    const {
      group,
      handleJoinRequest,
    } = this.props

    await handleJoinRequest(group.id, userId, status)

    window.location.reload()
  }

  _ignoreJoinRequest = async (userId) => {
    await this._handleJoinRequest(userId, 'ignored')
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount = async () => {
    const {
      getJoinRequests,
      id,
    } = this.props
    const { group } = this.props
    let joinRequests = []

    if (!group) {
      this.setState({
        gettingJoinRequests: false,
      })
      return
    }

    if (group && group.attributes && group.attributes.currentUserIsAdmin) {
      const { payload } = await getJoinRequests(id)
      joinRequests = (payload && payload.data) ? payload.data : []
    }

    this.setState({
      gettingJoinRequests: false,
      joinRequests,
    })
  }

  renderPage = () => {
    const {
      currentUserId,
      group,
      slug,
    } = this.props
    const {
      gettingJoinRequests,
      joinRequests,
    } = this.state

    return (
      <React.Fragment>
        <GroupHeader
          currentUserId={currentUserId}
          currentPage="join-requests"
          group={group}
          slug={slug}
          title={title} />
        <Main title={title}>
          <div className="profile join-requests">
            {gettingJoinRequests && (
              <p>Loading...</p>
            )}

            {(!gettingJoinRequests && !joinRequests.length) && (
              <p>No requests found.</p>
            )}

            {(!gettingJoinRequests && !!joinRequests.length) && (
              <ul>
                {joinRequests.map(user => (
                  <li key={user.id}>
                    <JoinRequestCard
                      accept={this._acceptJoinRequest}
                      ignore={this._ignoreJoinRequest}
                      user={user} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Main>
      </React.Fragment>
    )
  }
}





export default connect(GroupJoinRequests)

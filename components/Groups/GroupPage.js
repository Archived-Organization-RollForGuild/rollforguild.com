// Module imports
import React from 'react'





// Component imports
import { actions } from '../../store'
import Component from '../Component'
import convertSlugToUUID from '../../helpers/convertSlugToUUID'
import isUUID from '../../helpers/isUUID'
import Main from '../../components/Main'
import PageHeader from '../../components/PageHeader'




// Component constants
const title = 'Group Profile'





class GroupPage extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  static async getInitialProps ({ query, store }) {
    let { id } = query
    const state = store.getState()

    if (!isUUID(id)) {
      id = convertSlugToUUID(id, 'groups')
    }

    if (!state.groups[id]) {
      await actions.getGroup(id)(store.dispatch)
    }

    return {}
  }


  renderPage = () => (
    <React.Fragment>
      <PageHeader>
        <h1>{title}</h1>
      </PageHeader>

      <Main title={title}>
        <p>Invalid Page</p>
      </Main>
    </React.Fragment>
  )


  render () {
    const {
      group,
    } = this.props

    if (!group) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>{title}</h1>
          </PageHeader>

          <Main title={title}>
            <p>No group with that ID was found.</p>
          </Main>
        </React.Fragment>
      )
    }

    return this.renderPage()
  }



  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = [
    'getGroup',
    'getGroupEvents',
    'getJoinRequests',
    'handleJoinRequest',
    'removeGroupMember',
    'requestToJoinGroup',
  ]

  static mapStateToProps = (state, ownProps) => {
    let { id } = ownProps.query
    let members = []

    if (!isUUID(id)) {
      id = convertSlugToUUID(id, 'groups')
    }

    const group = state.groups[id] || null

    if (group) {
      if (group.relationships && group.attributes.currentUserIsMember) {
        members = group.relationships.group_members.data.map(member => state.users[member.id])
      }
    }

    return {
      group,
      id,
      members,
      currentUserId: state.authentication.userId || null,
    }
  }
}

export default GroupPage

// Module imports
import React from 'react'





// Component imports
import connect from '../../helpers/connect'
import GroupEventsPanel from '../../components/Groups/GroupEventsPanel'
import GroupHeader from '../../components/Groups/GroupHeader'
import GroupPage from '../../components/Groups/GroupPage'
import Main from '../../components/Main'





// Component constants
const title = 'Group Profile'





class GroupEvents extends GroupPage {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    eventData: {
      loaded: false,
      page: 1,
      totalPages: 1,
    },
    loaded: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _loadEvents = async (newPage) => {
    const {
      getGroupEvents,
      group,
    } = this.props

    const {
      eventData: {
        page: oldPage,
        loaded,
      },
    } = this.state

    if (loaded && oldPage === newPage) {
      return
    }

    const { payload, status } = await getGroupEvents(group.id, newPage)

    if (status === 'success') {
      this.setState({
        eventData: {
          ...this.state.eventData,
          loaded: true,
          page: newPage,
          totalPages: Math.ceil(payload.meta.total / payload.meta.limit),
        },
      })
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    this._loadEvents(this.props.query.page)
  }

  renderPage = () => {
    const {
      currentUserId,
      group,
      slug,
    } = this.props
    const {
      eventData,
    } = this.state

    return (
      <React.Fragment>
        <GroupHeader
          currentUserId={currentUserId}
          currentPage="events"
          group={group}
          slug={slug}
          title={title} />
        <Main title={title}>
          <div className="profile">
            <GroupEventsPanel
              {...eventData}
              onPageChange={this._loadEvents}
              group={group} />
          </div>
        </Main>
      </React.Fragment>
    )
  }
}





export default connect(GroupEvents)

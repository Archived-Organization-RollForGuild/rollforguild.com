// Module Imports
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'





// Component Imports
import Button from '../Button'
import Component from '../Component'
import GroupEventCard from './GroupEventCard'
import GroupEventCreateDialog from './GroupEventCreateDialog'
import Pagination from '../Pagination'





class GroupEventsPanel extends Component {
  componentDidMount () {
    const {
      loaded,
      page,
      onPageChange,
    } = this.props

    if (!loaded) {
      onPageChange(page)
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      showNewEventModal: false,
    }
  }

  render () {
    const {
      currentUserIsAdmin,
      events,
      group,
      loaded,
      onPageChange,
      page,
      totalPages,
    } = this.props

    const {
      showNewEventModal,
    } = this.state

    return (
      <React.Fragment>
        <section className="events">
          {!loaded && (
            <p>Loading...</p>
          )}

          {(loaded && currentUserIsAdmin) && (
            <menu type="toolbar">
              <div className="primary">
                <Button
                  action="show-create-dialog"
                  category="Groups"
                  className="button compact success"
                  label="events"
                  onClick={() => this.setState({ showNewEventModal: true })} >
                  New Event
                </Button>
              </div>
            </menu>
          )}

          {(loaded && !events.length) && (
            <p>No upcoming events... <span role="img" aria-label="sad face emoji">☹️</span></p>
          )}

          {Boolean(loaded && events.length) && (
            <ul className="card-list">
              {events.map(event => (
                <GroupEventCard
                  currentUserIsAdmin={currentUserIsAdmin}
                  event={event}
                  groupId={group.id}
                  key={event.id} />
              ))}
            </ul>
          )}

          {console.log('totalPages', totalPages)}
          {console.log('page', page)}
          {loaded && (
            <Pagination
              category="Groups"
              currentPage={page}
              label="events"
              onPageChange={onPageChange}
              showPageLinks
              totalPageCount={totalPages} />
          )}
        </section>

        {showNewEventModal && (
          <GroupEventCreateDialog
            group={group}
            onClose={() => this.setState({ showNewEventModal: false })} />
        )}

      </React.Fragment>
    )
  }
}

GroupEventsPanel.defaultProps = {
  currentUserIsAdmin: false,
  events: [],
  loaded: false,
}

GroupEventsPanel.propTypes = {
  currentUserIsAdmin: PropTypes.bool,
  events: PropTypes.array,
  group: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
}





const mapStateToProps = (state, ownProps) => {
  const { loaded } = ownProps

  if (!loaded) {
    return {
      events: [],
    }
  }

  return {
    events: Object.values(state.events),
  }
}



export default connect(mapStateToProps, null)(GroupEventsPanel)

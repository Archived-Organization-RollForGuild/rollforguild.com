// Module Imports
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import PropTypes from 'prop-types'





// Component Imports
import { actions } from '../../store'
import { formatGameString } from '../../helpers'
import Button from '../Button'
import Component from '../Component'
import Markdown from '../Markdown'
import GroupEventEditDialog from './GroupEventEditDialog'




class GroupEventCard extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleEventDelete () {
    const {
      deleteGroupEvent,
      event,
      groupId,
    } = this.props

    this.setState({ removing: true })

    deleteGroupEvent(groupId, event.id)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      event,
      getGroupEventGames,
      groupId,
    } = this.props

    const { payload, status } = await getGroupEventGames(groupId, event.id)

    let game = null

    if (status === 'success' && payload.data.length) {
      [game] = payload.data
    }

    this.setState({
      game,
      gameLoaded: true,
    })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleEventDelete',
    ])

    this.state = {
      game: null,
      gameLoaded: false,
      removing: false,
      showEditModal: false,
    }
  }


  render () {
    const {
      game,
      gameLoaded,
      removing,
      showEditModal,
    } = this.state

    const {
      currentUserIsAdmin,
      event,
      groupId,
    } = this.props

    const {
      title,
      description,
      location,
    } = event.attributes

    return (
      <React.Fragment>
        <li
          className="card"
          key={event.id}>
          <header className="space-content">
            <h2>{title}</h2>
            {this.formattedEventTime}
          </header>

          <div className="meta">
            {Boolean(gameLoaded && game) && (
              <small>
                Playing&nbsp;
                {formatGameString(game)}
              </small>
            )}

            <small>
              {location}
            </small>
          </div>

          <div className="content">
            {Boolean(description) && (
              <Markdown input={description} />
            )}

            {!description && (
              <em>No description available</em>
            )}
          </div>

          {currentUserIsAdmin && (
            <footer>
              <menu
                className="compact"
                type="toolbar" >
                <div className="secondary">
                  <Button
                    action="edit"
                    category="Groups"
                    className="compact success"
                    label="events"
                    onClick={() => this.setState({ showEditModal: true })}>
                    Edit
                  </Button>
                </div>
                <div className="primary">
                  <Button
                    action="delete"
                    category="Groups"
                    className="compact danger"
                    label="events"
                    onClick={this._handleDeleteEvent}>
                    {!removing && 'Delete'}

                    {removing && (
                      <span><FontAwesomeIcon icon="spinner" pulse /> Removing...</span>
                    )}
                  </Button>
                </div>
              </menu>
            </footer>
          )}
        </li>

        {showEditModal && (
          <GroupEventEditDialog
            event={event}
            game={game}
            groupId={groupId}
            onClose={() => this.setState({ showEditModal: false })} />
        )}
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Getter Methods
  \***************************************************************************/

  get formattedEventTime () {
    const {
      start_time: startTime,
      end_time: endTime,
    } = this.props.event.attributes

    const startMoment = moment.utc(startTime).local()
    const endMoment = moment.utc(endTime).local()


    const startTimeString = startMoment.format('DD MMM YYYY HH:mm')
    const endTimeString = endMoment.format(`${endMoment.isSame(startMoment, 'day') ? '' : 'DD MMM YYYY '}HH:mm`)

    return (<h4>{startTimeString} - {endTimeString}</h4>)
  }
}


GroupEventCard.defaultProps = {
  currentUserIsAdmin: false,
}


GroupEventCard.propTypes = {
  currentUserIsAdmin: PropTypes.bool,
  event: PropTypes.object.isRequired,
  groupId: PropTypes.string.isRequired,
}



const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupEventGames: actions.getGroupEventGames,
  deleteGroupEvent: actions.deleteGroupEvent,
}, dispatch)


export default connect(null, mapDispatchToProps)(GroupEventCard)

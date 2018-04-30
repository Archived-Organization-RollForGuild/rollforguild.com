// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'




// Component imports
import { actions } from '../../store'
import AddressInput from '../AddressInput'
import Button from '../Button'
import Component from '../Component'
import DateTimePicker from '../DateTimePicker'
import Dialog from '../Dialog'
import Form from '../Form'
import GameInput from '../GameInput'
import ValidatedInput from '../ValidatedInput'



class GroupEventEditDialog extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange ({ target }) {
    const {
      name,
      validity,
      value,
    } = target

    this._setChanges(name, value, validity.valid)
  }

  async _handleSubmit () {
    const {
      event,
      groupId,
      updateGroupEvent,
      onClose,
    } = this.props

    this.setState({ submitting: true })

    const {
      startTime,
      endTime,
      game,
      location,
      ...values
    } = this.state.changes

    await updateGroupEvent(groupId, event.id, {
      ...values,
      start_time: startTime ? startTime.toISOString() : undefined,
      end_time: endTime ? endTime.toISOString() : undefined,
      games: game ? [game.id] : undefined,
      location: location ? location.formatted_address : undefined,
    })

    if (onClose) {
      onClose()
    }
  }

  _isValid () {
    const {
      validity,
    } = this.state
    return !Object.values(validity).includes(false)
  }

  _setChanges (key, value, isValid = true) {
    const {
      event,
    } = this.props

    const {
      changes,
      validity,
    } = this.state

    if (typeof validity[key] !== 'undefined') {
      this.setState({
        changes: {
          ...changes,
          [key]: value === event.attributes[key] ? undefined : value,
        },
        validity: {
          ...validity,
          [key]: isValid,
        },
      })
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_handleSubmit',
      '_isValid',
      '_setChanges',
    ])

    this.state = {
      submitting: false,
      changes: {},
      validity: {
        startTime: true,
        endTime: true,
        description: true,
        game: true,
        location: true,
        title: true,
      },
    }
  }

  render () {
    const {
      onClose,
      event,
      game: currentGame,
    } = this.props

    const {
      changes,
      submitting,
    } = this.state

    const description = typeof changes.description === 'string' ? changes.description : event.attributes.description
    const endTime = typeof changes.endTime === 'object' ? changes.endTime : new Date(event.attributes.end_time)
    const game = typeof changes.game === 'object' ? changes.game : (currentGame || '')
    const location = typeof changes.location === 'object' ? changes.location : event.attributes.location
    const startTime = typeof changes.startTime === 'object' ? changes.startTime : new Date(event.attributes.start_time)
    const title = typeof changes.title === 'string' ? changes.title : event.attributes.title

    return (
      <Dialog
        className="event-create-dialog"
        controls={this.controls}
        modal
        onClose={onClose}
        title="Edit Event">
        <Form
          action="create"
          category="Groups"
          label="Event"
          onSubmit={this._handleSubmit}>
          <fieldset>
            <label htmlFor="name">
              Event title
            </label>

            <ValidatedInput
              disabled={submitting}
              id="title"
              name="title"
              onChange={this._handleChange}
              placeholder="e.g. Game Time at Quigley's"
              required
              type="text"
              value={title} />
          </fieldset>

          <fieldset>
            <label htmlFor="description">
              Event description
            </label>

            <textarea
              aria-describedby="description"
              disabled={submitting}
              id="description"
              maxLength={1000}
              name="description"
              onChange={this._handleChange}
              placeholder="Additional details of your event."
              value={description} />
          </fieldset>

          <fieldset>
            <label htmlFor="startTime">
              When will this event start?
            </label>
            <DateTimePicker
              disabled={submitting}
              id="startTime"
              value={startTime}
              onDateChange={newDate => (newDate ? this._setChanges('startTime', newDate) : this._setChanges('startTime', null, false))} />
          </fieldset>

          <fieldset>
            <label htmlFor="endTime">
              When will it end?
            </label>
            <DateTimePicker
              disabled={submitting}
              id="endTime"
              value={endTime}
              onDateChange={newDate => (newDate ? this._setChanges('endTime', newDate) : this._setChanges('endTime', null, false))} />
          </fieldset>

          <fieldset>
            <label htmlFor="game">
              What will you be playing?
            </label>

            <GameInput
              disabled={submitting}
              id="game"
              name="game"
              onChange={value => this._setChanges('game', value)}
              value={game} />
          </fieldset>

          <fieldset>
            <label htmlFor="location">
              Where is this event taking place? (Leave empty for online events)
            </label>

            <AddressInput
              disabled={submitting}
              id="location"
              name="location"
              onChange={value => this._setChanges('location', value)}
              value={location} />
          </fieldset>
        </Form>
      </Dialog>
    )
  }



  get controls () {
    const {
      submitting,
    } = this.state

    return {
      primary: [
        (
          <Button
            action="create"
            category="Groups"
            className="success"
            disabled={submitting || !this._isValid()}
            label="Events"
            onClick={this._handleSubmit}
            type="button">
            {!submitting && 'Save'}

            {submitting && (
              <span><FontAwesomeIcon icon="spinner" pulse /> Submitting...</span>
            )}
          </Button>
        ),
      ],
      secondary: [],
    }
  }
}

GroupEventEditDialog.defaultProps = {
  onClose: null,
  game: null,
}

GroupEventEditDialog.propTypes = {
  updateGroupEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  game: PropTypes.object,
  groupId: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}





const mapDispatchToProps = dispatch => bindActionCreators({
  updateGroupEvent: actions.updateGroupEvent,
}, dispatch)





export default connect(null, mapDispatchToProps)(GroupEventEditDialog)

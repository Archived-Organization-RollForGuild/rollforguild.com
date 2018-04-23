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
import DialogWrapper from '../DialogWrapper'
import Form from '../Form'
import GameInput from '../GameInput'
import ValidatedInput from '../ValidatedInput'



class GroupEventCreateDialog extends Component {
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
      group,
      createGroupEvent,
      onComplete,
    } = this.props

    this.setState({ submitting: true })

    const {
      startTime,
      endTime,
      game,
      ...values
    } = this.state.values

    await createGroupEvent(group.id, {
      ...values,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      games_id: game ? game.id : null,
    })

    if (onComplete) {
      onComplete()
    }
  }

  _isValid () {
    const {
      changes,
      validity,
    } = this.state

    return Object.keys(changes).length && !Object.values(validity).includes(false)
  }

  _setChanges (key, value, isValid = true) {
    const {
      values,
      validity,
    } = this.state

    if (values[key]) {
      this.setState({
        values: {
          ...values,
          [key]: value,
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
      '_handleAddressChange',
      '_handleChange',
      '_handleDiscoverabilityChange',
      '_handleSlugChange',
      '_handleSubmit',
    ])

    this.state = {
      changes: {},
      submitting: false,
      values: {
        startTime: new Date(),
        endTime: new Date(),
        description: '',
        game: null,
        location: null,
        title: '',
      },
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
      submitting,
    } = this.state

    const {
      description,
      endTime,
      game,
      location,
      startTime,
      title,
    } = this.state.values

    return (
      <DialogWrapper
        className="event-create-dialog"
        visible={this.props.visible} >
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
              onChange={value => this._setChanges('location', value.formatted_address)}
              value={location} />
          </fieldset>

          <menu type="toolbar">
            <div className="primary">
              <Button
                action="create"
                category="Groups"
                className="success"
                disabled={submitting || !this._isValid()}
                label="Events"
                type="button">
                {!submitting && 'Create'}

                {submitting && (
                  <span><FontAwesomeIcon icon="spinner" pulse /> Saving...</span>
                )}
              </Button>
            </div>
          </menu>
        </Form>
      </DialogWrapper>
    )
  }
}

GroupEventCreateDialog.defaultProps = {
  onComplete: null,
}

GroupEventCreateDialog.propTypes = {
  createGroupEvent: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  onComplete: PropTypes.func,
}





const mapDispatchToProps = dispatch => bindActionCreators({
  createGroupEvent: actions.createGroupEvent,
}, dispatch)





export default connect(null, mapDispatchToProps)(GroupEventCreateDialog)

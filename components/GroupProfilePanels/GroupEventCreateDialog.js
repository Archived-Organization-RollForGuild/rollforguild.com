// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
// import PropTypes from 'prop-types'
import React from 'react'




// Component imports
import { actions } from '../../store'
import AddressInput from '../AddressInput'
import Form from '../Form'
import Component from '../Component'
import ValidatedInput from '../ValidatedInput'
import DialogWrapper from '../DialogWrapper'
import Button from '../Button'




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

  _handleLocationChange (value) {
    this._setChanges('location', value.formatted_address)
  }

  async _handleSubmit () {
    const {
      group,
      createGroupEvent,
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
  }

  _isValid () {
    const {
      changes,
      validity,
    } = this.state

    return Object.keys(changes).length && !Object.values(validity).includes(false)
  }

  _setChanges (key, value, isValid = true) {
    const { group } = this.props
    const {
      changes,
      validity,
    } = this.state
    const newChanges = { ...changes }

    if (value === group.attributes[key]) {
      delete newChanges[key]
    } else {
      newChanges[key] = value
    }

    this.setState({
      changes: newChanges,
      validity: {
        ...validity,
        [key]: isValid,
      },
    })
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
        dateTime: '',
        description: '',
        game: null,
        location: null,
        title: '',
      },
      validity: {
        dateTime: true,
        description: true,
        games_id: true,
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
      startTime,
      endTime,
      description,
      game,
      location,
      title,
    } = this.state.values

    return (
      <DialogWrapper
        className="event-create-dialog"
        visible={this.props.visible}>
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
              When will this event happen?
            </label>

          </fieldset>

          <fieldset>
            <label htmlFor="location">
              Where is this event taking place?
            </label>

            <AddressInput
              disabled={submitting}
              id="location"
              name="location"
              onChange={this._handleAddressChange}
              value={location} />
          </fieldset>

          <menu type="toolbar">
            <div className="primary">
              <Button
                className="success"
                disabled={submitting || !this._isValid()}
                type="button">
                {!submitting && 'Save'}

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

GroupEventCreateDialog.propTypes = {}





const mapDispatchToProps = dispatch => bindActionCreators({
  createGroupEvent: actions.createGroupEvent,
}, dispatch)





export default connect(null, mapDispatchToProps)(GroupEventCreateDialog)

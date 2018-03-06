// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import PropTypes from 'prop-types'
import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import { actions } from '../../store'
import AddressInput from '../AddressInput'
import Component from '../Component'
import convertStringToSlug from '../../helpers/convertStringToSlug'
import ValidatedInput from '../ValidatedInput'





class GroupSettingsPanel extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleAddressChange (value) {
    this._setChanges('address', value.formatted_address)
  }

  _handleChange ({ target }) {
    const {
      name,
      validity,
      value,
    } = target

    this._setChanges(name, value, validity.valid)
  }

  _handleSlugChange (event) {
    this._setChanges('slug', convertStringToSlug(event.target.value))
  }

  async _handleSubmit (event) {
    const {
      group,
      updateGroup,
    } = this.props
    const { changes } = this.state

    event.preventDefault()

    this.setState({ submitting: true })

    await updateGroup(group.id, changes)

    window.location.reload()
  }

  _isValid () {
    const {
      changes,
      validity,
    } = this.state

    return Object.keys(changes) && !Object.values(validity).includes(false)
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
      '_handleSlugChange',
      '_handleSubmit',
    ])

    this.state = {
      changes: {},
      submitting: false,
      validity: {
        address: true,
        description: true,
        discoverable: true,
        name: true,
        slug: true,
      },
    }
  }

  render () {
    const { group } = this.props
    const {
      changes,
      submitting,
    } = this.state

    const address = changes.address || group.attributes.address
    const description = changes.description || group.attributes.description
    // const discoverable = changes.discoverable || group.attributes.discoverable
    const name = changes.name || group.attributes.name
    // const slug = changes.slug || group.attributes.slug

    return (
      <section className="settings">
        <form onSubmit={this._handleSubmit}>
          <fieldset>
            <label htmlFor="name">
              Group name
            </label>

            <ValidatedInput
              data-pattern-explainer="Please make sure to only use letters, numbers, hyphens (-), and underscores (_)"
              disabled={submitting}
              id="name"
              name="name"
              onChange={this._handleChange}
              pattern="[\w\s_-]+"
              placeholder="e.g. Quigley's Tavern"
              required
              type="text"
              value={name} />
          </fieldset>

          {/* <fieldset>
            <label htmlFor="slug">Permalink</label>

            <div className="input-group">
              <label htmlFor="slug">
                https://rollforguild.com/groups/
              </label>

              <input
                disabled={submitting}
                id="slug"
                name="slug"
                onChange={this._handleSlugChange}
                pattern="[\w\s_-]+"
                placeholder={convertStringToSlug(name)}
                type="text"
                value={slug} />
            </div>
          </fieldset> */}

          <fieldset>
            <label htmlFor="description">
              Group description
            </label>

            <textarea
              aria-describedby="description"
              disabled={submitting}
              id="description"
              maxLength={1000}
              name="description"
              onChange={this._handleChange}
              placeholder="Tell your members what you'll be playing, or maybe a bit about your GM style."
              value={description} />

            <small>Tell your members what you'll be playing, or maybe a bit about your GM style.</small>
          </fieldset>

          <fieldset>
            <label htmlFor="address">
              Where will you be playing?
            </label>

            <AddressInput
              disabled={submitting}
              id="address"
              onChange={this._handleAddressChange}
              required
              value={address} />
          </fieldset>

          {/* <fieldset className="horizontal">
            <label htmlFor="discoverable">
              Should your group show up in searches?
            </label>

            <Switch
              disabled={submitting}
              checked={discoverable}
              id="discoverable"
              onChange={isChecked => this.setState({ discoverable: isChecked })} />
          </fieldset> */}

          <menu type="toolbar">
            <div className="primary">
              <button
                className="success"
                disabled={submitting || !this._isValid()}>
                {!submitting && 'Save'}

                {submitting && (
                  <span><i className="fas fa-pulse fa-spinner" /> Saving...</span>
                )}
              </button>
            </div>
          </menu>
        </form>
      </section>
    )
  }
}

GroupSettingsPanel.propTypes = {}





const mapDispatchToProps = dispatch => ({ updateGroup: bindActionCreators(actions.updateGroup, dispatch) })





export default connect(null, mapDispatchToProps)(GroupSettingsPanel)

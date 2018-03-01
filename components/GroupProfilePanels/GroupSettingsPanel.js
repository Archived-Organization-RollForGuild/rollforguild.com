// Module imports
// import PropTypes from 'prop-types'
import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import AddressInput from '../AddressInput'
import Component from '../Component'
import convertStringToSlug from '../../helpers/convertStringToSlug'
import ValidatedInput from '../ValidatedInput'





class GroupSettingsPanel extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange ({ target }) {
    const { validity } = this.state

    this.setState({
      [target.name]: target.value,
      validity: {
        ...validity,
        [target.name]: target.validity.valid,
      },
    })
  }

  _handleSubmit (event) {
    event.preventDefault()

    console.log('Submitting', this.state)
  }

  _isValid () {
    const { validity } = this.state

    return !Object.values(validity).includes(false)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_handleSubmit',
    ])

    this.state = {
      ...props.group.attributes,
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
    const {
      address,
      description,
      // discoverable,
      name,
      slug,
      submitting,
    } = this.state

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

          <fieldset>
            <label htmlFor="slug">Permalink</label>

            <div className="input-group">
              <label htmlFor="slug">
                https://rollforguild.com/groups/
              </label>

              <input
                disabled={submitting}
                id="slug"
                name="slug"
                onChange={({ target }) => this.setState({ slug: convertStringToSlug(target.value) })}
                pattern="[\w\s_-]+"
                placeholder={convertStringToSlug(name)}
                type="text"
                value={slug} />
            </div>
          </fieldset>

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
              onChange={value => this.setState({ address: value })}
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





export default GroupSettingsPanel

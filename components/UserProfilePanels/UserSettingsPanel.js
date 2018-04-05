// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'





// Component imports
import { actions } from '../../store'
import Component from '../Component'
import Form from '../Form'
import ValidatedInput from '../ValidatedInput'
import PasswordInput from '../PasswordInput'





class UserSettingsPanel extends Component {
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

  async _handleSubmit (event) {
    const {
      onSubmit,
      user,
      updateUser,
    } = this.props

    const { changes } = this.state

    event.preventDefault()

    this.setState({
      submitting: true,
      error: null,
    })

    const response = await updateUser(user.id, changes)

    this.setState({
      changes: {},
      submitting: false,
    })

    if (typeof onSubmit === 'function') {
      onSubmit(response, changes)
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
    const { user } = this.props
    const {
      changes,
      validity,
    } = this.state
    const newChanges = { ...changes }

    if (value === (user.attributes[key] || '')) {
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
      '_handleChange',
      '_handleSubmit',
    ])

    this.state = {
      changes: {},
      error: null,
      submitting: false,
      validity: {
        bio: true,
        email: true,
        currentPassword: true,
        password: true,
      },
    }
  }

  render () {
    const { user } = this.props
    const {
      changes,
      error,
      submitting,
    } = this.state

    const bio = typeof changes.bio === 'string' ? changes.bio : user.attributes.bio
    const email = typeof changes.email === 'string' ? changes.email : user.attributes.email
    const currentPassword = typeof changes.currentPassword === 'string' ? changes.currentPassword : ''
    const password = typeof changes.password === 'string' ? changes.password : ''

    return (
      <section className="settings-panel">
        <div className="section-content">

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <Form
            action="update"
            category="Users"
            label="Settings"
            onSubmit={this._handleSubmit}>
            <fieldset>
              <label htmlFor="bio">
                Bio
              </label>

              <textarea
                disabled={submitting}
                id="bio"
                maxLength={1000}
                name="bio"
                onChange={this._handleChange}
                placeholder="Tell others a little about yourself."
                value={bio} />
            </fieldset>

            <fieldset>
              <label htmlFor="email">
                Email
              </label>

              <ValidatedInput
                disabled={submitting}
                id="email"
                name="email"
                onChange={this._handleChange}
                placeholder="Email"
                required
                type="email"
                value={email} />
            </fieldset>

            <fieldset>
              <label>
                Change Password
              </label>

              <PasswordInput
                aria-label="Current Password"
                data-required-explainer="Both password fields are required to change your password."
                disabled={submitting}
                id="currentPassword"
                name="currentPassword"
                onInput={this._handleChange}
                onValidate={this._handleChange}
                placeholder="Current Password"
                required={!!password.length}
                value={currentPassword} />

              <PasswordInput
                aria-label="New Password"
                data-required-explainer="Both password fields are required to change your password."
                disabled={submitting}
                id="password"
                name="password"
                onInput={this._handleChange}
                onValidate={this._handleChange}
                minLength={8}
                placeholder="New Password"
                showStrength
                showSuggestions
                showWarnings
                required={!!currentPassword.length}
                value={password} />
            </fieldset>



            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  disabled={submitting || !this._isValid()}>
                  {!submitting && 'Save'}

                  {submitting && (
                    <span><FontAwesomeIcon icon="spinner" pulse /> Saving...</span>
                  )}
                </button>
              </div>
            </menu>
          </Form>
        </div>
      </section>
    )
  }
}

UserSettingsPanel.defaultProps = {
  onSubmit: null,
}

UserSettingsPanel.propTypes = {
  onSubmit: PropTypes.func,
  user: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
}





const mapDispatchToProps = dispatch => bindActionCreators({
  updateUser: actions.updateUser,
}, dispatch)





export default connect(null, mapDispatchToProps)(UserSettingsPanel)

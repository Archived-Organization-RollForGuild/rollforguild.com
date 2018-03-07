// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'





// Component imports
import { actions } from '../../store'
import Component from '../Component'
// import ValidatedInput from '../ValidatedInput'
import PasswordInput from '../PasswordInput'





class GroupSettingsPanel extends Component {
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
      user,
      updateUser,
      updateUserPassword,
    } = this.props

    const { changes } = this.state

    event.preventDefault()

    this.setState({
      submitting: true,
      error: null,
    })

    if (changes.password && changes.currentPassword) {
      const response = await updateUserPassword(user.id, {
        current_password: changes.currentPassword,
        password: changes.password,
      })

      if (response.status !== 'success') {
        const error = (
          response.payload &&
          response.payload.errors &&
          response.payload.errors[0] &&
          response.payload.errors[0].detail
        ) || 'Error while attempting to change your password.'

        this.setState({
          changes: {
            ...changes,
            currentPassword: '',
          },
          error,
          submitting: false,
        })
        return
      }

      delete changes.password
      delete changes.currentPassword
    }

    const response = await updateUser(user.id, changes)

    if (response.status !== 'success') {
      const error = (
        response.payload &&
        response.payload.errors &&
        response.payload.errors[0] &&
        response.payload.errors[0].detail
      ) || 'Error while attempting to update your profile.'

      this.setState({
        changes: {},
        error,
        submitting: false,
      })
      return
    }


    window.location.reload()
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

    if (value === user.attributes[key]) {
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
    // const email = typeof changes.email === 'string' ? changes.email : user.attributes.email
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

          <form onSubmit={this._handleSubmit}>
            <fieldset>
              <label htmlFor="description">
                Bio
              </label>

              <textarea
                aria-describedby="bio"
                disabled={submitting}
                id="bio"
                maxLength={1000}
                name="bio"
                onChange={this._handleChange}
                placeholder="Tell others a little about yourself."
                value={bio} />
            </fieldset>

            {/*<fieldset>
              <label htmlFor="name">
                Email
              </label>

              <ValidatedInput
                data-pattern-explainer="Please make sure your email is valid. e.g. user@emailprovider.com"
                disabled={submitting}
                id="email"
                name="email"
                onChange={this._handleChange}
                pattern="[\w\s_-]+"
                placeholder={email}
                required
                type="email"
                value={email} />
            </fieldset>*/}

            <fieldset>
              <label htmlFor="currentPassword">
                Change Password
              </label>
              <PasswordInput
                data-required-explainer="Both password fields are required to change your password."
                disabled={submitting}
                id="currentPassword"
                name="currentPassword"
                onInput={this._handleChange}
                placeholder="Current Password"
                required={password.length}
                value={currentPassword} />

              <PasswordInput
                data-required-explainer="Both password fields are required to change your password."
                disabled={submitting}
                id="password"
                name="password"
                onInput={this._handleChange}
                minLength={8}
                placeholder="New Password"
                required={currentPassword.length}
                showStrength
                showSugguestions
                showWarnings
                value={password} />
            </fieldset>



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
        </div>
      </section>
    )
  }
}

GroupSettingsPanel.propTypes = {}





const mapDispatchToProps = dispatch => ({
  updateUser: bindActionCreators(actions.updateUser, dispatch),
  updateUserPassword: bindActionCreators(actions.updateUserPassword, dispatch),
})





export default connect(null, mapDispatchToProps)(GroupSettingsPanel)

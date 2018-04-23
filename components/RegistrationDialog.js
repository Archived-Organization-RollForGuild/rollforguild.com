// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'





// Component Imports
import { actions } from '../store'
import Component from './Component'
import Dialog from './Dialog'
import Form from './Form'
import Link from './Link'
import PasswordInput from './PasswordInput'
import ValidatedInput from './ValidatedInput'





class RegistrationDialog extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _anonymizeEmail (email) {
    const [user, host] = email.split('@')

    return `${user.split('').fill('*', 1).join('')}@${host}`
  }

  async _onSubmit (event) {
    const {
      email,
      password,
      username,
    } = this.state

    event.preventDefault()

    this.setState({ registering: true })

    await this.props.register(username, email, password)

    this.setState({ registering: false })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_onSubmit',
    ])

    this.state = {
      email: '',
      registering: false,
      password: '',
      username: '',
    }
  }

  render () {
    const {
      email,
      registering,
      password,
      username,
    } = this.state
    const { prompt } = this.props

    return (
      <Dialog
        controls={this.controls}
        title="Register"
        {...this.props}>
        <Form
          action="register"
          category="Authentication"
          label="Register"
          onSubmit={this._onSubmit}>
          {Boolean(prompt) && (
            <p>{prompt}</p>
          )}

          <fieldset>
            <div className={['input-group', (registering ? 'disabled' : '')].join(' ')}>
              <label htmlFor="email">
                <FontAwesomeIcon icon="envelope" fixedWidth />
              </label>

              <ValidatedInput
                aria-label="Email"
                disabled={registering}
                id="email"
                name="email"
                onChange={this._handleChange}
                placeholder="Email"
                required
                type="email"
                value={email} />
            </div>
          </fieldset>

          <fieldset>
            <div className={['input-group', (registering ? 'disabled' : '')].join(' ')}>
              <label htmlFor="username">
                <FontAwesomeIcon icon="user" fixedWidth />
              </label>

              <ValidatedInput
                aria-label="Username"
                disabled={registering}
                id="username"
                name="username"
                onChange={this._handleChange}
                pattern="^[a-zA-Z0-9_-]+$"
                placeholder="Username"
                required
                type="username"
                value={username} />
            </div>
          </fieldset>

          <fieldset>
            <div className={['input-group', (registering ? 'disabled' : '')].join(' ')}>
              <label htmlFor="password">
                <FontAwesomeIcon icon="lock" fixedWidth />
              </label>

              <PasswordInput
                aria-label="Password"
                disabled={registering}
                id="password"
                name="password"
                onChange={this._handleChange}
                placeholder="Password"
                required
                showWarnings
                showSuggestions
                showStrength
                value={password} />
            </div>
          </fieldset>
        </Form>
      </Dialog>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get controls () {
    const { registering } = this.state

    const controls = {
      primary: [
        (
          <button
            className="success"
            disabled={registering}
            onClick={this._onSubmit}>
            {!registering && 'Register'}

            {Boolean(registering) && (
              <React.Fragment>
                <FontAwesomeIcon fixedWidth icon="spinner" pulse />
                Registering
              </React.Fragment>
            )}
          </button>
        ),
      ],
      secondary: [
        (
          <Link
            action="exit::login"
            category="Authentication"
            label="Register"
            params={{ destination: window.location.pathname }}
            route="/login">
            <a className="button link">
              I already have an account
            </a>
          </Link>
        ),
      ],
    }

    return controls
  }
}




RegistrationDialog.defaultProps = {
  modal: true,
}

RegistrationDialog.propTypes = {
  modal: PropTypes.bool,
}





const mapDispatchToProps = dispatch => bindActionCreators({
  register: actions.register,
}, dispatch)





export default connect(null, mapDispatchToProps)(RegistrationDialog)

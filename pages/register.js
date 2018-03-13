// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { Router } from '../routes'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Register'





class Register extends Component {
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

    const result = await this.props.register(username, email, password)

    this.setState({
      registering: false,
      status: result.status,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillMount () {
    if (this.props.loggedIn) {
      Router.push('/')
    }
  }

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
      status: null,
      username: '',
    }
  }

  render () {
    const {
      email,
      registering,
      password,
      status,
      username,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Register</h1>
        </header>

        {(!status && status !== 'error') && (
          <form onSubmit={this._onSubmit}>
            <fieldset>
              <div className="input-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon="envelope" fixedWidth />
                </label>

                <input
                  aria-label="Email"
                  disabled={registering}
                  id="email"
                  name="email"
                  onChange={this._handleChange}
                  placeholder="Email"
                  type="email"
                  value={email} />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-group">
                <label htmlFor="username">
                  <FontAwesomeIcon icon="user" fixedWidth />
                </label>

                <input
                  aria-label="Username"
                  disabled={registering}
                  id="username"
                  name="username"
                  onChange={this._handleChange}
                  placeholder="Username"
                  type="username"
                  value={username} />
              </div>
            </fieldset>

            <fieldset>
              <div className="input-group">
                <label htmlFor="password">
                  <FontAwesomeIcon icon="lock" fixedWidth />
                </label>

                <input
                  aria-label="Password"
                  disabled={registering}
                  id="password"
                  name="password"
                  onChange={this._handleChange}
                  placeholder="Password"
                  type="password"
                  value={password} />
              </div>
            </fieldset>

            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  type="submit">
                  Register
                </button>
              </div>
            </menu>

            {(status === 'error') && (
              <React.Fragment>
                <p>There seems to have been an error registering your account. Please try again or <a href="mailto:support@rollforguild.com">contact support</a>.</p>
              </React.Fragment>
            )}
          </form>
        )}

        {(status === 'success') && (
          <React.Fragment>
            <p>At this very moment, there are a million tiny imps running about, using the information you provided to create your account.</p>

            <p><strong>Check your inbox at {Register._anonymizeEmail(email)} for a confirmation email.</strong></p>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['register']

const mapStateToProps = state => ({ ...state.authentication })





export default Page(Register, title, {
  mapStateToProps,
  mapDispatchToProps,
})

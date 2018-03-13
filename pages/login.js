// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import {
  Link,
  Router,
} from '../routes'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Login'





class Login extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _onSubmit (event) {
    const { password, email } = this.state

    event.preventDefault()

    this.setState({ loggingIn: true })

    const result = await this.props.login(email, password)

    this.setState({
      loggingIn: false,
      status: result.status,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidUpdate () {
    const { loggedIn } = this.props

    if (loggedIn && (loggedIn !== 'error')) {
      const searchParams = {}

      /* eslint-disable no-restricted-globals */
      if (location) {
        location.search.replace(/^\?/, '').split('&').forEach(searchParam => {
          const [key, value] = searchParam.split('=')

          searchParams[key] = value
        })
      }
      /* eslint-enable */

      Router.pushRoute(searchParams.destination ? decodeURIComponent(searchParams.destination) : '/')
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
      loggingIn: false,
      password: '',
      status: null,
    }
  }

  render () {
    const {
      email,
      loggingIn,
      password,
      status,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Login</h1>
        </header>

        <form onSubmit={this._onSubmit}>
          <fieldset>
            <div className="input-group">
              <label htmlFor="email">
                <FontAwesomeIcon icon="user" fixedWidth />
              </label>

              <input
                aria-label="Email"
                disabled={loggingIn}
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
              <label htmlFor="password">
                <FontAwesomeIcon icon="lock" fixedWidth />
              </label>

              <input
                aria-label="Password"
                disabled={loggingIn}
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
                Login
              </button>
            </div>

            <div className="secondary">
              <Link href="/forgot-password">
                <a className="button link">
                  Forgot Password?
                </a>
              </Link>

              <Link href="/register">
                <a className="button secondary">
                  Sign Up
                </a>
              </Link>
            </div>
          </menu>

          {(status === 'error') && (
            <React.Fragment>
              <p>There seems to have been an error when trying to log in to your account. Please try again or <a href="mailto:support@rollforguild.com">contact support</a>.</p>
            </React.Fragment>
          )}
        </form>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['login']

const mapStateToProps = state => ({ ...state.authentication })





export default Page(Login, title, {
  mapStateToProps,
  mapDispatchToProps,
})

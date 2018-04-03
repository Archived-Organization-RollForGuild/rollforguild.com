// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { Router } from '../routes'
import Component from '../components/Component'
import Form from '../components/Form'
import Link from '../components/Link'
import Main from '../components/Main'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import PasswordInput from '../components/PasswordInput'
import ValidatedInput from '../components/ValidatedInput'





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
        <PageHeader>
          <h1>Login</h1>
        </PageHeader>

        <Main title={title}>
          <Form
            category="Authentication"
            label="Login"
            onSubmit={this._onSubmit}>
            <fieldset>
              <div className="input-group">
                <label htmlFor="email">
                  <FontAwesomeIcon icon="user" fixedWidth />
                </label>

                <ValidatedInput
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

                <PasswordInput
                  aria-label="Password"
                  disabled={loggingIn}
                  id="password"
                  name="password"
                  onChange={this._handleChange}
                  placeholder="Password"
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
                <Link
                  action="exit::forgot-password"
                  category="Authentication"
                  label="Login"
                  route="/forgot-password">
                  <a className="button link">
                    Forgot Password?
                  </a>
                </Link>

                <Link
                  action="exit::register"
                  category="Authentication"
                  label="Login"
                  route="/register">
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
          </Form>
        </Main>
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

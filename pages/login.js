// Module imports
import Link from 'next/link'
import React from 'react'
import Router from 'next/router'





// Component imports
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
    await this.props.login(email, password)
    this.setState({ loggingIn: false })
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

      Router.push(searchParams.destination ? searchParams.destination : '/')
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
    }
  }

  render () {
    const {
      email,
      loggingIn,
      password,
    } = this.state
    const { loggedIn } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Login</h1>
        </header>

        <form onSubmit={this._onSubmit}>
          <input
            aria-label="Email"
            disabled={loggingIn}
            id="email"
            name="email"
            onChange={this._handleChange}
            placeholder="Email"
            type="email"
            value={email} />

          <input
            aria-label="Password"
            disabled={loggingIn}
            id="password"
            name="password"
            onChange={this._handleChange}
            placeholder="Password"
            type="password"
            value={password} />

          <menu type="toolbar">
            <button type="submit">Login</button>
            <Link href="/register">
              <a className="button link">
                Sign Up
              </a>
            </Link>
          </menu>

          {(loggedIn === 'error') && (
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

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

    return (
      <React.Fragment>
        <header>
          <h1>Login</h1>
        </header>

        <form onSubmit={this._onSubmit}>
          <div className="input-group">
            <input
              disabled={loggingIn}
              id="email"
              name="email"
              onChange={this._handleChange}
              placeholder="Email"
              type="email"
              value={email} />
          </div>

          <div className="input-group">
            <input
              disabled={loggingIn}
              id="password"
              name="password"
              onChange={this._handleChange}
              placeholder="Password"
              type="password"
              value={password} />
          </div>

          <menu type="toolbar">
            <button type="submit">Login</button>
            <Link href="/register">
              <a className="button link">
                Sign Up
              </a>
            </Link>
          </menu>
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

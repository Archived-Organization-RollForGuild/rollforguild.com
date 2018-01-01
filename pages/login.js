// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Login'





class Login extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onSubmit (event) {
    event.preventDefault()

    console.log('logging in:', this.state)
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
      password: '',
    }
  }

  render () {
    const {
      email,
      password,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Login</h1>
        </header>

        <form onSubmit={this._onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              onChange={this._handleChange}
              placeholder="john.doe@example.com"
              type="email"
              value={email} />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              name="password"
              onChange={this._handleChange}
              placeholder="We recommend using a password manager like 1Password"
              type="password"
              value={password} />
          </div>

          <menu type="toolbar">
            <button type="submit">Login</button>
          </menu>
        </form>
      </React.Fragment>
    )
  }
}





export default Page(Login, title)

// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Home'





class Login extends Component {

  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange (event) {
    let {
      name,
      value,
    } = event.target
    let newState = {}

    newState[name] = value

    this.setState(newState)
  }

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
    let {
      email,
      password,
    } = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <header>
          <h1>Login</h1>
        </header>

        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          onChange={this._handleChange}
          type="email"
          value={email} />

        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          onChange={this._handleChange}
          type="password"
          value={password} />

        <menu type="toolbar">
          <button>Login</button>
        </menu>
      </form>
    )
  }
}





export default Page(Login, title)

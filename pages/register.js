// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Home'





class Register extends Component {

  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onSubmit (event) {
    event.preventDefault()

    console.log('Registering:', this.state)
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
      name: '',
      password: '',
    }
  }

  render () {
    let {
      email,
      name,
      password,
    } = this.state

    return (
      <form onSubmit={this._onSubmit}>
        <header>
          <h1>Register</h1>
        </header>

        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          onChange={this._handleChange}
          type="name"
          value={name} />

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
          <button>Register</button>
        </menu>
      </form>
    )
  }
}





export default Page(Register, title)

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
            <p>Now that you've given the password to the towering hulk of a creature at the entrance to The Guild's headquarters, it lumbers towards a strange, magical box. It points to the box, then grunts at you. You can only assume it intends for you to come closer. The creature steps out of your way and you lean in for a closer look. The box is clearly some strange product of gnomish tinkering. On the front of it you read the words...</p>

            <blockquote>Check your email for a confirmation code.</blockquote>

            <p>Unsure of what this may mean, you feel an overwhelming urge to step out-of-character and do as the box commands.</p>
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

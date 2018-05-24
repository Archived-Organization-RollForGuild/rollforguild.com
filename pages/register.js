// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { activateZenDesk } from '../helpers'
import { Router } from '../routes'
import Button from '../components/Button'
import Component from '../components/Component'
import Form from '../components/Form'
import Link from '../components/Link'
import Main from '../components/Main'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'
import PasswordInput from '../components/PasswordInput'
import ValidatedInput from '../components/ValidatedInput'





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
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
          {!status && (
            <Form
              action="register"
              category="Authentication"
              label="Register"
              onSubmit={this._onSubmit}>
              <fieldset>
                <div className="input-group">
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
                <div className="input-group">
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
                <div className="input-group">
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

              <menu type="toolbar">
                <div className="primary">
                  <button
                    className="success"
                    type="submit">
                    Register
                  </button>
                </div>

                <div className="secondary">
                  <Link
                    action="exit::login"
                    category="Authentication"
                    label="Register"
                    route="/login">
                    <a className="button link">
                      Return to Login
                    </a>
                  </Link>
                </div>
              </menu>

              {(status === 'error') && (
                <React.Fragment>
                  <p>There seems to have been an error registering your account. Please try again or <Button category="Authentication" className="inline link" label="Support" onClick={activateZenDesk}>contact support</Button>.</p>
                </React.Fragment>
              )}
            </Form>
          )}

          {(status === 'success') && (
            <React.Fragment>
              <p>At this very moment, there are a million tiny imps running about, using the information you provided to create your account.</p>

              <p><strong>Check your inbox at {Register._anonymizeEmail(email)} for a confirmation email.</strong></p>
            </React.Fragment>
          )}
        </Main>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['register']





export default Page(Register, {
  mapDispatchToProps,
})

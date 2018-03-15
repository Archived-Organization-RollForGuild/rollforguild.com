// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { Link } from '../routes'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Login'





class Login extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange ({ target }) {
    this.setState({ email: target.value })
  }

  async _onSubmit (event) {
    const { email } = this.state

    event.preventDefault()

    this.setState({ requestingReset: true })

    const result = await this.props.requestPasswordReset(email)

    this.setState({
      requestingReset: false,
      status: result.status,
    })
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
      requestingReset: false,
      status: null,
    }
  }

  render () {
    const {
      email,
      loggingIn,
      requestingReset,
      status,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Forgot Password</h1>
        </header>

        {(status === 'success') && (
          <p><span aria-label="Sparkle emoji" role="img">✨</span> Victory is nigh! <span aria-label="Sparkle emoji" role="img">✨</span> Keep an eye on your inbox for a password reset email.</p>
        )}

        {(['error', null].includes(status)) && (
          <form onSubmit={this._onSubmit}>
            <p><span aria-label="Castle emoji" role="img">🏰</span> Alas, traveller, we've all forgotten the keys to the castle on occasion. Enter your email address and a courier will arrive shortly with the information you need.</p>

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

            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  disabled={requestingReset}
                  type="submit">
                  Submit
                </button>
              </div>

              <div className="secondary">
                <Link href="/login">
                  <a className="button link">
                    Return to Login
                  </a>
                </Link>
              </div>
            </menu>

            {(status === 'error') && (
              <React.Fragment>
                <p>There seems to have been an error when trying to reset your password. Please try again or <a href="mailto:support@rollforguild.com">contact support</a>.</p>
              </React.Fragment>
            )}
          </form>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['requestPasswordReset']

const mapStateToProps = state => ({ ...state.authentication })





export default Page(Login, title, {
  mapStateToProps,
  mapDispatchToProps,
})

// Module imports
import React from 'react'





// Component imports
import { Router } from '../../routes'
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'Confirmation'





class Confirmation extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async _confirmAccount () {
    const {
      confirmAccount,
      query,
    } = this.props
    const { token } = query

    this.setState({ confirming: true })

    await confirmAccount(token)

    this.setState({ confirming: false })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidUpdate () {
    const { loggedIn } = this.props

    if (loggedIn) {
      Router.push('/')
    }
  }

  async componentWillMount () {
    const { loggedIn } = this.props

    if (loggedIn && (loggedIn !== 'error')) {
      Router.push('/')
    } else {
      this._confirmAccount()
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      confirming: true,
    }
  }

  render () {
    const { confirming } = this.state
    const { loggedIn } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Account Confirmation</h1>
        </header>

        {confirming && (
          <React.Fragment>
            <p>Confirming...</p>
          </React.Fragment>
        )}

        {(loggedIn === 'success') && (
          <React.Fragment>
            <p>Redirecting...</p>
          </React.Fragment>
        )}

        {(loggedIn === 'error') && (
          <React.Fragment>
            <p><span aria-label="Sad face emoji" role="img">😞</span> Uh oh... It seems there's a problem with your confirmation code. If you're still trying to activate your account, you may want to <a href="mailto:support@rollforguild.com">contact support</a>.</p>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['confirmAccount']

const mapStateToProps = state => ({ ...state.authentication })





export default Page(Confirmation, title, {
  mapDispatchToProps,
  mapStateToProps,
})

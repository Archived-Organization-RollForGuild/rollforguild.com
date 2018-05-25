// Module imports
import React from 'react'





// Component imports
import activateZenDesk from '../../helpers/activateZenDesk'
import { Router } from '../../routes'
import Button from '../../components/Button'
import Component from '../../components/Component'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageTitle from '../../components/PageTitle'
import PageHeader from '../../components/PageHeader'





// Component constants
const title = 'Account Confirmation'





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

  async componentDidMount () {
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
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
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
              <p><span aria-label="Sad face emoji" role="img">😞</span> Uh oh... It seems there's a problem with your confirmation code. If you're still trying to activate your account, you may want to <Button category="Account Confirmation" className="inline link" label="Support" onClick={activateZenDesk}>contact support</Button>.</p>
            </React.Fragment>
          )}
        </Main>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['confirmAccount']





export default Page(Confirmation, {
  mapDispatchToProps,
})

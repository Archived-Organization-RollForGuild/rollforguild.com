// Module imports
import React from 'react'
// import Router from 'next/router'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Confirmation'





class Confirmation extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentWillMount () {
    const {
      confirmAccount,
      query,
    } = this.props
    const { token } = query

    await confirmAccount(token)

    this.setState({
      confirming: false,
    })
  }

  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps', nextProps)
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
          <h1>Confirmation</h1>
        </header>

        {confirming && (
          <React.Fragment>
            <p>Confirming...</p>
          </React.Fragment>
        )}

        {(!confirming && loggedIn) && (
          <React.Fragment>
            <p>Redirecting...</p>
          </React.Fragment>
        )}

        {(!confirming && !loggedIn) && (
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

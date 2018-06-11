// Module imports
import React from 'react'





// Component imports
import activateZenDesk from '../../helpers/activateZenDesk'
import Button from '../../components/Button'
import Component from '../../components/Component'
import connect from '../../helpers/connect'
import Main from '../../components/Main'
import PageTitle from '../../components/PageTitle'
import PageHeader from '../../components/PageHeader'





// Component constants
const title = 'Email Update Confirmation'





class Confirmation extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  static authenticationRequired = true

  state = {
    confirming: true,
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      acceptNewEmail,
      confirmEmailUpdate,
      query,
    } = this.props

    const { status } = await confirmEmailUpdate(query.token, acceptNewEmail)

    this.setState({
      confirming: false,
      error: status === 'error',
    })
  }

  render () {
    const {
      confirming,
      error,
    } = this.state
    const { acceptNewEmail } = this.props

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
          {(confirming && acceptNewEmail) && (
            <React.Fragment>
              <p>Confirming...</p>
            </React.Fragment>
          )}

          {(confirming && !acceptNewEmail) && (
            <React.Fragment>
              <p>Rolling Back...</p>
            </React.Fragment>
          )}

          {(!confirming && error) && (
            <React.Fragment>
              <p><span aria-label="Sad face emoji" role="img">😞</span> Uh oh... It seems there's a problem with your confirmation code. If you're still trying to change your email, you may want to <Button category="Email Update Confirmation" className="inline link" label="Support" onClick={activateZenDesk}>contact support</Button>.</p>
            </React.Fragment>
          )}

          {(!confirming && !error && acceptNewEmail) && (
            <React.Fragment>
              <p>Success! Your new email has been confirmed with our carrier pidgeons, and they will use your new address from now on.</p>
            </React.Fragment>
          )}

          {(!confirming && !error && !acceptNewEmail) && (
            <React.Fragment>
              <p>All done! Never fear, your email has been restored. If you didn't request this change, we highly recommend you change your password.</p>
            </React.Fragment>
          )}
        </Main>
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = ['confirmEmailUpdate']

  static mapStateToProps = (state, ownProps) => {
    const acceptNewEmail = ownProps.asPath.startsWith('/email-update-confirmation')

    return { acceptNewEmail }
  }
}





export default connect(Confirmation)

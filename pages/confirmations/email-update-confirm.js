// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'Confirmation'





class Confirmation extends Component {
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
      error: status !== 'success',
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      confirming: true,
    }
  }

  render() {
    const {
      confirming,
      error,
    } = this.state
    const { acceptNewEmail } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Email Update Confirmation</h1>
        </header>

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
            <p><span aria-label="Sad face emoji" role="img">😞</span> Uh oh... It seems there's a problem with your confirmation code. If you're still trying to change your email, you may want to <a href="mailto:support@rollforguild.com">contact support</a>.</p>
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
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['confirmEmailUpdate']

const mapStateToProps = (state, ownProps) => {
  const acceptNewEmail = ownProps.asPath.startsWith('/email-update-confirmation')

  return { acceptNewEmail }
}





export default Page(Confirmation, title, {
  mapDispatchToProps,
  mapStateToProps,
}, true)

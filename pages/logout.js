// Component imports
import { Router } from '../routes'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Logout'





class Logout extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const { logout } = this.props

    await logout()

    Router.push('/')
  }

  render () {
    return (
      <p>Logging out...</p>
    )
  }
}





const mapDispatchToProps = ['logout']





export default Page(Logout, title, { mapDispatchToProps }, true)

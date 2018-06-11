// Component imports
import { Router } from '../routes'
import apiService from '../services/api'
import Component from '../components/Component'
import connect from '../helpers/connect'





class Logout extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  static authenticationRequired = true





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const { logout } = this.props

    await logout()

    delete apiService.defaults.headers.common.Authorization

    Router.push('/')
  }

  render () {
    return (
      <p>Logging out...</p>
    )
  }





  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = ['logout']
}





export default connect(Logout)

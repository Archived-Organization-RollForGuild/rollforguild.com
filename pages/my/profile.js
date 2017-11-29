// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'My Profile'





class MyProfile extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <h1>My Profile!</h1>
    )
  }
}





export default Page(MyProfile, title)

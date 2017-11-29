// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'My Account'





class MyAccount extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <div>My Account!</div>
    )
  }
}





export default Page(MyAccount, title)

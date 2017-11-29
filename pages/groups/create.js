// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'Create Group'





class CreateGroup extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <h1>Create Group!</h1>
    )
  }
}





export default Page(CreateGroup, title)

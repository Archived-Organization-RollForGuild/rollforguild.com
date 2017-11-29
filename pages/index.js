// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'
import SimpleDropdown from '../components/SimpleDropdown'





// Component constants
const title = 'Home'





class Index extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <div>Home!</div>
    )
  }
}





export default Page(Index, title)

// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'GM Encounters'





class GMEncounters extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <h1>GM Encounters!</h1>
    )
  }
}





export default Page(GMEncounters, title)

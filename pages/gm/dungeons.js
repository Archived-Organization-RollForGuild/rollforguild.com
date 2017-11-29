// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'GM Dungeons'





class GMDungeons extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <h1>GM Dungeons!</h1>
    )
  }
}





export default Page(GMDungeons, title)

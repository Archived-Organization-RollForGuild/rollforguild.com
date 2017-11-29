// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'GM Monsters'





class GMMonsters extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <h1>GM Monsters!</h1>
    )
  }
}





export default Page(GMMonsters, title)

// Module imports
import Link from 'next/link'
import React from 'react'





// Module imports
import Component from './Component'
import Nav from './Nav'





export default class extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    return (
      <header role="banner">
        <div className="brand" />

        <Nav />
      </header>
    )
  }
}

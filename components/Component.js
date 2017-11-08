// Module imports
import { debounce } from 'lodash'
import React from 'react'





export default class Component extends React.Component {

  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _bindMethods (methods) {
    methods.forEach(method => this[method] = this[method].bind(this))
  }

  _debounceMethods (methods) {
    methods.forEach(method => this[method] = debounce(this[method], this.props.debounceLength || 500))
  }

  _handleChange (event) {
    let {
      name,
      value,
    } = event.target
    let newState = {}

    newState[name] = value

    this.setState(newState)
  }
}

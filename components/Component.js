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

  _debounce (func, debounceLength) {
    return debounce(func, this.props.debounceLength || debounceLength || 500)
  }

  _debounceMethods (methods) {
    methods.forEach(method => {
      let methodToDebounce = method
      let { debounceLength } = this.props

      if (typeof method !== 'string') {
        methodToDebounce = method.method
        debounceLength = method.length
      }

      this[method] = debounce(this[methodToDebounce], debounceLength || 500)
    })
  }

  _handleChange (event) {
    const {
      name,
      value,
    } = event.target
    const newState = {}

    newState[name] = value

    this.setState(newState)
  }
}

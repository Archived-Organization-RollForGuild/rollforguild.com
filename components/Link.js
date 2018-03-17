// Component Imports
import React from 'react'





// Component Imports
import { Router } from '../routes'
import TrackableComponent from './TrackableComponent'





class TrackableLink extends TrackableComponent {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleClick (event) {
    const {
      params,
      route,
    } = this.props

    event.preventDefault()

    this._fireEvent()

    Router.pushRoute(route, params)
  }





  /***************************************************************************\
   Public Methods
   \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleClick'])

    console.log(this)
  }

  render () {
    return (
      <React.Fragment>
        {this.renderProps.children}
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get renderProps () {
    const renderProps = super.renderProps
    const { children } = renderProps

    const newProps = { onClick: this._handleClick }

    if (children.type === 'a') {
      newProps.href = renderProps.route
    }

    return {
      ...renderProps,
      children: React.cloneElement(children, newProps),
    }
  }
}





TrackableLink.defaultProps = {
  action: 'click',
}





export default TrackableLink
export { TrackableLink }

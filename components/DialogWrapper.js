/* global dialogPolyfill */

// Module Imports
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'





// Component Imports
import Component from './Component'

/**
 * Component for presenting dialogs and modals to the user.
 *
 * Dialogs are not displayed to the user by default.
 * Always mount DialogWrappe, and display the content by setting 'visible' prop to true
 */
class DialogWrapper extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _show () {
    if (this._el) {
      this._el.show()
    }
  }

  _close () {
    if (this._el) {
      this._el.close()
    }
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  constructor (props) {
    super(props)
    this._el = null
  }

  componentDidMount () {
    dialogPolyfill.registerDialog(this._el)

    if (this.props.visible) {
      this._show()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.visible !== nextProps.visible) {
      if (nextProps.visible) {
        this._show()
      } else {
        this._close()
      }
    }
  }

  render () {
    const {
      children,
      modal,
      className,

    } = this.props

    return ReactDOM.createPortal(
      (
        <dialog
          className={`dialog-wrapper ${modal ? 'modal' : ''} ${className || ''}`}
          ref={el => this._el = el}
          data-t="dialog:box">
          {children}
        </dialog>
      ),
      document.getElementById('dialog-container')
    )
  }
}

DialogWrapper.defaultProps = {
  modal: true,
  visible: false,
}

DialogWrapper.propTypes = {
  modal: PropTypes.bool,
  visible: PropTypes.bool,
}


export default DialogWrapper

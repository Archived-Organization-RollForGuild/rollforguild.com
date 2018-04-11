import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'


/**
 * accepted props.mode types for DialogWrapper
 */
const wrapperModes = {
  modal: (props) => ({
    className: `dialog-wrapper modal ${props.lightsOff ? 'lights-off' : ''}`,
  }),
  popup: (props) => ({
    className: 'dialog-wrapper popup',
    style: {
      top: props.y,
      left: props.x,
      height: props.height,
      width: props.width,
    },
  }),
}





/**
 * Component for presenting dialogs and modals to the user.
 * Set mode (modal or popup) and set appropriate props to display a dialog to the user.
 *
 * DialogWrapper is not mounted to the DOM by default. This is to ease the future implemention of dialog transitions.
 * Always mount DialogWrapper by default, and mount the inner content by setting 'visible' prop to true
 */
const DialogWrapper = (props) => {
  if (!props.visible) {
    return null
  }

  const {
    containerProps,
    children,
    mode,
  } = props

  let modeProps = {}

  if (wrapperModes[mode]) {
    modeProps = wrapperModes[mode](props)
  } else {
    modeProps = wrapperModes.modal(props)
  }

  return ReactDOM.createPortal(
    (
      <div
        {...modeProps}
        data-t="dialog:wrapper">
        <div
          {...containerProps}
          data-t="dialog:box">
          {children}
        </div>
      </div>
    ),
    document.getElementById('dialog-container')
  )
}

DialogWrapper.defaultProps = {
  containerProps: {},
  height: 'auto',
  width: 'auto',
  x: '0px',
  y: '0px',
  lightsOff: true,
  visible: false,
  mode: 'modal',
}

DialogWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  containerProps: PropTypes.object,
  height: PropTypes.string,
  lightsOff: PropTypes.bool,
  mode: PropTypes.oneOf(Object.keys(wrapperModes)),
  visible: PropTypes.bool,
  width: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
}


export default DialogWrapper

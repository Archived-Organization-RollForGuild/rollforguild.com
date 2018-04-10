import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'



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





/* WRITE MY STYLES YOU FUCKNUGGET */
const DialogWrapper = (props) => {
  if (!props.visible) {
    return null
  }

  const {
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
        {children}
      </div>
    ),
    document.getElementById('dialog-container')
  )
}

DialogWrapper.defaultProps = {
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
  height: PropTypes.string,
  lightsOff: PropTypes.bool,
  mode: PropTypes.oneOf(Object.keys(wrapperModes)),
  visible: PropTypes.bool,
  width: PropTypes.string,
  x: PropTypes.string,
  y: PropTypes.string,
}


export default DialogWrapper

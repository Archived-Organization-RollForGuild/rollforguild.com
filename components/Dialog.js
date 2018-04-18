// Module Imports
import {
  animated,
  Transition,
} from 'react-spring'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'





// Component Imports
import Component from './Component'

/**
 * Component for presenting dialogs and modals to the user.
 */

class Dialog extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      children,
      className,
      modal,
    } = this.props

    return ReactDOM.createPortal(
      (
        <Transition
          native
          from={{ opacity: 0 }}
          enter={{ opacity: 1 }}
          leave={{ opacity: 0 }}>
          {styles => (
            <animated.div
              className={`${modal ? 'modal' : ''} ${className || ''}`}
              data-t="dialog"
              ref={el => this._el = el}
              role="dialog"
              style={styles}>
              {children}
            </animated.div>
          )}
        </Transition>
      ),
      document.getElementById('dialog-container')
    )
  }
}

Dialog.defaultProps = {
  modal: true,
}

Dialog.propTypes = {
  modal: PropTypes.bool,
}


export default Dialog

// Module Imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'





// Component Imports
import Button from './Button'





/**
 * Component for presenting dialogs and modals to the user.
 */

const Dialog = props => {
  const {
    children,
    className,
    controls,
    modal,
    onClose,
    title,
  } = props

  return ReactDOM.createPortal(
    (
      <div
        className={`${modal ? 'modal' : ''} ${className || ''}`}
        data-t="dialog"
        role="dialog">
        <header>
          <h2>{title}</h2>

          <Button
            action="close"
            category="Dialog"
            className="danger"
            name="close"
            onClick={onClose}
            label="">
            <FontAwesomeIcon icon="times" fixedWidth />
          </Button>
        </header>

        <div className="content">{children}</div>

        {Boolean(controls) && (
          <footer>
            <menu type="toolbar" className="compact fulltext">
              {Boolean(controls.primary) && (
                <div className="primary">
                  {controls.primary}
                </div>
              )}

              {Boolean(controls.secondary) && (
                <div className="secondary">
                  {controls.secondary}
                </div>
              )}
            </menu>
          </footer>
        )}
      </div>
    ),
    document.getElementById('dialog-container')
  )
}

Dialog.defaultProps = {
  modal: true,
}

Dialog.propTypes = {
  modal: PropTypes.bool,
}


export default Dialog

// Module imports
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { orderBy } from 'lodash'




// Component imports
import Component from './Component'





class ValidatedInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _validate (messages = []) {
    const {
      badInput,
      patternMismatch,
      tooLong,
      tooShort,
      typeMismatch,
      valid,
      valueMissing,
    } = this._el.validity

    if (!valid) {
      if (badInput || typeMismatch) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-badinput-explainer') || 'Doesn\'t match field type',
        })
      }

      if (patternMismatch) {
        const message = this._el.getAttribute('data-pattern-explainer')
        if (message) {
          messages.push({
            icon: 'exclamation-triangle',
            message,
          })
        }
      }

      if (tooLong) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-maxlength-explainer') || `Must be fewer than ${this._el.getAttribute('maxlength')} characters`,
        })
      }

      if (tooShort) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-minlength-explainer') || `Must be longer than ${this._el.getAttribute('minlength')} characters`,
        })
      }

      if (valueMissing) {
        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-required-explainer') || 'This field is required',
        })
      }
    }

    this.setState({ messages: orderBy(messages, ['priority'], ['desc']) })

    if (this.props.onValidate) {
      this.props.onValidate({
        type: 'validate',
        target: this._el,
      })
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    this._validate()
  }

  componentDidUpdate (prevProps) {
    let comparedProps = [
      'pattern',
      'value',
      'required',
      'type',
      'minLength',
      'maxLength',
    ]

    comparedProps = comparedProps.map(fieldName => this.props[fieldName] === prevProps[fieldName])

    if (comparedProps.includes(false)) {
      this._validate()
    }
  }

  constructor (props) {
    super(props)

    this._debounceMethods(['_validate'])

    this.state = {
      messages: [],
    }
  }

  renderMessages() {
    const {
      messages,
    } = this.state

    return (
      <React.Fragment>
        <FontAwesomeIcon className="validity-indicator" icon="exclamation-triangle" fixedWidth />

        <ul className="messages">
          {messages.map(({ icon, message, type }) => (
            <li key={message} className={`${type || 'error'} message`}>
              <FontAwesomeIcon icon={icon} fixedWidth />
              {message}
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  }

  render () {
    const classNames = [
      'validated-input',
      (this.props.className || ''),
    ]

    const inputProps = { ...this.props }
    delete inputProps.onValidate
    delete inputProps.className

    return (
      <div className={classNames.join(' ')}>
        <input
          {...inputProps}
          ref={_el => this._el = _el} />
        {this.renderMessages()}
      </div>
    )
  }
}





export default ValidatedInput

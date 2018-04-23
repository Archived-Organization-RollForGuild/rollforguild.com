// Module imports
import { orderBy } from 'lodash'
import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'




// Component imports
import Component from './Component'




// Component constants
const invalidTypeMessages = {
  email: 'Not a valid email address',
  url: 'Not a valid URL',
}





class ValidatedInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleBlur (event) {
    const { onBlur } = this.props

    this._handleInteraction()

    if (onBlur) {
      onBlur(event)
    }
  }

  _handleInput (event) {
    const { onInput } = this.props

    this._handleInteraction()

    if (onInput) {
      onInput(event)
    }
  }

  _handleInteraction () {
    const { hasBeenFocused } = this.state

    if (!hasBeenFocused) {
      this.setState({ hasBeenFocused: true })
    }
  }

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
        const defaultMessage = invalidTypeMessages[this._el.type] || `Doesn't match field type (${this._el.type})`

        messages.push({
          icon: 'exclamation-triangle',
          message: this._el.getAttribute('data-badinput-explainer') || defaultMessage,
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
    if (this._el.value) {
      this._validate()
    }
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

    this._bindMethods([
      '_handleBlur',
      '_handleInput',
    ])
    // this._debounceMethods(['_validate'])

    this.state = {
      hasBeenFocused: false,
      messages: [],
    }
  }

  render () {
    const { hasBeenFocused } = this.state
    const {
      className,
      disabled,
    } = this.props
    const classNames = [
      'validated-input',
      (disabled ? 'disabled' : ''),
      (className || ''),
    ]

    return (
      <div
        className={classNames.join(' ')}
        data-t="validated-input:wrapper">
        <input
          data-t="validated-input:input"
          {...this.renderProps} />

        <FontAwesomeIcon
          className="validity-indicator"
          data-t="validated-input:validity-icon"
          hidden={!hasBeenFocused}
          icon="exclamation-triangle"
          fixedWidth />

        {this.renderMessages()}
      </div>
    )
  }

  renderMessages () {
    const {
      hasBeenFocused,
      messages,
    } = this.state

    return (
      <ul
        className="messages"
        data-t="validated-input:message-list"
        hidden={!hasBeenFocused}>
        {messages.map(({ icon, message, type }) => (
          <li
            key={message}
            className={`${type || 'error'} message`}
            data-t="validated-input:message-list:item">
            <FontAwesomeIcon
              icon={icon}
              fixedWidth />
            {message}
          </li>
        ))}
      </ul>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get renderProps () {
    const renderProps = {
      ...this.props,
      onBlur: this._handleBlur,
      onInput: this._handleInput,
      ref: _el => this._el = _el,
    }

    delete renderProps.onValidate
    delete renderProps.className

    return renderProps
  }
}





export default ValidatedInput

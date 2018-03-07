// Component constants
import Component from './Component'





class ValidatedInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onInput (event) {
    const { onInput } = this.props

    if (onInput) {
      onInput(event)
    }

    this._validate()
  }

  _onFocus (event) {
    const { onFocus } = this.props

    if (onFocus) {
      onFocus(event)
    }

    this._validate()
  }

  _validate () {
    let messages = []
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
          icon: 'exclamation-circle',
          message: this._el.getAttribute('data-badinput-explainer') || 'Doesn\'t match field type',
        })
      }

      if (patternMismatch) {
        messages.push({
          icon: 'exclamation-circle',
          message: this._el.getAttribute('data-pattern-explainer'),
        })
      }

      if (tooLong) {
        messages.push({
          icon: 'exclamation-circle',
          message: this._el.getAttribute('data-maxlength-explainer') || `Must be fewer than ${this._el.getAttribute('maxlength')} characters`,
        })
      }

      if (tooShort) {
        messages.push({
          icon: 'exclamation-circle',
          message: this._el.getAttribute('data-minlength-explainer') || `Must be longer than ${this._el.getAttribute('minlength')} characters`,
        })
      }

      if (valueMissing) {
        messages.push({
          icon: 'exclamation-circle',
          message: this._el.getAttribute('data-required-explainer') || 'This field is required',
        })
      }
    }

    const propMessages = this.props.messages

    if (typeof propMessages === 'function') {
      messages = messages.concat(propMessages(this._el.value))
    } else if (Array.isArray(propMessages)) {
      messages = messages.concat(propMessages)
    }

    messages = messages.sort((firstMessage, secondMessage) => (secondMessage.priority || 0) - (firstMessage.priority || 0))

    this.setState({ messages })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_onInput',
      '_onFocus',
    ])
    this._debounceMethods(['_validate'])

    this.state = { messages: [] }
  }

  render () {
    const {
      messages,
    } = this.state

    return (
      <div className="validated-input">
        <input
          {...this.props}
          onInput={this._onInput}
          onFocus={this._onFocus}
          ref={_el => this._el = _el} />

        {this.props.children}

        <i className="fas fa-fw fa-exclamation-triangle validity-indicator" />

        <ul className="messages">
          {messages.map(({ icon, message }) => (
            <li key={message}>
              <i className={`fas fa-fw fa-${icon}`} />
              {message}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}





export default ValidatedInput

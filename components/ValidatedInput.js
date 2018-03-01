// Component constants
import Component from './Component'





class ValidatedInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onInput (event) {
    const { onInput } = this.props

    this._validate()

    if (onInput) {
      onInput(event)
    }
  }

  _validate () {
    const messages = []
    const {
      badInput,
      patternMismatch,
      tooLong,
      tooShort,
      typeMismatch,
      valid,
      valueMissing,
    } = this._el.validity

    console.log('ValidityState:', this._el.validity)

    if (!valid) {
      if (badInput || typeMismatch) {
        messages.push({
          icon: 'exclamation-circle',
          message: 'Doesn\'t match field type',
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
          message: `Must be fewer than ${this._el.getAttribute('maxlength')} characters`,
        })
      }

      if (tooShort) {
        messages.push({
          icon: 'exclamation-circle',
          message: `Must be longer than ${this._el.getAttribute('minlength')} characters`,
        })
      }

      if (valueMissing) {
        messages.push({
          icon: 'exclamation-circle',
          message: 'This field is required',
        })
      }
    }

    this.setState({ messages })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_onInput'])
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
          ref={_el => this._el = _el} />

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

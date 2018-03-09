// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'
import zxcvbn from 'zxcvbn'





// Component imports
import ValidatedInput from './ValidatedInput'





class PasswordInput extends ValidatedInput {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _validate() {
    const {
      showWarnings,
      showSuggestions,
    } = this.props

    const messages = []
    const passwordEvaluation = zxcvbn(this._el.value)

    let isValid = true

    if (showWarnings && passwordEvaluation.feedback.warning) {
      messages.push({
        icon: 'exclamation-triangle',
        message: passwordEvaluation.feedback.warning,
        priority: 99,
      })
      isValid = false
    }

    if (showSuggestions && passwordEvaluation.feedback.suggestions.length) {
      for (const suggestion of passwordEvaluation.feedback.suggestions) {
        messages.push({
          icon: 'exclamation-circle',
          type: 'info',
          message: `Suggestion: ${suggestion}`,
          priority: -1,
        })
      }
      isValid = false
    }

    this.setState({
      passwordStrength: passwordEvaluation.score,
      isValid,
    })

    super._validate(messages)
  }

  _handleShowPasswordClick (event) {
    event.preventDefault()
    this.setState({ showPassword: !this.state.showPassword })
    this._el.focus()
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  constructor(props) {
    super(props)

    this._bindMethods([
      '_handleShowPasswordClick',
    ])

    this.state = {
      ...this.state,
      showPassword: false,
      passwordStrength: 0,
      isValid: true,
    }
  }

  render() {
    const {
      showPassword,
      passwordStrength,
      isValid,
    } = this.state

    const {
      showStrength,
    } = this.props

    const classNames = [
      'validated-input',
      'password-input',
      (this.props.className || ''),
    ]

    const inputProps = { ...this.props }
    delete inputProps.onValidate
    delete inputProps.className
    delete inputProps.showStrength
    delete inputProps.showWarnings
    delete inputProps.showSuggestions

    if (!isValid) {
      inputProps.pattern = '$.^'
    }

    return (
      <div className={classNames.join(' ')}>
        <input
          {...inputProps}
          ref={_el => this._el = _el}
          type={showPassword ? 'text' : 'password'} />

        <button
          className="show-password"
          onClick={this._handleShowPasswordClick}>
          <FontAwesomeIcon icon={showPassword ? 'eye-slash' : 'eye'} fixedWidth />
        </button>

        {showStrength && (
          <meter
            className="strength-meter"
            low="2"
            high="3"
            max="4"
            optimum="4"
            value={passwordStrength} />
        )}

        <FontAwesomeIcon className="validity-indicator" icon="exclamation-triangle" fixedWidth />

        {this.renderMessages()}
      </div>
    )
  }
}




export default PasswordInput

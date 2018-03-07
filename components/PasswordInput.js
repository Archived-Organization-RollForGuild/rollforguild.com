// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'
import zxcvbn from 'zxcvbn'





// Component imports
import Component from './Component'
import ValidatedInput from './ValidatedInput'





class PasswordInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _getMessages(value) {
    const {
      showWarnings,
      showSuggestions,
    } = this.props

    const messages = []
    const passwordEvaluation = zxcvbn(value)

    if (showWarnings && passwordEvaluation.feedback.warning) {
      messages.push({
        icon: 'exclamation-triangle',
        message: passwordEvaluation.feedback.warning,
        priority: 99,
      })
    }

    if (showSuggestions && passwordEvaluation.feedback.suggestions.length) {
      for (const suggestion of passwordEvaluation.feedback.suggestions) {
        messages.push({
          icon: 'exclamation-circle',
          message: suggestion,
          priority: -1,
        })
      }
    }

    this.setState({
      passwordStrength: passwordEvaluation.score,
    })

    return messages
  }

  _handleShowPasswordClick (event) {
    event.preventDefault()
    this.setState({ showPassword: !this.state.showPassword })
    this._inputEl.focus()
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  constructor(props) {
    super(props)

    this._bindMethods([
      '_getMessages',
      '_handleShowPasswordClick',
    ])

    this.state = {
      showPassword: false,
      passwordStrength: 0,
    }
  }

  render() {
    const {
      showPassword,
      showStrength,
      passwordStrength,
    } = this.state

    return (
      <div className="password-input">
        <ValidatedInput
          {...this.props}
          messages={this._getMessages}
          inputRef={inputEl => this._inputEl = inputEl}
          type={showPassword ? 'text' : 'password'}>

          <button
            className="show-password"
            onClick={this._handleShowPasswordClick}>
            <FontAwesomeIcon icon={showPassword ? 'eye-slash' : 'eye'} fixedWidth />
          </button>

          {showStrength && (
            <meter
              className="password-strength-meter"
              low="2"
              high="3"
              max="4"
              optimum="4"
              value={passwordStrength} />
          )}

        </ValidatedInput>
      </div>
    )
  }
}





export default PasswordInput

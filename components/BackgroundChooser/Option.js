// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Component from '../Component'





class Option extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleClick (event) {
    const {
      onClick,
      option,
    } = this.props

    event.preventDefault()

    onClick(option.value)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleClick'])
  }

  render () {
    const { option } = this.props

    return (
      <details>
        <summary>
          <header>
            <h3>{option.name}</h3>

            <menu type="toolbar">
              <button onClick={this._handleClick}>
                Select
              </button>
            </menu>
          </header>
        </summary>

        <p>{option.description}</p>
      </details>
    )
  }
}

Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  option: PropTypes.object.isRequired,
}





export default Option

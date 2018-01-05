// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../components/Chooser'
import Component from '../components/Component'





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





const BackgroundChooser = (props) => {
  const {
    character,
    onBackgroundChange,
    ruleset,
  } = props
  const { backgrounds } = ruleset['player-characters']
  // const flaws = character.background ? backgrounds[character.background].flaws : null

  return (
    <React.Fragment>
      <header>
        <h2>Select Your Background</h2>
      </header>

      <Chooser
        className="list"
        options={Object.keys(backgrounds).map(item => ({
          ...backgrounds[item],
          value: item,
        }))}
        renderButton={false}
        renderOption={option => (
          <Option
            onClick={onBackgroundChange}
            option={option} />
        )}
        returnValue={option => option.value}
        value={character.background} />

      {/* {flaws && (
        <React.Fragment>
          <header>
            <h2>Select Your Subrace</h2>
          </header>

          <Chooser
            onChange={props.onSubraceChange}
            options={Object.keys(flaws).map(item => ({
              ...flaws[item],
              value: item,
            }))}
            renderOption={option => option.name}
            returnValue={option => option.value}
            value={character.subrace} />
        </React.Fragment>
      )} */}
    </React.Fragment>
  )
}

BackgroundChooser.propTypes = {
  character: PropTypes.object.isRequired,
  onBackgroundChange: PropTypes.func.isRequired,
  ruleset: PropTypes.object.isRequired,
}





export default BackgroundChooser

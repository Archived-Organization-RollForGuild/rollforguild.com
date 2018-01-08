// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../Chooser/Chooser'
import Component from '../Component'
import FlawChooser from './FlawChooser'
import Option from './Option'





class BackgroundChooser extends Component {
  constructor (props) {
    super(props)

    console.log('BackgroundChooser', props)
  }

  render () {
    const {
      character,
      onBackgroundChange,
      onFlawChange,
      ruleset,
    } = this.props
    const { backgrounds } = ruleset['player-characters']
    const flaws = character.background ? backgrounds[character.background].flaws : null

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

        {flaws && (
          <FlawChooser
            character={character}
            flaws={flaws}
            onChange={onFlawChange} />
        )}
      </React.Fragment>
    )
  }
}

BackgroundChooser.propTypes = {
  character: PropTypes.object.isRequired,
  onBackgroundChange: PropTypes.func.isRequired,
  onFlawChange: PropTypes.func.isRequired,
  ruleset: PropTypes.object.isRequired,
}





export default BackgroundChooser

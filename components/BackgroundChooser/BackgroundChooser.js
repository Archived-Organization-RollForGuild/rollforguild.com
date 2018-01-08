// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import BondChooser from './BondChooser'
import Chooser from '../Chooser/Chooser'
import Component from '../Component'
import FlawChooser from './FlawChooser'
import IdealChooser from './IdealChooser'
import PersonalityTraitChooser from './PersonalityTraitChooser'
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
      onBondChange,
      onFlawChange,
      onIdealChange,
      onPersonalityTraitChange,
      ruleset,
    } = this.props
    const { backgrounds } = ruleset['player-characters']
    const bonds = character.background ? backgrounds[character.background].bonds : null
    const flaws = character.background ? backgrounds[character.background].flaws : null
    const ideals = character.background ? backgrounds[character.background].ideals : null
    const personalityTraits = character.background ? backgrounds[character.background]['personality-traits'] : null

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

        {personalityTraits && (
          <PersonalityTraitChooser
            character={character}
            personalityTraits={personalityTraits}
            onChange={onPersonalityTraitChange} />
        )}

        {ideals && (
          <IdealChooser
            character={character}
            ideals={ideals}
            onChange={onIdealChange} />
        )}

        {bonds && (
          <BondChooser
            character={character}
            bonds={bonds}
            onChange={onBondChange} />
        )}

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

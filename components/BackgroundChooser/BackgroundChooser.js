// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import BackgroundPropChooser from './BackgroundPropChooser'
import Chooser from '../Chooser/Chooser'
import Component from '../Component'
import Option from './Option'





class BackgroundChooser extends Component {
  constructor (props) {
    super(props)
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

        {character.background && (
          <div className="background-props">
            <div className="personality-traits">
              <BackgroundPropChooser
                options={personalityTraits}
                onChange={onPersonalityTraitChange}
                title="Personality Traits"
                value={character['personality-trait']} />
            </div>

            <div className="ideals">
              <BackgroundPropChooser
                options={ideals}
                onChange={onIdealChange}
                title="Ideals"
                value={character.ideal} />
            </div>

            <div className="bonds">
              <BackgroundPropChooser
                options={bonds}
                onChange={onBondChange}
                title="Bonds"
                value={character.bond} />
            </div>

            <div className="flaws">
              <BackgroundPropChooser
                options={flaws}
                onChange={onFlawChange}
                title="Flaws"
                value={character.flaw} />
            </div>
          </div>
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

// Module imports
import React from 'react'
import Stepzilla from 'react-stepzilla'





// Component imports
import AbilityScoreEditor from '../components/AbilityScoreEditor'
import Chooser from '../components/Chooser'
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Character Builder'





class CharacterBuilder extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleChange'])

    const abilities = {}

    for (const ability of Object.keys(props.ruleset['player-characters']['ability-scores'])) {
      abilities[ability] = props.ruleset['player-characters']['ability-scores'][ability].base
    }

    this.state = {
      abilities,
      class: null,
      race: null,
    }
  }

  render () {
    const { ruleset } = this.props

    return (
      <Stepzilla
        steps={[
          {
            name: 'Choose your race...',
            component: <Chooser
              onChange={(value) => this.setState({ race: value })}
              options={ruleset['player-characters'].races}
              value={this.state.race} />,
          },
          {
            name: 'Choose your class...',
            component: <Chooser
              onChange={(value) => this.setState({ class: value })}
              options={ruleset['player-characters'].classes}
              value={this.state.class} />,
          },
          {
            name: 'Determine your ability scores...',
            component: <AbilityScoreEditor
              abilities={ruleset['player-characters']['ability-scores']}
              onChange={(ability, score) => this.setState({ abilities: { ...this.state.abilities, [ability]: score } })}
              scores={this.state.abilities} />,
          },
        ]} />
    )
  }
}





const mapStateToDispatch = ['createCharacter']

const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] })





export default Page(CharacterBuilder, title, {
  mapStateToDispatch,
  mapStateToProps,
})

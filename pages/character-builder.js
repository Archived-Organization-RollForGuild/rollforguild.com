// Module imports
import React from 'react'
import Stepzilla from 'react-stepzilla'





// Component imports
import AbilityScoreEditor from '../components/AbilityScoreEditor'
import CharacterDescriptionEditor from '../components/CharacterDescriptionEditor'
import ClassChooser from '../components/ClassChooser'
import Component from '../components/Component'
import Page from '../components/Page'
import RaceChooser from '../components/RaceChooser'





// Component constants
const title = 'Character Builder'





class CharacterBuilder extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _getBaseAbilityScores (ruleset) {
    if (ruleset) {
      const abilityScores = ruleset['player-characters']['ability-scores']

      return Object.keys(abilityScores).reduce((accumulator, ability) => ({
        ...accumulator,
        [ability]: abilityScores[ability].base,
      }), {})
    }

    return null
  }

  static _getBaseDescription (ruleset) {
    if (ruleset) {
      const { description } = ruleset['player-characters']

      return Object.keys(description).reduce((accumulator, property) => ({
        ...accumulator,
        [property]: '',
      }), {})
    }

    return null
  }

  _handleAbilityScoreChange (ability, score) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        'ability-scores': {
          ...character['ability-scores'],
          [ability]: score,
        },
      },
    })
  }

  _handleDescriptionChange (property, value) {
    const { character } = this.state

    const description = {
      ...character.description,
      [property]: value,
    }

    this.setState({
      character: {
        ...character,
        description,
      },
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidUpdate () {
    console.group('Character updated:')
    console.log(JSON.stringify(this.state.character, null, 2))
    console.groupEnd()
  }

  async componentDidMount () {
    if (!this.props.ruleset) {
      this.setState({ loading: true })
      await this.props.getRuleset('dnd-5e')
      this.setState({ loading: false })
    }
  }

  componentWillReceiveProps (nextProps) {
    const character = { ...this.state.character }

    if (nextProps.ruleset) {
      if (!character['ability-scores']) {
        character['ability-scores'] = CharacterBuilder._getBaseAbilityScores(nextProps.ruleset)
      }

      if (!character.description) {
        character.description = CharacterBuilder._getBaseDescription(nextProps.ruleset)
      }

      this.setState({ character })
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleAbilityScoreChange',
      '_handleChange',
      '_handleDescriptionChange',
    ])

    this.state = {
      character: {
        'ability-scores': CharacterBuilder._getBaseAbilityScores(props.ruleset),
        class: null,
        description: CharacterBuilder._getBaseDescription(props.ruleset),
        race: null,
        subrace: null,
      },
      loading: !props.ruleset,
    }
  }

  render () {
    const { ruleset } = this.props
    const {
      character,
      loading,
    } = this.state

    if (!loading && ruleset) {
      return (
        <Stepzilla
          steps={[
            {
              name: 'Choose your race',
              component: <RaceChooser
                onRaceChange={(value) => this.setState({ character: { ...character, race: value } })}
                onSubraceChange={(value) => this.setState({ character: { ...character, subrace: value } })}
                race={character.race}
                subrace={character.subrace} />,
            },
            {
              name: 'Choose your class',
              component: <ClassChooser
                onChange={(value) => this.setState({ character: { ...character, class: value } })}
                class={character.class} />,
            },
            {
              name: 'Determine your ability scores',
              component: <AbilityScoreEditor
                character={character}
                onChange={this._handleAbilityScoreChange}
                ruleset={ruleset} />,
            },
            {
              name: 'Describe yourself',
              component: <CharacterDescriptionEditor
                character={character}
                onChange={this._handleDescriptionChange}
                ruleset={ruleset} />,
            },
          ]} />
      )
    }

    return (<div>Loading...</div>)
  }
}





const mapDispatchToProps = ['createCharacter', 'getRuleset']

const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] || null })





export default Page(CharacterBuilder, title, {
  mapDispatchToProps,
  mapStateToProps,
})

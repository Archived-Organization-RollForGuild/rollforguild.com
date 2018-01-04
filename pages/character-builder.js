// Module imports
import LocalForage from 'localforage'
import React from 'react'
import Router from 'next/router'
import Slider, { createSliderWithTooltip } from 'rc-slider'





// Component imports
import AbilityScoreEditor from '../components/AbilityScoreEditor'
import CharacterDescriptionEditor from '../components/CharacterDescriptionEditor'
import CharacterReview from '../components/CharacterReview'
import RaceAndClassChooser from '../components/RaceAndClassChooser'
import Component from '../components/Component'
import Page from '../components/Page'
import SkillEditor from '../components/SkillEditor'
import Wizard from '../components/Wizard'





// Component constants
const title = 'Character Builder'
const SliderWithTooltip = createSliderWithTooltip(Slider)





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

  static _getBaseSkills (ruleset) {
    if (ruleset) {
      const { skills } = ruleset['player-characters']

      return Object.keys(skills).reduce((accumulator, property) => ({
        ...accumulator,
        [property]: false,
      }), {})
    }

    return null
  }

  static getExperienceFromLevel (level) {
    const levelByExperience = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]

    return levelByExperience[level - 1]
  }

  static getLevelFromExperience (experience) {
    const experienceByLevel = {
      1: 0,
      2: 300,
      3: 900,
      4: 2700,
      5: 6500,
      6: 14000,
      7: 23000,
      8: 34000,
      9: 48000,
      10: 64000,
      11: 85000,
      12: 100000,
      13: 120000,
      14: 140000,
      15: 165000,
      16: 195000,
      17: 225000,
      18: 265000,
      19: 305000,
      20: 355000,
    }

    for (const level of Object.keys(experienceByLevel)) {
      if (experience >= experienceByLevel[level]) {
        return level
      }
    }

    return false
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

  _handleClassChange (value) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        class: value,
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

  _handleExperienceChange (value) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        experience: value,
        level: CharacterBuilder.getLevelFromExperience(value),
      },
    })
  }

  _handleRaceChange (value) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        race: value,
        subrace: null,
      },
    })
  }

  _handleSkillChange (skill, isProficient) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        skills: {
          ...character.skills,
          [skill]: isProficient,
        },
      },
    })
  }

  _handleSubraceChange (value) {
    const { character } = this.state

    this.setState({ character: { ...character, subrace: value } })
  }

  async _onComplete () {
    const { createCharacter } = this.props
    const { character } = this.state

    this.setState({ saving: true })
    const id = await createCharacter(character)
    Router.push(`/my/character?id=${id}`, `/my/characters/${id}`)
  }

  _validateClassChooser () {
    const { character } = this.state

    return character.class
  }

  _validateRaceChooser () {
    const { ruleset } = this.props
    const { character } = this.state
    const { races } = ruleset['player-characters']

    return character.race && (races[character.race].subraces ? character.subrace : true)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidUpdate () {
    // console.group('Character updated:')
    // console.log(JSON.stringify(this.state.character, null, 2))
    // console.groupEnd()

    await LocalForage.setItem('characterInProgress', this.state.character)
  }

  async componentDidMount () {
    const promises = []

    this.setState({ loading: true })

    promises.push(await LocalForage.getItem('characterInProgress'))

    if (!this.props.ruleset) {
      promises.push(await this.props.getRuleset('dnd-5e'))
    }

    const [character] = await Promise.all(promises)

    this.setState({
      loading: false,
      character: character || this.state.character,
    })
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

      if (!character.skills) {
        character.skills = CharacterBuilder._getBaseSkills(nextProps.ruleset)
      }

      this.setState({ character })
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleAbilityScoreChange',
      '_handleChange',
      '_handleClassChange',
      '_handleDescriptionChange',
      '_handleExperienceChange',
      '_handleRaceChange',
      '_handleSkillChange',
      '_handleSubraceChange',
      '_onComplete',
      '_validateClassChooser',
      '_validateRaceChooser',
    ])

    this.state = {
      character: {
        'ability-scores': CharacterBuilder._getBaseAbilityScores(props.ruleset),
        class: null,
        description: CharacterBuilder._getBaseDescription(props.ruleset),
        experience: 0,
        level: 1,
        race: null,
        skills: CharacterBuilder._getBaseSkills(props.ruleset),
        subrace: null,
      },
      loading: !props.ruleset,
      saving: false,
    }
  }

  render () {
    const { ruleset } = this.props
    const {
      character,
      loading,
      saving,
    } = this.state

    if (!loading && !saving && ruleset) {
      return (
        <React.Fragment>
          <Wizard onComplete={this._onComplete}>
            <div className="starting-level" title="Starting level">
              <header>
                <h2>What's your starting level?</h2>
              </header>

              <div className="details">
                <SliderWithTooltip
                  defaultValue={0}
                  // marks={ruleset['player-characters'].stats.level.levels.reduce((accumulator, level) => accumulator[level.level] => , {})}
                  marks={{
                    0: 1,
                    300: 2,
                    900: 3,
                    2700: 4,
                    6500: 5,
                    14000: 6,
                    23000: 7,
                    34000: 8,
                    48000: 9,
                    64000: 10,
                    85000: 11,
                    100000: 12,
                    120000: 13,
                    140000: 14,
                    165000: 15,
                    195000: 16,
                    225000: 17,
                    265000: 18,
                    305000: 19,
                    355000: 20,
                  }}
                  max={355000}
                  min={0}
                  onAfterChange={this._handleExperienceChange}
                  step={null}
                  tipFormatter={value => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} xp`} />
              </div>
            </div>

            <RaceAndClassChooser
              character={character}
              isValidated={this._validateRaceChooser}
              onClassChange={this._handleClassChange}
              onRaceChange={this._handleRaceChange}
              onSubraceChange={this._handleSubraceChange}
              ruleset={ruleset}
              title="Choose your race &amp; class" />

            {/* <RaceChooser
              character={character}
              isValidated={this._validateRaceChooser}
              onRaceChange={this._handleRaceChange}
              onSubraceChange={this._handleSubraceChange}
              ruleset={ruleset}
              title="Choose your race" />

            <ClassChooser
              character={character}
              isValidated={this._validateClassChooser}
              onChange={value => this.setState({ character: { ...character, class: value } })}
              ruleset={ruleset}
              title="Choose your class" /> */}

            <AbilityScoreEditor
              character={character}
              onChange={this._handleAbilityScoreChange}
              ruleset={ruleset}
              title="Set your ability scores" />

            <SkillEditor
              character={character}
              onChange={this._handleSkillChange}
              ruleset={ruleset}
              title="Edit your skills" />

            <CharacterDescriptionEditor
              character={character}
              onChange={this._handleDescriptionChange}
              ruleset={ruleset}
              title="Describe yourself" />

            <CharacterReview
              character={character}
              ruleset={ruleset}
              title="Review your character" />
          </Wizard>
        </React.Fragment>
      )
    }

    if (saving) {
      return (
        <div>Saving...</div>
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

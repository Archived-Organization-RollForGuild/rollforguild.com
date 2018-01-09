// Module imports
import LocalForage from 'localforage'
import React from 'react'
import Router from 'next/router'
import Slider, { createSliderWithTooltip } from 'rc-slider'





// Component imports
import AbilityScoreEditor from '../components/AbilityScoreEditor'
import BackgroundChooser from '../components/BackgroundChooser/BackgroundChooser'
import CharacterDescriptionEditor from '../components/CharacterDescriptionEditor'
import CharacterReview from '../components/CharacterReview'
import RaceAndClassChooser from '../components/RaceAndClassChooser'
import Component from '../components/Component'
import Page from '../components/Page'
import SkillEditor from '../components/SkillEditor'
import Wizard from '../components/Wizard'





// Component constants
const experienceByLevel = {
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
}
const levelByExperience = [0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000, 85000, 100000, 120000, 140000, 165000, 195000, 225000, 265000, 305000, 355000]
const SliderWithTooltip = createSliderWithTooltip(Slider)
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

  static _getExperienceFromLevel (level) {
    return levelByExperience[level - 1]
  }

  static _getLevelFromExperience (experience) {
    for (const minimumExperience of Object.keys(experienceByLevel).reverse()) {
      if (experience >= parseInt(minimumExperience, 10)) {
        return experienceByLevel[minimumExperience]
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

  _handleBackgroundChange (value) {
    const { character } = this.state

    this.setState({ character: { ...character, background: value } })
  }

  _handleBondChange ({ target }) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        bond: target.value,
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
        level: CharacterBuilder._getLevelFromExperience(value),
      },
    })
  }

  _handleFlawChange ({ target }) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        flaw: target.value,
      },
    })
  }

  _handleIdealChange ({ target }) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        ideal: target.value,
      },
    })
  }

  _handlePersonalityTraitChange ({ target }) {
    const { character } = this.state

    this.setState({
      character: {
        ...character,
        'personality-trait': target.value,
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

  _validateBackgroundChooser () {
    const { character } = this.state

    return !!character.background
  }

  _validateClassChooser () {
    const { character } = this.state

    return !!character.class
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
      '_handleBackgroundChange',
      '_handleBondChange',
      '_handleClassChange',
      '_handleDescriptionChange',
      '_handleExperienceChange',
      '_handleFlawChange',
      '_handleIdealChange',
      '_handlePersonalityTraitChange',
      '_handleRaceChange',
      '_handleSkillChange',
      '_handleSubraceChange',
      '_onComplete',
      '_validateBackgroundChooser',
      '_validateClassChooser',
      '_validateRaceChooser',
    ])

    this.state = {
      character: {
        'ability-scores': CharacterBuilder._getBaseAbilityScores(props.ruleset),
        background: null,
        class: null,
        description: CharacterBuilder._getBaseDescription(props.ruleset),
        experience: 0,
        flaw: null,
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
                  defaultValue={CharacterBuilder._getExperienceFromLevel(character.level)}
                  marks={experienceByLevel}
                  max={355000}
                  min={0}
                  onAfterChange={this._handleExperienceChange}
                  step={null}
                  tipFormatter={value => `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} xp`} />
              </div>
            </div>

            <RaceAndClassChooser
              character={character}
              isValidated={this._validateRaceChooser && this._validateClassChooser}
              onClassChange={this._handleClassChange}
              onRaceChange={this._handleRaceChange}
              onSubraceChange={this._handleSubraceChange}
              ruleset={ruleset}
              title="Choose your race &amp; class" />

            <BackgroundChooser
              character={character}
              isValidated={this._validateBackgroundChooser}
              onBackgroundChange={this._handleBackgroundChange}
              onBondChange={this._handleBondChange}
              onFlawChange={this._handleFlawChange}
              onIdealChange={this._handleIdealChange}
              onPersonalityTraitChange={this._handlePersonalityTraitChange}
              ruleset={ruleset}
              title="Choose your background" />

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

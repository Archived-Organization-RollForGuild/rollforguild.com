// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'
import SimpleDropdown from '../components/SimpleDropdown'





// Component constants
const title = 'Character Builder'





class CharacterBuilder extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange (event) {
    const {
      name,
      value,
    } = event.target
    const newState = {}

    newState[name] = value

    this.setState(newState)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleChange'])

    this.state = {
      background: '',
      charisma: '',
      constitution: '',
      dexterity: '',
      ethic: '',
      experience: '',
      intelligence: '',
      moral: '',
      name: '',
      oClass: '',
      race: '',
      strength: '',
      wisdom: '',
    }
  }

  render () {
    const {
      background,
      charisma,
      constitution,
      dexterity,
      ethic,
      experience,
      intelligence,
      moral,
      name,
      oClass,
      race,
      strength,
      wisdom,
    } = this.state
    const backgrounds = [
      'acolyte',
      'pirate',
      'Chump',
      'shmoe',
      'greg',
      'podcaster',
    ]
    const classes = [
      'barb',
      'bard',
      'ranger',
      'quigley',
      'joe',
      'json',
    ]
    const ethics = [
      'chaotic',
      'neutral',
      'lawful',
    ]
    const morals = [
      'good',
      'neutral',
      'evil',
    ]
    const races = [
      'dwarf',
      'other dwarf',
      'high elf',
      'wood elf',
      'dark elf',
    ]

    return (
      <form>
        <header>
          <h2>General Shit</h2>
        </header>

        <input
          name="name"
          onChange={this._handleChange}
          placeholder="Character Name"
          type="text"
          value={name} />

        <SimpleDropdown
          name="race"
          onChange={this._handleChange}
          options={races}
          value={race} />

        <SimpleDropdown
          name="oClass"
          onChange={this._handleChange}
          options={classes}
          value={oClass} />

        <SimpleDropdown
          name="background"
          onChange={this._handleChange}
          options={backgrounds}
          value={background} />

        <SimpleDropdown
          name="ethic"
          onChange={this._handleChange}
          options={ethics}
          value={ethic} />

        <SimpleDropdown
          name="moral"
          onChange={this._handleChange}
          options={morals}
          value={moral} />

        <input
          name="experience"
          onChange={this._handleChange}
          placeholder="XP"
          type="number"
          value={experience} />

        <header>
          <h2>Ability Scores</h2>
        </header>

        <input
          name="strength"
          onChange={this._handleChange}
          placeholder="Strength"
          type="number" />

        <input
          name="constitution"
          onChange={this._handleChange}
          placeholder="Constitution"
          type="number" />

        <input
          name="dexterity"
          onChange={this._handleChange}
          placeholder="Dexterity"
          type="number" />

        <input
          name="intelligence"
          onChange={this._handleChange}
          placeholder="Intelligence"
          type="number" />

        <input
          name="wisdom"
          onChange={this._handleChange}
          placeholder="Wisdom"
          type="number" />

        <input
          name="charisma"
          onChange={this._handleChange}
          placeholder="Charisma"
          type="number" />

        <br />

        name: {name}<br />
        experience: {experience}<br />
        background: {background}<br />
        charisma: {charisma}<br />
        constitution: {constitution}<br />
        dexterity: {dexterity}<br />
        ethic: {ethic}<br />
        experience: {experience}<br />
        intelligence: {intelligence}<br />
        moral: {moral}<br />
        name: {name}<br />
        oClass: {oClass}<br />
        race: {race}<br />
        strength: {strength}<br />
        wisdom: {wisdom}<br />
      </form>
    )
  }
}





export default Page(CharacterBuilder, title)

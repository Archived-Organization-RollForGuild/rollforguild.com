// Module imports
import React from 'react'
import Switch from 'rc-switch'





// Component imports
import { Router } from '../../routes'
import { convertStringToSlug } from '../../helpers'
import AddressInput from '../../components/AddressInput'
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'Create a Group'





class CreateGroup extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _filterDropdownOptions (options, value) {
    const regex = new RegExp(`${value}.*`, 'gi')

    return options.filter(option => regex.test(option))
  }

  async _handleSubmit (event) {
    const { createGroup } = this.props
    const {
      address,
      description,
      discoverable,
      games,
      name,
      slug,
    } = this.state

    event.preventDefault()

    this.setState({ submitting: true })

    const { payload } = await createGroup({
      address: address.formatted_address,
      description,
      discoverable,
      games: games.split(',').map(game => game.trim()),
      name,
      slug: slug || convertStringToSlug(name),
    })
    const groupId = payload.data.id

    if (groupId) {
      return Router.push(`/groups/?id=${groupId}`, `/groups/${groupId}`)
    }

    return this.setState({ submitting: false })
  }

  _isValid () {
    const {
      address,
      name,
    } = this.state

    if (!address || !name) {
      return false
    }

    return true
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleSubmit'])

    this.state = {
      address: '',
      description: '',
      discoverable: true,
      games: '',
      name: '',
      slug: '',
      submitting: false,
    }
  }

  render () {
    const {
      address,
      description,
      discoverable,
      games,
      name,
      slug,
      submitting,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Create a Group</h1>
        </header>

        <form onSubmit={this._handleSubmit}>
          <fieldset>
            <label htmlFor="group-name">
              Group name
            </label>

            <input
              disabled={submitting}
              id="group-name"
              onChange={({ target }) => this.setState({ name: target.value })}
              pattern="[\w\s_-]+"
              placeholder="Quigley's Tavern"
              required
              type="text"
              value={name} />
          </fieldset>

          <fieldset>
            <label htmlFor="permalink">Permalink</label>

            <div className="input-group">
              <label htmlFor="permalink">
                https://rollforguild.com/groups/
              </label>

              <input
                disabled={submitting}
                id="permalink"
                onChange={({ target }) => this.setState({ slug: convertStringToSlug(target.value) })}
                pattern="(\w|-)*"
                placeholder={convertStringToSlug(name)}
                type="text"
                value={slug} />
            </div>
          </fieldset>

          <fieldset>
            <label htmlFor="group-description">
              Group description
            </label>

            <textarea
              aria-describedby="group-description"
              disabled={submitting}
              id="group-description"
              maxLength={1000}
              onChange={({ target }) => this.setState({ description: target.value })}
              placeholder="Tell your members what you'll be playing, or maybe a bit about your GM style."
              value={description} />

            <small>Tell your members what you'll be playing, or maybe a bit about your GM style.</small>
          </fieldset>

          <fieldset>
            <label htmlFor="games">
              What games will you be playing?
            </label>

            <input
              disabled={submitting}
              id="games"
              onChange={({ target }) => this.setState({ games: target.value })}
              placeholder="Use a comma-separated list for multiple games"
              value={games} />

            {/* <Dropdown
              filter={CreateGroup._filterDropdownOptions}
              id="games"
              name="ruleset"
              options={[
                '7th Sea (1st Edition)',
                '7th Sea (2nd Edition)',
                'Advanced Dungeons & Dragons (1st Edition)',
                'Advanced Dungeons & Dragons (2nd Edition)',
                'Adventures in Middle-earth',
                'Ars Magicka',
                'Battletech',
                'Call of Cthulhu',
                'Champions',
                'Changeling: The Dreaming',
                'Changeling: The Lost',
                'Cyberpunk 2020',
                'Dark Heresy',
                'Deadlands',
                'Dungeons & Dragons (3.5 Edition)',
                'Dungeons & Dragons (4th Edition)',
                'Dungeons & Dragons (5th Edition)',
                'Earthdawn',
                'Exalted',
                'Fate',
                'Firefly',
                'Gamma World',
                'GURPS',
                'Iron Kindoms',
                'Legend of the Five Rings',
                'Mage: The Ascension',
                'Mage: The Awakening',
                'Marvel Superheroes',
                'MechWarrior',
                'Mutants & Masterminds',
                'Numenera',
                'Palladium',
                'Paranoia',
                'Pendragon',
                'Pathfinder',
                'Rifts',
                'Robotech',
                'Rolemaster',
                'RuneQuest',
                'Savage Worlds',
                'Shadowrun',
                'Star Wars',
                'Star Wars: Edge of the Empire',
                'Traveller',
                'Vampire: The Dark Ages',
                'Vampire: The Masquerade',
                'Warhammer',
                'Warhammer 40,000',
                'Werewolf: The Apocalypse',
                'World of Darkness',
              ]} /> */}
          </fieldset>

          <fieldset>
            <label htmlFor="address">
              Where will you be playing?
            </label>

            <AddressInput
              disabled={submitting}
              id="address"
              onChange={value => this.setState({ address: value })}
              required
              value={address} />
          </fieldset>

          <fieldset className="horizontal">
            <label htmlFor="discoverable">
              Should your group show up in searches?
            </label>

            <Switch
              disabled={submitting}
              checked={discoverable}
              id="discoverable"
              onChange={isChecked => this.setState({ discoverable: isChecked })} />
          </fieldset>

          <menu type="toolbar">
            <div className="primary">
              <button
                className="success"
                disabled={submitting || !this._isValid()}>
                Create
              </button>
            </div>
          </menu>
        </form>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['createGroup']





export default Page(CreateGroup, title, { mapDispatchToProps })

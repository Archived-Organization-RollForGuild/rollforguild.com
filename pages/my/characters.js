// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fragment } from 'react'





// Component imports
import Link from '../../components/Link'
import Component from '../../components/Component'
import connect from '../../helpers/connect'





// style={{ backgroundImage: `url(//via.placeholder.com/500x500?text=${encodeURIComponent(character.name)})` }}
class MyCharacters extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  static authenticationRequired = true

  state = { loading: true }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    this.setState({ loading: true })
    await this.props.getCharactersForUser()
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state

    const {
      characters,
    } = this.props

    return (
      <Fragment>
        <header>
          <h1>My Characters!</h1>

          <menu type="toolbar" />
        </header>

        {loading && (
          <span>Loading...</span>
        )}

        {!loading && (
          <ul className="characters">
            {Object.values(characters || {}).map(character => (
              <li key={character.id}>
                <Link
                  category="My Characters"
                  label="Character Card"
                  route="character profile"
                  params={{ id: character.id }}>
                  <a style={{ backgroundImage: `url(//api.adorable.io/avatars/500/${encodeURIComponent(character.id)})` }}>
                    <div className="name">{character.description.name}</div>
                    <div className="short-description">Lvl {character.level} {character.race} {character.class}</div>
                  </a>
                </Link>
              </li>
            ))}

            <li className="create">
              <Link
                category="My Characters"
                label="Create New Character"
                route="/character-builder">
                <a>
                  <FontAwesomeIcon icon="plus" fixedWidth />
                  Add New
                </a>
              </Link>
            </li>
          </ul>
        )}
      </Fragment>
    )
  }





  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = ['getCharactersForUser']

  static mapStateToProps = state => ({
    characters: state.characters.characters, //.filter(character => character.owner === state.user.id),
  })
}





export default connect(MyCharacters)

// Module imports
import { Fragment } from 'react'





// Component imports
import { Link } from '../../routes'
import Component from '../../components/Component'
import Page from '../../components/Page'





// Component constants
const title = 'My Characters'





// style={{ backgroundImage: `url(//via.placeholder.com/500x500?text=${encodeURIComponent(character.name)})` }}
class MyCharacters extends Component {
  async componentDidMount () {
    this.setState({ loading: true })
    await this.props.getCharactersForUser()
    this.setState({ loading: false })
  }

  constructor (props) {
    super(props)

    this.state = { loading: true }
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
                  as={`/my/characters/${encodeURIComponent(character.id)}`}
                  href={`/my/character?id=${encodeURIComponent(character.id)}`}>
                  <a style={{ backgroundImage: `url(//api.adorable.io/avatars/500/${encodeURIComponent(character.id)})` }}>
                    <div className="name">{character.description.name}</div>
                    <div className="short-description">Lvl {character.level} {character.race} {character.class}</div>
                  </a>
                </Link>
              </li>
            ))}

            <li className="create">
              <Link href="/character-builder">
                <a>
                  <i className="fa fa-fw fa-plus" />
                  Add New
                </a>
              </Link>
            </li>
          </ul>
        )}
      </Fragment>
    )
  }
}





const mapDispatchToProps = ['getCharactersForUser']

const mapStateToProps = state => ({
  characters: state.characters.characters, //.filter(character => character.owner === state.user.id),
})





export default Page(MyCharacters, title, {
  mapStateToProps,
  mapDispatchToProps,
})

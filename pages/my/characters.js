// Module imports
import { Fragment } from 'react'
import Link from 'next/link'





// Component imports
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
            {this.props.characters.map(character => (
              <li key={Math.random()}>
                <Link href={`/character/${encodeURIComponent(character.description.name)}`}>
                  <a style={{ backgroundImage: `url(//api.adorable.io/avatars/500/${encodeURIComponent(character.description.name)})` }}>
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
  ...state.characters,
  characters: state.characters.characters, //.filter(character => character.owner === state.user.id),
})





export default Page(MyCharacters, title, {
  mapStateToProps,
  mapDispatchToProps,
})

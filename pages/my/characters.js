// Module imports
import { Fragment } from 'react'
import Link from 'next/link'





// Component imports
import Page from '../../components/Page'





// Component constants
const title = 'My Characters'





// style={{ backgroundImage: `url(//via.placeholder.com/500x500?text=${encodeURIComponent(character.name)})` }}
const MyCharacters = (props) => (
  <Fragment>
    <header>
      <h1>My Characters!</h1>

      <menu type="toolbar" />
    </header>

    <ul className="characters">
      {props.characters.map(character => (
        <li key={character.id}>
          <Link href={`/character/${character.id}`}>
            <a style={{ backgroundImage: `url(//api.adorable.io/avatars/500/${encodeURIComponent(character.name)})` }}>
              <div className="name">{character.name}</div>
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
  </Fragment>
)





const mapStateToProps = state => ({
  ...state.characters,
  characters: state.characters.characters.filter(character => character.owner === state.user.id),
})





export default Page(MyCharacters, title, { mapStateToProps })

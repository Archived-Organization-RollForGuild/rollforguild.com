// Module imports
import { Fragment } from 'react'





// Component imports
import Page from '../../components/Page'





// Component constants
const title = 'My Characters'





const MyCharacters = (props) => (
  <Fragment>
    <h1>My Characters!</h1>

    <ul className="characters">
      {props.characters.map(character => (
        <li key={character.id}>
          <table>
            <tbody>
              <tr>
                <th>Name</th>

                <td>{character.name}</td>
              </tr>

              <tr>
                <th>Level</th>

                <td>{character.level}</td>
              </tr>

              <tr>
                <th>Race</th>

                <td>{character.race}</td>
              </tr>

              <tr>
                <th>Class</th>

                <td>{character.class}</td>
              </tr>
            </tbody>
          </table>
        </li>
      ))}
    </ul>
  </Fragment>
)





const mapStateToProps = state => ({
  ...state.characters,
  characters: state.characters.characters.filter(character => character.owner === state.user.id),
})





export default Page(MyCharacters, title, { mapStateToProps })

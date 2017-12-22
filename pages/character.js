// Module imports
import React from 'react'





// Component imports
import Component from '../components/Component'
import Page from '../components/Page'





// Component constants
const title = 'Character'





class Character extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    await this.props.getCharacter(this.props.query.id)
  }

  render () {
    const { character } = this.props

    return (
      <div>
        <header>
          <h2>General Shit</h2>
        </header>

        <table>
          <tbody>
            {Object.keys(character).map(property => (
              <tr>
                <th>{property}</th>
                <td>{character[property]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}





const mapDispatchToProps = ['getCharacter']

const mapStateToProps = state => ({ ...state.character })





export default Page(Character, title, {
  mapStateToProps,
  mapDispatchToProps,
})

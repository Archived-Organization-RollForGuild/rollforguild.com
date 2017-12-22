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
    this.setState({ loading: true })
    await this.props.getCharacter(this.props.query.id)
    this.setState({ loading: false })
  }

  constructor (props) {
    super(props)

    this.state = { loading: true }
  }

  render () {
    const { character } = this.props
    const { loading } = this.state

    return (
      <div>
        <header>
          <h2>General Shit</h2>
        </header>

        {loading && (
          <span>Loading...</span>
        )}

        {(!loading && !character) && (
          <span>No character found.</span>
        )}

        {(!loading && character) && (
          <table>
            <tbody>
              {Object.keys(character).map(property => (
                <tr key={property}>
                  <th>{property}</th>
                  <td>{character[property]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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

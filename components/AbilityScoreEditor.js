// Module imports
import AbilityScore from './AbilityScore'
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleChange () {
    if (this.props.onChange) {
      this.props.onChange(...arguments)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleChange'])
  }

  render () {
    const {
      abilities,
      character,
    } = this.props

    return (
      <ul className="ability-score-editor">
        {Object.keys(abilities).map(ability => (
          <li key={ability}>
            <AbilityScore
              {...abilities[ability]}
              editable
              onChange={this._handleChange}
              ability={ability}
              character={character} />
          </li>
        ))}
      </ul>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    const propsMatch = nextProps === this.props
    const statesMatch = nextState === this.state
    let abilityScoresMatch = true

    for (const ability of Object.keys(nextProps.character['ability-scores'])) {
      const newScore = nextProps.character['ability-scores'][ability]
      const oldScore = this.props.character['ability-scores'][ability]

      abilityScoresMatch = newScore === oldScore
      if (!abilityScoresMatch) {
        break
      }
    }

    return !propsMatch || !statesMatch || !abilityScoresMatch
  }
}

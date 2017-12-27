// Module imports
import Component from './Component'
import IndividualAbilityScoreEditor from './IndividualAbilityScoreEditor'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleChange (event) {
    const { target } = event

    if (this.props.onChange) {
      this.props.onChange(target.name, parseInt(target.value, 10))
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
      <ul>
        {Object.keys(abilities).map(ability => (
          <IndividualAbilityScoreEditor
            {...abilities[ability]}
            key={ability}
            onChange={this._handleChange}
            ability={ability}
            character={character} />
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

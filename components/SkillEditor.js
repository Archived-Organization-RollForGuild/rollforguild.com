// Module imports
import Switch from 'rc-switch'





// Component imports
import Component from './Component'





export default class BinaryFeatureEditor extends Component {
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
      character,
      ruleset,
    } = this.props
    const { skills } = ruleset['player-characters']

    return (
      <table className="skill-editor">
        <thead>
          <tr>
            <th>Proficient</th>
            <th>Skill</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(skills).map(skill => {
            const {
              name,
              value,
            } = skills[skill]

            return (
              <tr key={name}>
                <td>
                  <Switch
                    checked={character.skills[skill]}
                    onChange={isProficient => this._handleChange(skill, isProficient)} />
                </td>
                <td>{name}</td>
                <td>{value(character, ruleset)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   const propsMatch = nextProps === this.props
  //   const statesMatch = nextState === this.state
  //   let abilityScoresMatch = true

  //   if (nextProps.character['ability-scores']) {
  //     for (const ability of Object.keys(nextProps.character['ability-scores'])) {
  //       const newScore = nextProps.character['ability-scores'][ability]
  //       const oldScore = this.props.character['ability-scores'][ability]

  //       abilityScoresMatch = newScore === oldScore

  //       if (!abilityScoresMatch) {
  //         break
  //       }
  //     }
  //   }

  //   return !propsMatch || !statesMatch || !abilityScoresMatch
  // }
}

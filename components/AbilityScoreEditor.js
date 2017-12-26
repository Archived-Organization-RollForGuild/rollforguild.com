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
      scores,
    } = this.props

    return (
      <ul>
        {Object.keys(abilities).map(ability => (
          <IndividualAbilityScoreEditor
            {...abilities[ability]}
            key={ability}
            onChange={this._handleChange}
            safeName={ability}
            score={scores[ability]} />
        ))}
      </ul>
    )
  }
}

// Module imports
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(event)
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
      abbreviation,
      ability,
      character,
      max,
      min,
      modifier,
      name,
      racialModifier,
    } = this.props

    const score = character['ability-scores'][ability]

    return (
      <div className="individual-ability-score-editor">
        <input
          id={ability}
          max={max}
          min={min}
          name={ability}
          onChange={this.props.onChange}
          type="number"
          value={score} />

        <label htmlFor={ability}><abbr title={name}>{abbreviation}</abbr></label>

        <div className="breakdown">
          <span className="base">
            {score}
          </span>

          <span className="racial-modifier">
            {racialModifier ? racialModifier(character) : 0}
          </span>

          <span className="natural-modifier">
            {modifier ? modifier(character) : 0}
          </span>
        </div>
      </div>
    )
  }

  shouldComponentUpdate (nextProps) {
    const {
      ability,
      character,
    } = this.props

    const newScore = nextProps.character['ability-scores'][ability]
    const oldScore = character['ability-scores'][ability]

    return newScore !== oldScore
  }
}

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
      // modifier,
      name,
      racialModifier,
    } = this.props
    const score = character['ability-scores'][ability]
    // const calculatedNaturalModifier = modifier ? modifier(character) : 0
    const calculatedOtherModifier = 0
    const calculatedRacialModifier = racialModifier ? racialModifier(character) : 0

    return (
      <div className="ability-score">
        <label htmlFor={ability}><abbr title={name}>{abbreviation}</abbr></label>

        <input
          id={ability}
          max={max}
          min={min}
          name={ability}
          onChange={this.props.onChange}
          type="number"
          value={score + calculatedOtherModifier + calculatedRacialModifier} />

        <div className="breakdown">
          <span className="base">
            {score}
          </span>

          <span className="delimiter">+</span>

          <span className="racial">
            {calculatedRacialModifier}
          </span>

          <span className="delimiter">+</span>

          <span className="other">
            {calculatedOtherModifier}
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

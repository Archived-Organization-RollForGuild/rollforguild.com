// Module imports
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleChange (event) {
    if (this.props.onChange) {
      const {
        ability,
        character,
        // racialModifier,
      } = this.props
      const score = character['ability-scores'][ability]
      const scoreCalculated = score || 0
      const otherModifiersCalculated = 0
      const racialModifierCalculated = 2 //racialModifier ? racialModifier(character) : 0
      const value = scoreCalculated + (event.target.valueAsNumber - scoreCalculated - racialModifierCalculated - otherModifiersCalculated)

      this.props.onChange(ability, value)
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
      editable,
      max,
      min,
      modifier,
      name,
      // racialModifier,
    } = this.props
    const score = character['ability-scores'][ability]
    const calculatedNaturalModifier = modifier ? modifier(character) : 0
    const otherModifiersCalculated = 0
    const racialModifiersCalculated = 2 //racialModifier ? racialModifier(character) : 0
    const allModifiersCalculated = racialModifiersCalculated + otherModifiersCalculated

    return (
      <div className="ability-score">
        <label htmlFor={ability}><abbr title={name}>{abbreviation}</abbr></label>

        <div className="score">
          {editable && (
            <input
              id={ability}
              max={max}
              min={min + allModifiersCalculated}
              name={ability}
              onChange={this._handleChange}
              type="number"
              value={score ? (score + allModifiersCalculated) : ''} />
          )}

          {!editable && (
            <span>{score + allModifiersCalculated}</span>
          )}

          <div className="modifier">
            <span>Mod</span>
            <span>{calculatedNaturalModifier >= 0 ? '+' : null}{calculatedNaturalModifier}</span>
          </div>
        </div>

        <div className="breakdown">
          <span className="base">
            {score || '-'}
          </span>

          <span className="delimiter">+</span>

          <span className="racial">
            {racialModifiersCalculated}
          </span>

          <span className="delimiter">+</span>

          <span className="other">
            {otherModifiersCalculated}
          </span>

          <span className="delimiter">=</span>

          <span className="total">
            {score ? (score + allModifiersCalculated) : '-'}
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

// Module imports
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(this.props.ability, event.target.valueAsNumber)
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
      ability,
      breakdown,
      character,
      editable,
      // racialModifier,
      ruleset,
    } = this.props
    const {
      abbreviation,
      max,
      min,
      modifier,
      name,
    } = ruleset['player-characters']['ability-scores'][ability]
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
              min={min}
              name={ability}
              onChange={this._handleChange}
              type="number"
              value={score || ''} />
          )}

          {!editable && (
            <span>{score}</span>
          )}

          <div className="modifier-container">
            <label>Mod</label>
            <span className="modifier">{calculatedNaturalModifier >= 0 ? '+' : null}{calculatedNaturalModifier}</span>
          </div>
        </div>

        {(breakdown !== 'none') && (
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
        )}
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

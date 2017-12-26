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
      max,
      min,
      modifier,
      name,
      safeName,
      score,
    } = this.props

    console.log('Rendering', name)

    return (
      <div>
        <label htmlFor={safeName}>{name}</label>

        <input
          id={safeName}
          max={max}
          min={min}
          name={safeName}
          onChange={this.props.onChange}
          type="number"
          value={score} />

        {!!modifier && modifier(score)}
      </div>
    )
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.score !== this.props.score
  }
}

// Module imports
import Component from './Component'





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

  isValidated () {
    return !!this.props.value
  }

  render () {
    const {
      abilities,
      scores,
    } = this.props

    console.log(abilities)

    return (
      <table>
        <tbody>
          {Object.keys(abilities).map(ability => {
            const {
              max,
              min,
              modifier,
              name,
            } = abilities[ability]

            return (
              <tr key={ability}>
                <th>
                  <label htmlFor={ability}>{name}</label>
                </th>

                <td>
                  <input
                    id={ability}
                    max={max}
                    min={min}
                    name={ability}
                    onChange={this._handleChange}
                    type="number"
                    value={scores[ability]} />
                </td>

                <td>
                  {modifier(scores[ability])}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

// Module imports
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleChange (event) {
    const { target } = event

    if (this.props.onChange) {
      this.props.onChange(target.name, target.value)
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
    const { description } = ruleset['player-characters']

    return (
      <form>
        {Object.keys(description).map(property => {
          const {
            name,
            options,
            placeholder,
            type,
          } = description[property]
          const value = character.description[property]

          return (
            <fieldset
              data-name={property}
              key={property}>
              <label htmlFor={property}>{name}</label>

              {['number', 'text'].includes(type) && (
                <input
                  id={property}
                  name={property}
                  onChange={this._handleChange}
                  placeholder={placeholder}
                  type={type}
                  value={value} />
                )}

              {type === 'long-text' && (
                <textarea
                  id={property}
                  name={property}
                  onChange={this._handleChange}
                  placeholder={placeholder}
                  value={value} />
                )}

              {type === 'select' && (
                <select
                  id={property}
                  name={property}
                  onChange={this._handleChange}
                  value={value}>
                  {options.map(option => (
                    <option value={option}>{option}</option>
                  ))}
                </select>
              )}
            </fieldset>
          )
        })}
      </form>
    )
  }
}

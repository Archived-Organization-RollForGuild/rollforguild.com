// Module imports
import React from 'react'





// Module imports
// import Combobox from './Combobox'
import Component from './Component'
import Dropdown from './Dropdown'





export default class extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _filterDropdownOptions (options, value) {
    const regex = new RegExp(`${value}.*`, 'gi')

    return options.filter(option => regex.test(option))
  }

  _handleAlignmentChange (alignment) {
    if (this.props.onChange) {
      this.props.onChange('alignment', alignment)
    }
  }

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

    this._bindMethods([
      '_handleAlignmentChange',
      '_handleChange',
    ])
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
            <fieldset key={property}>
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
                <Dropdown
                  filter={Dropdown._filterDropdownOptions}
                  name={property}
                  options={options}
                  placeholder="Choose your alignment..." />
              )}
            </fieldset>
          )
        })}
      </form>
    )
  }
}

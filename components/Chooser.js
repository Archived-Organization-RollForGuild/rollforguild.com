// Module imports
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleClick (option) {
    const {
      onChange,
      returnValue,
      value,
    } = this.props

    if (onChange && (value !== option)) {
      onChange(returnValue ? returnValue(option) : option)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  isValidated () {
    return !!this.props.value
  }

  render () {
    const {
      options,
      renderOption,
      value,
    } = this.props

    let renderedOptions = options

    if (!Array.isArray(options) && (typeof options === 'object')) {
      renderedOptions = Object.keys(options).map(key => options[key])
    }

    renderedOptions = renderedOptions.map(option => {
      if (typeof option === 'string') {
        return {
          name: option,
          value: option,
        }
      }

      return option
    })

    renderedOptions = renderedOptions.map(option => {
      const renderedOption = renderOption ? renderOption(option) : option

      return (
        <button
          className={(value === option.value) ? 'active' : null}
          key={renderedOption}
          onClick={() => this._handleClick(option)}>
          {renderedOption}
        </button>
      )
    })

    return (
      <div>
        {renderedOptions}
      </div>
    )
  }
}

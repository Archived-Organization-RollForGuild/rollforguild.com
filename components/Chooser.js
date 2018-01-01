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
    const optionValue = returnValue ? returnValue(option) : option

    if (onChange) {
      if (value !== optionValue) {
        onChange(optionValue)
      } else {
        onChange(null)
      }
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    const {
      className,
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
      const classes = []

      if (value) {
        if (value === option.value) {
          classes.push('active')
        } else {
          classes.push('inactive')
        }
      }

      return (
        <li key={renderedOption}>
          <button
            className={classes.join(' ')}
            onClick={() => this._handleClick(option)}>
            {renderedOption}
          </button>
        </li>
      )
    })

    return (
      <ul className={['chooser', className || null].join(' ')}>
        {renderedOptions}
      </ul>
    )
  }
}

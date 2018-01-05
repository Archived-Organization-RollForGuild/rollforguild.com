// Module imports
import PropTypes from 'prop-types'




// Module imports
import Component from './Component'





class Chooser extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleClick (option) {
    const {
      onChange,
      renderButton,
      returnValue,
      value,
    } = this.props
    const optionValue = returnValue(option)

    if (renderButton && onChange) {
      if (value !== optionValue) {
        onChange(optionValue)
      } else {
        onChange(null)
      }
    }
  }

  _renderOption (option) {
    const {
      renderButton,
      renderOption,
      value,
    } = this.props
    const renderedOption = renderOption(option)
    const classes = []

    if (value) {
      if (value === option.value) {
        classes.push('active')
      } else {
        classes.push('inactive')
      }
    }

    if (renderButton) {
      return (
        <li key={renderedOption}>
          <button
            className={classes.join(' ')}
            onClick={() => this._handleClick(option)}>
            {renderedOption}
          </button>
        </li>
      )
    }

    return (
      <li
        className={classes.join(' ')}
        key={renderedOption}>
        {renderedOption}
      </li>
    )
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_renderOption'])
  }

  render () {
    const {
      className,
      options,
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

    renderedOptions = renderedOptions.map(this._renderOption)

    return (
      <ul className={['chooser', className || null].join(' ')}>
        {renderedOptions}
      </ul>
    )
  }
}

Chooser.defaultProps = {
  className: null,
  onChange: null,
  renderButton: true,
  renderOption: option => option,
  returnValue: option => option,
  value: null,
}

Chooser.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  renderButton: PropTypes.bool,
  renderOption: PropTypes.func,
  returnValue: PropTypes.func,
  value: PropTypes.any,
}





export default Chooser

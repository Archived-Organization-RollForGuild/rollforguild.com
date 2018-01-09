// Module imports
import PropTypes from 'prop-types'




// Module imports
import Component from '../Component'
import Option from './Option'
import OptionAsButton from './OptionAsButton'





class Chooser extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _renderOption (option, index) {
    const {
      onChange,
      renderButton,
      renderOption,
      returnValue,
      value,
    } = this.props
    const optionValue = returnValue(option)
    let active = false
    let inactive = false

    if (value) {
      if (value === optionValue) {
        active = true
      } else {
        inactive = true
      }
    }

    const renderedOption = renderOption(option, index, active)

    let classes = []

    if (active) {
      classes.push('active')
    }

    if (inactive) {
      classes.push('inactive')
    }

    classes = classes.join(' ')

    if (renderButton) {
      return (
        <OptionAsButton
          className={classes}
          key={optionValue}
          onClick={onChange}
          value={optionValue}>
          {renderedOption}
        </OptionAsButton>
      )
    }

    return (
      <Option
        className={classes}
        key={optionValue}>
        {renderedOption}
      </Option>
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

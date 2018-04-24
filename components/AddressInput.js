// Module imports
import getConfig from 'next/config'
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import Dropdown from './Dropdown'





// Component constants
const { publicRuntimeConfig } = getConfig()
const googleMapsAPIKey = publicRuntimeConfig.apis.googleMaps.key





class AddressInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleChange (value) {
    if (this.valid && this.props.onChange) {
      this.props.onChange('')
    }

    this.setState({
      value,
      valid: false,
    })

    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${googleMapsAPIKey}&address=${value}`)

    response = await response.json()

    this.setState({ options: response.results })
  }

  async _handleSelect (value) {
    const { onChange } = this.props

    this.setState({
      value,
      valid: true,
    })

    onChange(value)
  }

  static _renderValue (value) {
    if (typeof value === 'string') {
      return value
    }

    return value.formatted_address
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_handleSelect',
    ])
    this._debounceMethods(['_handleChange'])

    this.state = {
      value: props.value || props.defaultValue || '',
      options: [],
      valid: false,
    }
  }

  render () {
    const {
      className,
      required,
    } = this.props

    const {
      options,
      value,
    } = this.state

    const classes = []

    if (className) {
      classes.push(className)
    }

    if (this.valid || (!required && !value)) {
      classes.push('valid')
    }

    return (
      <Dropdown
        {...this.renderProps}
        className={classes.join(' ')}
        name="address"
        onChange={this._handleChange}
        onSelect={this._handleSelect}
        options={options}
        renderOption={AddressInput._renderValue}
        renderValue={AddressInput._renderValue}
        searchable
        value={value} />
    )
  }





  /***************************************************************************\
    Getter Methods
  \***************************************************************************/

  get renderProps () {
    const newProps = { ...this.props }

    delete newProps.className
    delete newProps.defaultValue
    delete newProps.value

    return newProps
  }

  get valid () {
    return this.state.valid
  }
}





AddressInput.defaultProps = {
  defaultValue: undefined,
  onChange: null,
  placeholder: 'Enter an address...',
  required: false,
  value: undefined,
}

AddressInput.propTypes = {
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}





export default AddressInput

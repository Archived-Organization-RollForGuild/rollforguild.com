// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import Dropdown from './Dropdown'





// Component constants
const gmapsAPIKey = preval`module.exports = process.env.RFG_GOOGLE_MAPS_API_KEY`





class AddressInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleChange (value) {
    this.setState({
      value,
      valid: false,
    })

    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${gmapsAPIKey}&address=${value}`)

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

  static _renderOption (value) {
    if (typeof value === 'string') {
      return value
    }

    return value.formatted_address
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
      '_handleSelect',
    ])
    this._debounceMethods(['_handleChange'])

    this.state = {
      value: props.value || '',
      options: [],
      valid: false,
    }
  }

  render () {
    const {
      options,
      value,
    } = this.state

    console.log(this.state.valid)

    return (
      <Dropdown
        {...this.props}
        filter={Dropdown._filterDropdownOptions}
        name="address"
        onChange={this._handleChange}
        onSelect={this._handleSelect}
        options={options}
        placeholder="e.g. 316 W Washington Ave, Madison, WI 53703"
        renderOption={AddressInput._renderOption}
        value={value.formatted_address || value} />
    )
  }
}





AddressInput.defaultProps = {
  onChange: null,
  value: '',
}

AddressInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
}





export default AddressInput

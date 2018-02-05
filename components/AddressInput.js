// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import Dropdown from './Dropdown'





class AddressInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleChange (value) {
    // const {
    //   onChange,
    // } = this.props

    console.log(value, this)

    // onChange(value)

    // if (onChange) {
    //   const newAddress = { ...value }

    //   newAddress[target.name] = target.value

    //   onChange(newAddress)
    // }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._debounceMethods(['_handleChange'])
    this._bindMethods(['_handleChange'])

    this.state = { options: [] }
  }

  render () {
    const {
      className,
      defaultValue,
      id,
    } = this.props
    const { options } = this.state

    return (
      <Dropdown
        className={['address-input', className || null].join(' ')}
        defaultValue={defaultValue}
        id={id}
        placeholder="e.g. 316 W Washington Ave, Madison, WI 53703"
        onChange={this._handleChange}
        options={options} />
    )
  }
}





AddressInput.defaultProps = {
  defaultValue: null,
  // onChange: null,
  // value: null,
}

AddressInput.propTypes = {
  defaultValue: PropTypes.any,
  // onChange: PropTypes.func,
  // value: PropTypes.any,
}





export default AddressInput

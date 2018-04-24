// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'





// Component imports
import { actions } from '../store'
import Component from './Component'
import Dropdown from './Dropdown'





class GameInput extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleChange (value) {
    const {
      getGames,
      onChange,
    } = this.props

    if (this.state.valid && onChange) {
      onChange(null)
    }

    this.setState({
      value,
      valid: false,
    })

    const { payload, status } = await getGames(value)

    if (status === 'success') {
      this.setState({ options: payload.data })
    }
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

    let versionString = value.attributes.version

    // If the version is just a number, append an e (for edition).
    if (!Number.isNaN(+versionString)) {
      versionString = `${versionString}e`
    }

    return `${value.attributes.name} ${versionString}`
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
      options,
      value,
    } = this.state

    return (
      <Dropdown
        {...this.renderProps}
        onChange={this._handleChange}
        onSelect={this._handleSelect}
        options={options}
        renderOption={GameInput._renderValue}
        renderValue={GameInput._renderValue}
        searchable
        value={value} />
    )
  }





  get renderProps () {
    const newProps = { ...this.props }

    delete newProps.defaultValue
    delete newProps.getGames
    delete newProps.value

    return newProps
  }

  get valid () {
    return this.state.valid
  }
}





GameInput.defaultProps = {
  defaultValue: undefined,
  onChange: null,
  placeholder: 'Enter a game...',
  required: false,
  value: undefined,
}

GameInput.propTypes = {
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.any,
}


const mapDispatchToProps = dispatch => bindActionCreators({
  getGames: actions.getGames,
}, dispatch)


export default connect(null, mapDispatchToProps)(GameInput)

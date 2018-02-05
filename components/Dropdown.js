// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'





class Dropdown extends Component {
  _handleBlur () {
    this.setState({ focused: false })
  }

  _handleChange ({ target }) {
    const { onChange } = this.props
    const value = target.value || ''

    this.setState({ value })

    if (onChange) {
      onChange(value)
    }
  }

  _handleFocus () {
    this.setState({ focused: true })
  }

  _handleOptionSelect (option) {
    const { onChange } = this.props

    this.setState({
      focused: false,
      value: option,
    })

    if (onChange) {
      onChange(option)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleBlur',
      '_handleChange',
      '_handleFocus',
      '_handleOptionSelect',
    ])

    this.state = {
      focused: false,
      value: props.defaultValue || '',
    }
  }

  render () {
    const {
      className,
      filter,
      id,
      name,
      options,
      placeholder,
      renderOption,
      renderValue,
    } = this.props
    const {
      focused,
      value,
    } = this.state

    const filteredOptions = filter(options, value) || []

    return (
      <div
        className={['dropdown', (focused ? 'focus' : null), (className || null)].join(' ')}>
        <input
          id={id}
          name={name}
          onChange={this._handleChange}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          placeholder={placeholder}
          ref={_input => this._input = _input}
          value={renderValue(value)} />

        <ul className="options">
          {filteredOptions.map(option => {
            const renderedOption = renderOption(option)

            return (
              <li key={renderedOption}>
                <button
                  onMouseDown={() => this._handleOptionSelect(renderValue(option))}
                  value={renderValue(option)}>
                  {renderOption(option)}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}





Dropdown.defaultProps = {
  defaultValue: null,
  filter: items => items,
  onChange: null,
  renderOption: option => option,
  renderValue: value => value,
  value: null,
}

Dropdown.propTypes = {
  defaultValue: PropTypes.any,
  filter: PropTypes.func,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  renderOption: PropTypes.func,
  renderValue: PropTypes.func,
  value: PropTypes.any,
}





export default Dropdown

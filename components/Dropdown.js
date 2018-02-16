// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'





class Dropdown extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _goToNextOption () {
    const { getOptionId } = this.props
    const { activeOption } = this.state

    const { filteredOptions } = this
    const newState = { focused: true }

    if (!activeOption || (activeOption === getOptionId(filteredOptions[filteredOptions.length - 1]))) {
      newState.activeOption = getOptionId(filteredOptions[0])
    } else {
      const currentOptionIndex = filteredOptions.findIndex(option => getOptionId(option) === activeOption)
      newState.activeOption = getOptionId(filteredOptions[currentOptionIndex + 1])
    }

    this.setState(newState)
  }

  _goToPreviousOption () {
    const { getOptionId } = this.props
    const { activeOption } = this.state

    const { filteredOptions } = this
    const newState = { focused: true }

    if (!activeOption || (activeOption === getOptionId(filteredOptions[0]))) {
      newState.activeOption = getOptionId(filteredOptions[filteredOptions.length - 1])
    } else {
      const currentOptionIndex = filteredOptions.findIndex(option => getOptionId(option) === activeOption)
      newState.activeOption = getOptionId(filteredOptions[currentOptionIndex - 1])
    }

    this.setState(newState)
  }

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

  _handleKeyDown (event) {
    const { getOptionId } = this.props
    const { activeOption } = this.state
    const { key } = event

    switch (key.toLowerCase()) {
      case 'arrowdown':
        this._goToNextOption()
        break

      case 'arrowup':
        this._goToPreviousOption()
        break

      case 'enter':
        this._handleOptionSelect(this.filteredOptions.find(option => getOptionId(option) === activeOption))
        break

      default:
        break
    }
  }

  _toggleFocus () {
    this.setState({ focused: !this.state.focused })
  }

  _handleOptionMouseOver (option) {
    const { getOptionId } = this.props
    const { activeOption } = this.state

    const optionId = getOptionId(option)

    if (activeOption !== optionId) {
      this.setState({ activeOption: optionId })
    }
  }

  _handleOptionSelect (option) {
    const {
      onChange,
      onSelect,
    } = this.props

    this.setState({
      focused: false,
      value: option,
    })

    if (onSelect) {
      onSelect(option)
    } else if (onChange) {
      onChange(option)
    }
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
      '_handleBlur',
      '_handleChange',
      '_handleFocus',
      '_handleKeyDown',
      '_handleOptionMouseOver',
      '_handleOptionSelect',
      '_toggleFocus',
    ])

    this.state = {
      activeOption: null,
      focused: false,
      value: props.value || props.defaultValue || '',
    }
  }

  render () {
    const {
      className,
      id,
      name,
      getOptionId,
      placeholder,
      renderOption,
      renderValue,
      searchable,
    } = this.props
    const {
      activeOption,
      focused,
      value,
    } = this.state

    const { filteredOptions } = this

    return (
      <div className={['dropdown', (focused ? 'focus' : null), (className || null)].join(' ')}>
        {!searchable && (
          <div
            onBlur={this._handleBlur}
            onFocus={this._handleFocus}
            onClick={this._handleFocus}
            onKeyDown={this._handleKeyDown}
            role="button"
            tabIndex={0}>
            {renderValue(value)}
          </div>
        )}

        {searchable && (
          <input
            id={id}
            name={name}
            onChange={this._handleChange}
            onBlur={this._handleBlur}
            onFocus={this._handleFocus}
            placeholder={placeholder}
            ref={_input => this._input = _input}
            value={renderValue(value)} />
        )}

        <ul className="options">
          {filteredOptions.map(option => {
            const renderedOption = renderOption(option)

            return (
              <li key={renderedOption}>
                <button
                  className={activeOption === getOptionId(option) ? 'active' : null}
                  onFocus={this._handleOptionMouseOver}
                  onMouseDown={() => this._handleOptionSelect(option)}
                  onMouseOver={() => this._handleOptionMouseOver(option)}
                  value={option}>
                  {renderedOption}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get filteredOptions () {
    const {
      filter,
      options,
    } = this.props
    const { value } = this.state

    return filter(options, value) || []
  }
}





Dropdown.defaultProps = {
  defaultValue: null,
  filter: items => items,
  onChange: null,
  onSelect: null,
  getOptionId: option => JSON.stringify(option),
  renderOption: option => option,
  renderValue: value => value,
  searchable: false,
  value: null,
}

Dropdown.propTypes = {
  defaultValue: PropTypes.any,
  filter: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  getOptionId: PropTypes.func,
  options: PropTypes.array.isRequired,
  renderOption: PropTypes.func,
  renderValue: PropTypes.func,
  searchable: PropTypes.bool,
  value: PropTypes.any,
}





export default Dropdown

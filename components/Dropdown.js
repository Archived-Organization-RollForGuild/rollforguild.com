// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import ValidatedInput from './ValidatedInput'





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
    let selectedOption = null

    switch (key.toLowerCase()) {
      case 'arrowdown':
        event.preventDefault()
        this._goToNextOption()
        break

      case 'arrowup':
        event.preventDefault()
        this._goToPreviousOption()
        break

      case 'enter':
        event.preventDefault()
        selectedOption = this.filteredOptions.find(option => getOptionId(option) === activeOption)
        if (selectedOption) {
          this._handleOptionSelect(selectedOption)
        }
        break

      case 'escape':
        event.preventDefault()
        this._input.blur()
        break

      default:
        break
    }
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

  _handleScroll () {
    const {
      offsetHeight,
      offsetParent,
      offsetTop,
    } = this._wrapper

    const twentyPercentFromBottom = (offsetParent.offsetHeight * 0.8) + offsetParent.scrollTop
    const dropdownShouldDropUp = (offsetTop + offsetHeight) > twentyPercentFromBottom

    if (dropdownShouldDropUp !== this.state.dropup) {
      this.setState({ dropup: dropdownShouldDropUp })
    }
  }

  _toggleFocus () {
    this.setState({ focused: !this.state.focused })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    if ((typeof window !== 'undefined') && this._wrapper.offsetParent) {
      this._wrapper.offsetParent.addEventListener('scroll', this._handleScroll)
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  componentWillUnmount () {
    if (this._wrapper && this._wrapper.offsetParent) {
      this._wrapper.offsetParent.removeEventListener('scroll', this._handleScroll)
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
      '_handleScroll',
      '_toggleFocus',
    ])

    this._debounceMethods([{
      method: '_handleScroll',
      length: 10,
    }])

    this.state = {
      activeOption: null,
      dropup: false,
      focused: false,
      value: props.value || props.defaultValue || '',
    }
  }

  render () {
    const {
      className,
      getOptionId,
      readOnly,
      renderOption,
      renderValue,
      searchable,
    } = this.props
    const {
      activeOption,
      dropup,
      focused,
      value,
    } = this.state

    const { filteredOptions } = this

    const classes = ['dropdown']

    if (dropup) {
      classes.push('dropup')
    }

    if (focused) {
      classes.push('focus')
    }

    if (searchable) {
      classes.push('searchable')
    }

    if (className) {
      classes.push(className)
    }

    return (
      <div
        className={classes.join(' ')}
        ref={_wrapper => this._wrapper = _wrapper}>
        <ValidatedInput
          {...this.renderProps}
          autoComplete="off"
          onChange={this._handleChange}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          onKeyDown={this._handleKeyDown}
          readOnly={readOnly || !searchable}
          inputRef={_input => this._input = _input}
          value={renderValue(value)} />

        <ul
          className="options"
          ref={_optionsEl => this._optionsEl = _optionsEl}>
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

  get renderProps () {
    const renderProps = { ...this.props }

    delete renderProps.className
    delete renderProps.filter
    delete renderProps.getOptionId
    delete renderProps.onChange
    delete renderProps.onSelect
    delete renderProps.options
    delete renderProps.readOnly
    delete renderProps.renderOption
    delete renderProps.renderValue
    delete renderProps.searchable

    return renderProps
  }
}





Dropdown.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  filter: items => items,
  onChange: null,
  onSelect: null,
  getOptionId: option => JSON.stringify(option),
  readOnly: false,
  renderOption: option => option,
  renderValue: value => value,
  searchable: false,
  value: undefined,
}

Dropdown.propTypes = {
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  filter: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  getOptionId: PropTypes.func,
  readOnly: PropTypes.bool,
  options: PropTypes.array.isRequired,
  renderOption: PropTypes.func,
  renderValue: PropTypes.func,
  searchable: PropTypes.bool,
  value: PropTypes.any,
}





export default Dropdown

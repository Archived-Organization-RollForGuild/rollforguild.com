// Component imports
import Component from './Component'





export default class Dropdown extends Component {
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

  _handleOptionSelect (event) {
    const { target } = event

    this.setState({
      focused: false,
      value: target.value,
    })

    this._input.focus()
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
      value: '',
    }
  }

  render () {
    const {
      className,
      name,
    } = this.props
    const {
      focused,
      value,
    } = this.state
    let { options } = this.props

    if (value) {
      const regex = new RegExp(`${value}.*`, 'gi')

      options = options.filter(option => regex.test(option))
    }

    return (
      <div
        className={['dropdown', (focused ? 'focus' : null), (className || null)].join(' ')}>
        <input
          name={name}
          onInput={this._handleChange}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus}
          ref={_input => this._input = _input}
          value={value} />

        <ul className="options">
          {options.map(option => (
            <li key={option}>
              <button
                onMouseDown={this._handleOptionSelect}
                value={option}>
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

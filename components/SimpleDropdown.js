// Component imports
import Component from './Component'





export default class Dropdown extends Component {
  _handleBlur () {
    this.setState({ focused: false })
  }

  _handleFocus () {
    this.setState({ focused: true })
  }

  constructor (props) {
    super(props)

    this.state = {
      focused: false,
    }
  }

  render () {
    const {
      className,
      name,
      onChange,
      options,
    } = this.props
    const { focused } = this.state

    return (
      <div
        className={['dropdown', className || null].join(' ')}>
        <input
          name={name}
          onChange={onChange}
          onBlur={this._handleBlur}
          onFocus={this._handleFocus} />

        <ul className={focused ? 'focus' : null}>
          {options.map(option => (
            <li key={option}>
              {option}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

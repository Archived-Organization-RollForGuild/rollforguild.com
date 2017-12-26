// Module imports
import Component from './Component'





export default class extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleClick (option) {
    if (this.props.onChange && (this.props.value !== option)) {
      this.props.onChange(option)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  isValidated () {
    return !!this.props.value
  }

  render () {
    const {
      options,
      value,
    } = this.props

    return (
      <div>
        {options.map(option => (
          <button
            className={(value === option) ? 'active' : null}
            key={option}
            onClick={() => this._handleClick(option)}>
            {option}
          </button>
        ))}
      </div>
    )
  }
}

// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from '../Component'





class OptionAsButton extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleClick () {
    const {
      onClick,
      value,
    } = this.props

    onClick(value)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleClick'])
  }

  render () {
    const {
      children,
      className,
    } = this.props

    return (
      <li>
        <button
          className={className}
          onClick={this._handleClick}>
          {children}
        </button>
      </li>
    )
  }
}

OptionAsButton.defaultProps = {
  className: null,
}

OptionAsButton.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any.isRequired,
}





export default OptionAsButton

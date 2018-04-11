// Component imports
import TrackableComponent from './TrackableComponent'





class Button extends TrackableComponent {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onClick (event) {
    const { onClick } = this.props

    this._fireEvent()

    if (onClick) {
      onClick(event)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_onClick'])
  }

  render () {
    return (
      <button
        {...this.renderProps}
        data-t="button:button"
        onClick={this._onClick}>
        {this.props.children}
      </button>
    )
  }
}

Button.defaultProps = {
  action: 'click',
  value: null,
}




export default Button
export { Button }

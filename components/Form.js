// Component imports
import TrackableComponent from './TrackableComponent'





class Form extends TrackableComponent {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onSubmit (event) {
    const { onSubmit } = this.props

    this._fireEvent()

    if (onSubmit) {
      onSubmit(event)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_onSubmit'])
  }

  render () {
    return (
      <form
        {...this.renderProps}
        onSubmit={this._onSubmit}>
        {this.props.children}
      </form>
    )
  }
}





Form.defaultProps = { action: 'submit' }





export default Form

// Component imports
import Component from './Component'





export default class Wizard extends Component {
  _handleNextClick () {
    this.setState({ currentStep: this.state.currentStep + 1 })
  }

  _handlePreviousClick () {
    this.setState({ currentStep: this.state.currentStep - 1 })
  }

  componentWillMount () {
    console.log('Blep')
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleNextClick',
      '_handlePreviousClick',
    ])

    this.state = {
      currentStep: 0,
    }
  }

  render () {
    let { children } = this.props
    const { currentStep } = this.state

    if (!Array.isArray(children)) {
      children = [children]
    }

    return (
      <div className="wizard">
        <ol className="progress-tracker">
          {children && children.map((child, index) => (
            <li
              className={['step-title', (index < currentStep) ? 'done' : null].join(' ')}
              key={child.props.title}>
              <span>{child.props.title || null}</span>
            </li>
          ))}
        </ol>

        <section className="step">
          {children[currentStep]}
        </section>

        <menu type="toolbar">
          {(this.state.currentStep > 0) && (
            <button
              className="previous"
              onClick={this._handlePreviousClick}>
              Previous
            </button>
          )}

          {(currentStep < (children.length - 1)) && (
            <button
              className="next"
              disabled={children[currentStep].props.isValidated ? !children[currentStep].props.isValidated() : false}
              onClick={this._handleNextClick}>
              Next
            </button>
          )}
        </menu>
      </div>
    )
  }
}

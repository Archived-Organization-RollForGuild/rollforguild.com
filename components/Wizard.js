// Component imports
import Component from './Component'





export default class Wizard extends Component {
  _handleFinalClick () {
    this.props.onComplete()
  }

  _handleNextClick () {
    this.setState({ currentStep: this.state.currentStep + 1 })
  }

  _handlePreviousClick () {
    this.setState({ currentStep: this.state.currentStep - 1 })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleFinalClick',
      '_handleNextClick',
      '_handlePreviousClick',
    ])

    this.state = { currentStep: 0 }
  }

  render () {
    let { children } = this.props
    const { currentStep } = this.state
    const isFirstStep = this.state.currentStep === 0
    const isLastStep = currentStep === (children.length - 1)
    const classes = ['step']

    if (!Array.isArray(children)) {
      children = [children]
    }

    if (children[currentStep].props.className) {
      classes.push(children[currentStep].props.className)
    }

    return (
      <div className="wizard">
        <ol className="progress-tracker">
          {children && children.map((child, index) => (
            <li
              className={['step-title', (index < currentStep) ? 'done' : null, (index === currentStep) ? 'current' : null].join(' ')}
              key={child.props.title}>
              <span>{child.props.title || null}</span>
            </li>
          ))}
        </ol>

        <section className={classes.join(' ')}>
          {children[currentStep]}
        </section>

        <menu type="toolbar">
          {!isFirstStep && (
            <button
              className="previous"
              onClick={this._handlePreviousClick}>
              Previous
            </button>
          )}

          <button
            className="next"
            disabled={children[currentStep].props.isValidated ? !children[currentStep].props.isValidated() : false}
            onClick={isLastStep ? this._handleFinalClick : this._handleNextClick}>
            Next
          </button>
        </menu>
      </div>
    )
  }
}

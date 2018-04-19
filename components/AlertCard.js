// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'




// Component imports
import Button from './Button'
import Component from './Component'





// Component constants
const ALERT_LEVEL_ICONS = {
  success: 'thumbs-up',
  info: 'info-circle',
  warn: 'exclamation-circle',
  error: 'exclamation-triangle',
}
const ANIMATION_TIME = 250





class AlertCard extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleDismissal () {
    const {
      alert,
      onDismiss,
    } = this.props

    const {
      dismissalTimeout,
    } = this.state

    if (dismissalTimeout) {
      clearTimeout(dismissalTimeout)
    }

    this.setState({ mounted: false })

    setTimeout(() => {
      if (onDismiss) {
        onDismiss(alert)
      } else {
        this.setState({ dismissed: true })
      }
    }, ANIMATION_TIME)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  componentDidMount () {
    const {
      alert,
    } = this.props

    const {
      duration,
    } = alert.attributes

    // we timeout this setState for 10ms to let the component get properly inserted with initial CSS values before gracefully displaying it to the user.
    setTimeout(() => {
      this.setState({ mounted: true })
    }, 10)

    if (typeof duration === 'number' && duration) {
      // The added delay (10 + animation_time) is added to account for fade-in time and the inital delay of the first setState().
      // This way the duration can be defined as the amount of time that the alert is fully visible to the user.
      const dismissalTimeout = setTimeout(this._handleDismissal, duration + 10 + ANIMATION_TIME)
      this.setState({ dismissalTimeout })
    }
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleDismissal',
    ])

    this.state = {
      dismissed: false,
      dismissalTimeout: null,
      mounted: false,
    }
  }

  render () {
    if (this.state.dismissed) {
      return null
    }

    const {
      alert,
    } = this.props


    const {
      body,
      level,
      suppressMenu,
      title,
    } = alert.attributes

    return (
      <div className={`alert card compact ${level} ${this.state.mounted ? 'mounted' : ''}`}>
        <header>
          <h4 className="title">
            <FontAwesomeIcon icon={ALERT_LEVEL_ICONS[level]} fixedWidth /> {title}
          </h4>
          <Button
            action="dismiss"
            category="Alerts"
            label={`${title} - ${body}`}
            className="compact"
            onClick={this._handleDismissal}>
            <FontAwesomeIcon icon="times" fixedWidth />
          </Button>
        </header>
        <div className="content">
          {body}
        </div>
        {(level === 'error' && !suppressMenu) && (
          <menu type="toolbar" className="compact fulltext">
            <div className="secondary">
              <a
                className="button inline link"
                href="//rollforguild.atlassian.net/servicedesk/customer/portal/1"
                rel="noopener noreferrer"
                target="_blank">
                <small>
                  <FontAwesomeIcon icon="bug" fixedWidth /> Still experiencing issues?
                </small>
              </a>
            </div>
          </menu>
        )}
      </div>
    )
  }
}

AlertCard.defaultProps = {
  onDismiss: null,
}

AlertCard.propTypes = {
  alert: PropTypes.object.isRequired,
  onDismiss: PropTypes.func,
}


export default AlertCard
export { AlertCard }

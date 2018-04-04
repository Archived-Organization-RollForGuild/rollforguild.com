// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'





// Component imports
import { actions } from '../store'
import AlertCard from './AlertCard'





const AlertsController = (props) => {
  if (!props.alerts.length) {
    return null
  }

  const alerts = props.alerts.slice(0, props.limit)
  let overflow = 0


  if (props.alerts.length > props.limit) {
    overflow = props.alerts.length - props.limit
  }

  return ReactDom.createPortal(
    (
      <div className="alert-card-container">
        {
          alerts.map(alert => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onDismiss={() => props.deleteAlert(alert.id)} />
          ))
        }
        {overflow > 0 && (<span className="overflow-counter">+{overflow} more</span>)}
      </div>
    ),
    document.getElementById('alert-container')
  )
}

AlertsController.defaultProps = {
  limit: 2,
}

AlertsController.propTypes = {
  alerts: PropTypes.array.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  limit: PropTypes.number,
}





const mapDispatchToProps = dispatch => bindActionCreators({
  deleteAlert: actions.deleteAlert,
}, dispatch)
const mapStateToProps = state => ({ alerts: Object.values(state.alerts) })




export default connect(mapStateToProps, mapDispatchToProps)(AlertsController)

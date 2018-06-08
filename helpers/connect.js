// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'




// Component imports
import { actions } from '../store'





export default function (Component) {
  const {
    mapDispatchToProps: ComponentMDTP,
    mapStateToProps,
    mergeProps,
  } = Component

  const mapDispatchToProps = ComponentMDTP && ((dispatch, ownProps) => {
    let props = {}

    if (Array.isArray(ComponentMDTP)) {
      props = ComponentMDTP.reduce((accumulator, actionName) => ({
        ...accumulator,
        [actionName]: actions[actionName],
      }), {})
      props = bindActionCreators(props, dispatch)
    } else if (typeof ComponentMDTP === 'function') {
      props = ComponentMDTP(dispatch, ownProps)
    }

    return props
  })

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(Component)
}

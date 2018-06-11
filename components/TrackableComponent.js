// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'
import pushTrackableEventToDataLayer from '../helpers/pushTrackableEventToDataLayer'





// Component constants
const gaEventProps = [
  ['action', 'eventAction'],
  ['category', 'eventCategory'],
  ['label', 'eventLabel'],
  ['value', 'eventValue'],
]





class TrackableComponent extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _fireEvent () {
    const eventData = {}

    for (const [key, propName] of gaEventProps) {
      const value = this.props[key]

      if (value) {
        eventData[propName] = value
      }
    }

    pushTrackableEventToDataLayer(eventData)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_fireEvent'])
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get renderProps () {
    const renderProps = {}

    for (const [key, value] of Object.entries(this.props)) {
      if (!gaEventProps.includes(key)) {
        renderProps[key] = value
      }
    }

    return renderProps
  }
}





TrackableComponent.defaultProps = { value: null }

// We have to disable react/no-unused-prop-types here because these props are
// used, just not in a way that ESLint can recognize.
/* eslint-disable react/no-unused-prop-types */
TrackableComponent.propTypes = {
  action: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
}
/* eslint-enable */





export default TrackableComponent

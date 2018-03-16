// Module imports
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'





// Component constants
const gaEventProps = ['action', 'category', 'label', 'rating']





class TrackableComponent extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _fireEvent () {
    const eventData = { event: 'trackable' }

    for (const key of gaEventProps) {
      const value = this.props[key]
      const propName = key.split('').reduce((accumulator, character, index) => `${accumulator}${index === 0 ? character.toUpperCase() : character}`, 'event')

      if (value) {
        eventData[propName] = value
      }
    }

    TrackableComponent.dataLayer.push(eventData)
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

  static get dataLayer () {
    return window.dataLayer || (window.dataLayer = [])
  }

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





TrackableComponent.defaultProps = {
  label: null,
  value: null,
}

// We have to disable react/no-unused-prop-types here because these props are
// used, just not in a way that ESLint can recognize.
/* eslint-disable react/no-unused-prop-types */
TrackableComponent.propTypes = {
  action: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.number,
}
/* eslint-enable */





export default TrackableComponent

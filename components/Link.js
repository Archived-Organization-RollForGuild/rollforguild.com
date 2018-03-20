// Module Imports
import NextLink from 'next/link'
import PropTypes from 'prop-types'



// Component Imports
import { pushTrackableEventToDataLayer } from '../helpers'
import NextRoutes, { getLink } from '../routes'





// Component constants
const gaEventProps = [
  ['action', 'eventAction'],
  ['category', 'eventCategory'],
  ['label', 'eventLabel'],
  ['value', 'eventValue'],
]





class Link extends NextLink {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  linkClicked (event) {
    const eventData = {}

    for (const [key, propName] of gaEventProps) {
      const value = this.props[key]

      if (value) {
        eventData[propName] = value
      }
    }

    pushTrackableEventToDataLayer(eventData)

    super.linkClicked(event)
  }
}




Link.defaultProps = {
  action: 'click',
  value: null,
}





// We have to disable react/no-unused-prop-types here because these props are
// used, just not in a way that ESLint can recognize.
/* eslint-disable react/no-unused-prop-types */
Link.propTypes = {
  action: PropTypes.string,
  category: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
}
/* eslint-enable */





// Link is ran through next-link's getLink function so we can retain the 'route' prop functionality.
export default getLink.apply(NextRoutes, [Link])

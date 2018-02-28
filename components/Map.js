// Module imports
import {
  GoogleMap,
  Marker,
  // MarkerWithLabel,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'
import {
  compose,
  withProps,
} from 'recompose'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import PropTypes from 'prop-types'





// Component imports
import Component from './Component'





// Component constants
const googleMapsAPIKey = preval`module.exports = process.env.RFG_GOOGLE_MAPS_API_KEY`





class Map extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _onPlacesChanged () {
    const bounds = new window.google.maps.LatLngBounds()
    const places = this._search.getPlaces()
    const newState = {}

    places.forEach(place => {
      if (place.geometry.viewport) {
        return bounds.union(place.geometry.viewport)
      }

      return bounds.extend(place.geometry.location)
    })

    newState.markers = places.map(place => ({ position: place.geometry.location }))
    newState.center = newState.markers.length ? newState.markers[0].position : this.state.center

    this.setState(newState)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_onPlacesChanged'])

    this.state = {
      loading: true,
      searching: false,
    }
  }

  render () {
    const {
      loading,
      searching,
    } = this.state
    const {
      location,
      markers,
      searchable,
    } = this.props

    location.lng = location.lng || location.lon || location.long

    return (
      <div className={['map', (loading ? 'loading' : null), (searching ? 'searching' : null)].join(' ')}>
        <GoogleMap
          center={location}
          defaultZoom={17}>
          {markers.map(marker => {
            if (marker.label) {
              return (
                <MarkerWithLabel
                  key={`${marker.lat}-${marker.lng}`}
                  labelAnchor={new window.google.maps.Point(20, 100)}
                  position={marker}>
                  <div className="map-marker-label">
                    {marker.label}
                  </div>
                </MarkerWithLabel>
              )
            }

            return (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={marker} />
            )
          })}

          {searchable && (
            <SearchBox
              controlPosition={1}
              onPlacesChanged={this._onPlacesChanged}
              ref={_search => this._search = _search}
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                marginTop: '27px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                textOverflow: 'ellipses',
              }}>
              <input />
            </SearchBox>
          )}
        </GoogleMap>
      </div>
    )
  }
}





Map.defaultProps = {
  location: {
    lat: 43.0728061,
    lng: -89.3903432,
  },
  markers: [],
  searchable: true,
}

Map.propTypes = {
  location: PropTypes.object,
  markers: PropTypes.array,
  searchable: PropTypes.bool,
}





export default compose(withProps({
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
}), withScriptjs, withGoogleMap)(Map)

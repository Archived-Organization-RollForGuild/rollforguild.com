// Module imports
import PropTypes from 'prop-types'





// Component constants
const googleMapsAPIKey = preval`module.exports = process.env.RFG_GOOGLE_MAPS_API_KEY`





const StaticMap = props => {
  const {
    location,
    markers,
  } = props
  let imgSrc = 'https://maps.googleapis.com/maps/api/staticmap?'

  location.lng = location.lng || location.lon || location.long

  const srcParams = {
    center: `${location.lat},${location.lng}`,
    key: googleMapsAPIKey,
    markers,
    scale: 2,
    size: '640x640',
    style: 'feature:poi|element:labels.text|visibility:off',
    zoom: 17,
  }

  imgSrc += Object.keys(srcParams).reduce((accumulator, param) => {
    const value = srcParams[param]

    if (param === 'markers') {
      if (value.length) {
        return accumulator.concat(value.map(marker => {
          const markerParams = []

          markerParams.push(`color:${marker.color || 'red'}`)
          markerParams.push(`label:${marker.label || ''}`)
          markerParams.push('size:mid')
          markerParams.push(`${marker.lat},${marker.lng}`)

          return `markers=${markerParams.join('|')}`
        }))
      }

      return accumulator
    }

    return accumulator.concat(`${param}=${value}`)
  }, []).join('&')

  return (
    <div className="static-map">
      <img
        alt=""
        src={imgSrc} />
    </div>
  )
}





StaticMap.defaultProps = {
  location: {
    lat: 43.0728061,
    lng: -89.3903432,
  },
  markers: [],
}

StaticMap.propTypes = {
  location: PropTypes.object,
  markers: PropTypes.array,
}





export default StaticMap

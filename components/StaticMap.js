// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Component imports
import Link from './Link'





// Component constants
const googleMapsAPIKey = preval`module.exports = process.env.RFG_GOOGLE_MAPS_API_KEY`





const StaticMap = props => {
  const {
    address,
    category,
    location,
    markers,
    size,
    zoom,
  } = props
  const mapsLink = `//www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  let imgSrc = '//maps.googleapis.com/maps/api/staticmap?'

  location.lng = location.lng || location.lon || location.long

  const srcParams = {
    center: `${location.lat},${location.lng}`,
    key: googleMapsAPIKey,
    markers,
    scale: 2,
    size,
    style: 'feature:poi|element:labels.text|visibility:off',
    zoom,
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
    <React.Fragment>
      <Link
        action="get-directions"
        category={category}
        href={mapsLink}
        label="Map">
        <a target="_blank">
          <div
            aria-label={`Map to ${address}`}
            className="static-map"
            role="img"
            style={{ backgroundImage: `url(${imgSrc})` }}
            title={`Map to ${address}`} />

          <footer>
            <small>{address}</small>
          </footer>
        </a>
      </Link>
    </React.Fragment>
  )
}





StaticMap.defaultProps = {
  address: '',
  location: {
    lat: 43.0728061,
    lng: -89.3903432,
  },
  markers: [],
  size: '250x250',
  zoom: 14,
}

StaticMap.propTypes = {
  address: PropTypes.string,
  category: PropTypes.string.isRequired,
  location: PropTypes.object,
  markers: PropTypes.array,
  size: PropTypes.string,
  zoom: PropTypes.number,
}





export default StaticMap

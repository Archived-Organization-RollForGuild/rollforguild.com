// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import { convertObjectToQueryParams } from '../../helpers'
import AddressInput from '../../components/AddressInput'
import Button from '../../components/Button'
import Component from '../../components/Component'
import Dropdown from '../../components/Dropdown'
import GroupCard from '../../components/GroupCard'
import Page from '../../components/Page'
import Pagination from '../../components/Pagination'
import Tooltip from '../../components/Tooltip'





// Component constants
const gmapsAPIKey = preval`module.exports = process.env.RFG_GOOGLE_MAPS_API_KEY`
const title = 'Search Groups'





class GroupSearch extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleAddressChange (location) {
    this.setState({
      location: {
        ...location.geometry.location,
        address: location.formatted_address,
      },
    }, () => this._search())
  }

  async _handleGeolocationUpdate (position) {
    const {
      latitude,
      longitude,
    } = position.coords
    const queryParams = {
      key: gmapsAPIKey,
      latlng: `${latitude},${longitude}`,
      result_type: 'street_address',
    }

    let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json${convertObjectToQueryParams(queryParams)}`)

    response = await response.json()

    this.setState({
      location: {
        address: response.results[0].formatted_address,
        lat: latitude,
        lng: longitude,
      },
      waitingForLocation: false,
    }, () => this._search())
  }

  _handleGeolocationError () {
    navigator.geolocation.clearWatch(this.wpid)

    this.setState({
      waitingForLocation: false,
      watchingLocation: false,
    })
  }

  _handleSearchDistanceChange (distance) {
    this.setState({ searchDistance: distance }, () => {
      if (this.state.location) {
        this._search()
      }
    })
  }

  _incrementSearchDistance () {
    const currentSearchDistanceIndex = GroupSearch.searchDistances.findIndex(searchDistance => searchDistance === this.state.searchDistance)

    this._handleSearchDistanceChange(GroupSearch.searchDistances[currentSearchDistanceIndex + 1])
  }

  static _renderGroup (group) {
    const { id } = group

    return (
      <li key={id}>
        <GroupCard group={group} />
      </li>
    )
  }

  _renderGroups () {
    const { groups } = this.state

    return (
      <ol>{groups.map(GroupSearch._renderGroup)}</ol>
    )
  }

  async _search (page = 1) {
    const {
      location,
      pagination,
    } = this.state

    this.setState({ searching: true })

    const newState = {
      firstSearchInitiated: true,
      groups: [],
      searching: false,
    }

    const options = {
      ...this.queryOptions,
      page,
    }

    const {
      payload,
      status,
    } = await this.props.searchForGroups(location, options)

    if (status) {
      const {
        count,
        limit,
        offset,
        total,
      } = payload.meta

      newState.groups = payload.data || []
      newState.pagination = {
        ...pagination,
        currentPage: Math.ceil((offset + count) / limit),
        totalPageCount: Math.ceil(total / limit),
      }
    }

    setTimeout(() => this.setState(newState), 500)
  }

  async _toggleUseCurrentLocation ({ target }) {
    const { useCurrentLocation } = this.state

    target.blur()

    this.setState({
      location: null,
      useCurrentLocation: !useCurrentLocation,
      waitingForLocation: !useCurrentLocation,
      watchingLocation: !useCurrentLocation,
    })

    if (!useCurrentLocation) {
      this.wpid = navigator.geolocation.watchPosition(this._handleGeolocationUpdate, this._handleGeolocationError, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      })
    } else {
      navigator.geolocation.clearWatch(this.wpid)
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentWillUnmount () {
    navigator.geolocation.clearWatch(this.wpid)
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleAddressChange',
      '_handleGeolocationError',
      '_handleGeolocationUpdate',
      '_handleSearchDistanceChange',
      '_incrementSearchDistance',
      '_search',
      '_toggleUseCurrentLocation',
    ])

    this._debounceMethods(['_search'])

    this.state = {
      firstSearchInitiated: false,
      groups: [],
      location: null,
      pagination: {
        currentPage: 1,
        totalPageCount: 1,
      },
      searchDistance: 5,
      searching: false,
      useCurrentLocation: false,
      waitingForLocation: false,
      watchingLocation: false,
    }
  }

  render () {
    const {
      firstSearchInitiated,
      groups,
      location,
      pagination,
      searchDistance,
      searching,
      useCurrentLocation,
      waitingForLocation,
      watchingLocation,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Search Groups</h1>
        </header>

        <fieldset>
          <div className="input-group">
            <label>
              <FontAwesomeIcon icon="search" fixedWidth />
            </label>

            <AddressInput
              onChange={this._handleAddressChange}
              disabled={waitingForLocation}
              placeholder={waitingForLocation ? 'Retrieving your location...' : 'Enter an address...'}
              readOnly={watchingLocation}
              value={location ? location.address : ''} />

            <button
              className="binary"
              data-on={useCurrentLocation}
              onClick={this._toggleUseCurrentLocation}
              type="button">
              {waitingForLocation && (
                <FontAwesomeIcon icon="spinner" fixedWidth pulse />
              )}

              {!waitingForLocation && (
                <FontAwesomeIcon icon="map-marker" fixedWidth />
              )}

              <Tooltip
                alignment="center"
                attachment="left">
                {waitingForLocation && 'Retrieving location'}

                {(!waitingForLocation && useCurrentLocation) && 'Stop using your current location'}

                {(!waitingForLocation && !useCurrentLocation) && 'Use your current location'}
              </Tooltip>
            </button>
          </div>

          <footer>
            <div className="filters">
              <Dropdown
                className="squishable"
                onChange={this._handleSearchDistanceChange}
                options={GroupSearch.searchDistances}
                renderValue={value => `Search within ${value} miles`}
                value={searchDistance} />
            </div>
          </footer>
        </fieldset>

        {(!searching && !!groups.length) && this._renderGroups()}

        {(!searching && firstSearchInitiated && !groups.length) && (
          <p>
            No groups found.
            {searchDistance !== GroupSearch.searchDistances[GroupSearch.searchDistances.length - 1] && (
              <React.Fragment>
                &nbsp;Perhaps you should try&nbsp;
                <Button
                  action="expand-distance"
                  category="Groups"
                  className="inline link"
                  label="Search"
                  onClick={this._incrementSearchDistance}>
                  expanding your search
                </Button>.
              </React.Fragment>
            )}
          </p>
        )}

        {searching && (
          <div>
            <FontAwesomeIcon icon="spinner" pulse /> Searching...
          </div>
        )}

        {(!searching && !!groups.length) && (
          <Pagination
            category="Groups"
            currentPage={pagination.currentPage}
            onPageChange={this._search}
            totalPageCount={pagination.totalPageCount} />
        )}
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get queryOptions () {
    const {
      pagination,
      searchDistance,
    } = this.state

    return {
      distance: searchDistance,
      itemsPerPage: pagination.itemsPerPage,
    }
  }

  static get searchDistances () {
    return [5, 10, 25, 50]
  }
}





const mapDispatchToProps = [
  'requestToJoinGroup',
  'searchForGroups',
]

const mapStateToProps = (/*state*/) => ({})





export default Page(GroupSearch, title, {
  mapDispatchToProps,
  mapStateToProps,
}, true)

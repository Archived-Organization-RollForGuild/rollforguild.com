// Module imports
import React from 'react'





// Component imports
import AddressInput from '../../components/AddressInput'
import Component from '../../components/Component'
import Dropdown from '../../components/Dropdown'
import GroupCard from '../../components/GroupCard'
import Page from '../../components/Page'
import Pagination from '../../components/Pagination'
import convertObjectToQueryParams from '../../helpers/convertObjectToQueryParams'





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
    this.setState({
      location: null,
      useCurrentLocation: target.checked,
      waitingForLocation: target.checked,
      watchingLocation: target.checked,
    })

    if (target.checked) {
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
              <i className="fas fa-fw fa-search" />
            </label>

            <AddressInput
              onChange={this._handleAddressChange}
              disabled={waitingForLocation}
              placeholder={waitingForLocation ? 'Loading...' : 'Enter an address...'}
              readOnly={watchingLocation}
              value={location ? location.address : ''} />

            <Dropdown
              className="squishable"
              onChange={this._handleSearchDistanceChange}
              options={GroupSearch.searchDistances}
              renderValue={value => `Search within ${value} miles`}
              value={searchDistance} />
          </div>

          <footer>
            <p>Use your location to search for nearby groups</p>

            <div className="options">
              Options:

              <ul>
                <li>
                  <input
                    id="use-current-location"
                    hidden
                    onChange={this._toggleUseCurrentLocation}
                    type="checkbox"
                    value={useCurrentLocation} />

                  <label
                    className="binary button inline"
                    data-on={useCurrentLocation}
                    htmlFor="use-current-location">
                    <i className="fas fa-fw fa-map-marker" />
                    Use my current location
                  </label>
                </li>
              </ul>
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
                <button
                  className="inline link"
                  onClick={this._incrementSearchDistance}>
                  expanding your search
                </button>.
              </React.Fragment>
            )}
          </p>
        )}

        {searching && (
          <div>
            <i className="fas fa-pulse fa-spinner" /> Searching...
          </div>
        )}

        {(!searching && !!groups.length) && (
          <Pagination
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

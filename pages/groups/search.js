// Module imports
import React from 'react'





// Component imports
import AddressInput from '../../components/AddressInput'
import Component from '../../components/Component'
import Dropdown from '../../components/Dropdown'
import GroupCard from '../../components/GroupCard'
import Page from '../../components/Page'
import Pagination from '../../components/Pagination'





// Component constants
const title = 'Search Groups'





class SearchGroups extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleAddressChange ({ geometry }) {
    this.setState({ location: geometry.location }, () => this._search())
  }

  _handleSearchDistanceChange (distance) {
    this.setState({ searchDistance: distance }, () => {
      if (this.state.location) {
        this._search()
      }
    })
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
      <ol>{groups.map(SearchGroups._renderGroup)}</ol>
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





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleAddressChange',
      '_handleSearchDistanceChange',
      '_search',
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
    }
  }

  render () {
    const {
      firstSearchInitiated,
      groups,
      pagination,
      searchDistance,
      searching,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Search Groups</h1>
        </header>

        <fieldset>
          <div className="input-group">
            <i className="fas fa-fw fa-search" />

            <AddressInput onChange={this._handleAddressChange} />

            <Dropdown
              onChange={this._handleSearchDistanceChange}
              options={[5, 10, 25, 50]}
              value={searchDistance} />
          </div>

          <small>Use your location to search for nearby groups</small>
        </fieldset>

        {(!searching && !!groups.length) && this._renderGroups()}

        {(!searching && firstSearchInitiated && !groups.length) && (
          <div>No groups found.</div>
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
}





const mapDispatchToProps = [
  'requestToJoinGroup',
  'searchForGroups',
]

const mapStateToProps = (/*state*/) => ({})





export default Page(SearchGroups, title, {
  mapDispatchToProps,
  mapStateToProps,
})

// Module imports
import React from 'react'





// Component imports
import AddressInput from '../../components/AddressInput'
import Component from '../../components/Component'
import GroupCard from '../../components/GroupCard'
import Page from '../../components/Page'





// Component constants
const title = 'Search Groups'





class SearchGroups extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleQuery ({ geometry }) {
    this.setState({ searching: true })

    const { payload } = await this.props.searchForGroups(geometry.location)

    this.setState({
      firstSearchInitiated: true,
      groups: payload.data,
      searching: false,
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





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleQuery'])

    this.state = {
      firstSearchInitiated: false,
      groups: [],
      searching: false,
    }
  }

  render () {
    const {
      firstSearchInitiated,
      groups,
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

            <AddressInput onChange={this._handleQuery} />
          </div>

          <small>Use your location to search for nearby groups</small>
        </fieldset>

        {(!searching && !!groups.length) && this._renderGroups()}

        {(!searching && firstSearchInitiated && !groups.length) && (
          <div>No groups found.</div>
        )}

        {searching && (
          <div><i className="fas fa-pulse fa-spinner" /> Searching...</div>
        )}
      </React.Fragment>
    )
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

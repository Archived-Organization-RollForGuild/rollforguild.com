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
    const { payload } = await this.props.searchForGroups(geometry.location)

    this.setState({ groups: payload.data })
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

    if (!groups.length) {
      return (
        <div>No groups found.</div>
      )
    }

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

    this.state = { groups: [] }
  }

  render () {
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

        {this._renderGroups()}
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

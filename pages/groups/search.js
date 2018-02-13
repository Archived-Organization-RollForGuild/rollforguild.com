// Module imports
import 'isomorphic-fetch'
import Link from 'next/link'
import React from 'react'





// Component imports
import AddressInput from '../../components/AddressInput'
import Component from '../../components/Component'
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
    const {
      description,
      games,
      members,
      name,
    } = group.attributes

    return (
      <li
        className="card"
        key={id}>
        <header>
          <h2 title={name}>{name}</h2>

          <small>{members} members</small>
        </header>

        {games && (
          <aside>
            <header>
              <h3>Games:</h3>
            </header>

            <ul className="comma-separated inline">
              {games.map(game => (
                <li>{game}</li>
              ))}
            </ul>
          </aside>
        )}

        <div className="description">
          {!!description && (
            <p>{description}</p>
          )}

          {!description && (
            <p><em>No description</em></p>
          )}
        </div>

        <menu type="toolbar">
          <div className="primary">
            <Link href={`/groups/?id=${id}`} as={`/groups/${id}`}>
              <a className="button info">
                Learn more
              </a>
            </Link>
          </div>

          <div className="secondary">
            <button className="secondary">
              Join
            </button>
          </div>
        </menu>
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





const mapDispatchToProps = ['searchForGroups']

const mapStateToProps = (/*state*/) => ({})





export default Page(SearchGroups, title, {
  mapDispatchToProps,
  mapStateToProps,
})

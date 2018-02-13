// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Link from 'next/link'
import React from 'react'





// Component imports
import { actions } from '../store'
import Component from './Component'





class GroupCard extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _requestToJoinGroup () {
    const {
      group,
      requestToJoinGroup,
    } = this.props

    this.setState({ requestingToJoin: true })

    const { status } = await requestToJoinGroup(group.id)

    this.setState({
      joinRequestSent: status,
      requestingToJoin: false,
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_requestToJoinGroup'])

    this.state = {
      joinRequestSent: false,
      requestingToJoin: false,
    }
  }

  render () {
    const { group } = this.props
    const {
      joinRequestSent,
      requestingToJoin,
    } = this.state

    const { id } = group
    const {
      description,
      games,
      members,
      name,
    } = group.attributes

    return (
      <div className="card">
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
                <li key={game}>{game}</li>
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
            <button
              className="secondary"
              disabled={requestingToJoin || joinRequestSent}
              onClick={this._requestToJoinGroup}>
              {(!requestingToJoin && !joinRequestSent) && 'Join'}

              {(!requestingToJoin && joinRequestSent) && (
                <span><i className="fas fa-check" /> Request Sent</span>
              )}

              {requestingToJoin && (
                <span><i className="fas fa-pulse fa-spinner" /> Sending request...</span>
              )}
            </button>
          </div>
        </menu>
      </div>
    )
  }
}





const mapDispatchToProps = dispatch => ({ requestToJoinGroup: bindActionCreators(actions.requestToJoinGroup, dispatch) })





export default connect(null, mapDispatchToProps)(GroupCard)

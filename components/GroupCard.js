// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'




// Component imports
import { actions } from '../store'
import Component from './Component'





class GroupCard extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  // async _requestToJoinGroup () {
  //   const {
  //     group,
  //     requestToJoinGroup,
  //   } = this.props

  //   this.setState({ requestingToJoin: true })

  //   const { status } = await requestToJoinGroup(group.id)

  //   setTimeout(() => {
  //     this.setState({
  //       joinRequestSent: status,
  //       requestingToJoin: false,
  //     })
  //   }, 500)
  // }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    // this._bindMethods(['_requestToJoinGroup'])

    this.state = {
      // joinRequestSent: false,
      // requestingToJoin: false,
    }
  }

  render () {
    const { group } = this.props
    // const {
    //   joinRequestSent,
    //   requestingToJoin,
    // } = this.state

    const { id } = group
    const {
      description,
      games,
      members,
      name,
    } = group.attributes
    // const memberStatus = group.attributes.mamber_status

    return (
      <div className="card">
        <header>
          <h2 title={name}>{name}</h2>

          <small>{members} members</small>
        </header>

        <div className="content">
          {!!description && (
            <p>{description}</p>
          )}

          {!description && (
            <p><em>No description</em></p>
          )}

          {games && (
            <header>
              <h3>Games:</h3>
            </header>
          )}

          {games && (
            <ul className="comma-separated inline">
              {games.map(game => (
                <li key={game}>{game}</li>
              ))}
            </ul>
          )}
        </div>

        <footer>
          <menu type="toolbar">
            <div className="primary">
              <Link href={`/groups/?id=${id}`} as={`/groups/${id}`}>
                <a className="button info">
                  Learn more
                </a>
              </Link>
            </div>

            {/* <div className="secondary">
              <button
                className="secondary"
                disabled={requestingToJoin || joinRequestSent}
                onClick={this._requestToJoinGroup}>
                {(!requestingToJoin && !joinRequestSent && !(memberStatus === 'pending')) && 'Join'}

                {((!requestingToJoin && joinRequestSent) || (memberStatus === 'pending')) && (
                  <span><FontAwesomeIcon icon="check"/> Request Sent</span>
                )}

                {requestingToJoin && (
                  <span><FontAwesomeIcon icon="spinner" pulse /> Sending request...</span>
                )}
              </button>
            </div> */}
          </menu>
        </footer>
      </div>
    )
  }
}





const mapDispatchToProps = dispatch => ({ requestToJoinGroup: bindActionCreators(actions.requestToJoinGroup, dispatch) })





export default connect(null, mapDispatchToProps)(GroupCard)

// Module imports
import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import {
  Tab,
  TabPanel,
} from '../../components/TabPanel'
import Component from '../../components/Component'
import Page from '../../components/Page'
import StaticMap from '../../components/StaticMap'





// Component constants
const title = 'Group Profile'





class JoinRequestCard extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/
  async _accept () {
    const {
      accept,
      user,
    } = this.props

    this.setState({ accepting: true })

    await accept(user.id)

    setTimeout(() => this.setState({ accepting: false }), 500)
  }

  async _ignore () {
    const {
      ignore,
      user,
    } = this.props

    this.setState({ ignoring: true })

    await ignore(user.id)

    setTimeout(() => this.setState({ ignoring: false }), 500)
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_accept',
      '_ignore',
    ])
    this.state = {
      accepting: false,
      ignoring: false,
    }
  }

  render () {
    const { user } = this.props
    const { attributes, id } = user
    const {
      accepting,
      ignoring,
    } = this.state

    const {
      email,
      username,
    } = attributes

    return (
      <div className="card">
        <header>
          {attributes.username}
        </header>

        <div className="content">
          <div
            aria-label={`${username}'s Avatar`}
            className="avatar small"
            style={{ backgroundImage: `url(//api.adorable.io/avatars/50/${id})` }} />

          {(!accepting && !ignoring) && (
            <menu
              className="compact"
              type="toolbar">
              <div className="primary">
                <a
                  className="button small secondary"
                  href={`mailto:${email}`}>
                  Message
                </a>

                <button
                  className="small success"
                  onClick={this._accept}>
                  Accept
                </button>

                <button
                  className="small danger"
                  onClick={this._ignore}>
                  Ignore
                </button>

                {/* <button className="danger small">
                  Remove
                </button> */}
              </div>
            </menu>
          )}

          {accepting && 'Accepting...'}

          {ignoring && 'Ignoring...'}
        </div>
      </div>
    )
  }
}





class GroupProfile extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _acceptJoinRequest (userId) {
    await this._handleJoinRequest(userId, 'accepted')
  }

  async _handleJoinRequest (userId, status) {
    const {
      group,
      handleJoinRequest,
    } = this.props

    await handleJoinRequest(group.id, userId, status)

    window.location.reload()
  }

  async _ignoreJoinRequest (userId) {
    await this._handleJoinRequest(userId, 'ignored')
  }

  async _requestToJoin () {
    const {
      group,
      requestToJoinGroup,
    } = this.props

    this.setState({ requestingToJoin: true })

    const { status } = await requestToJoinGroup(group.id)

    setTimeout(() => {
      this.setState({
        joinRequestSent: status,
        requestingToJoin: false,
      })
    }, 500)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      getGroup,
      getJoinRequests,
    } = this.props
    const { id } = this.props.query
    let { group } = this.props
    let memberStatus = null
    let joinRequests = []

    this.setState({ gettingJoinRequests: true })

    if (!group || !memberStatus) {
      const response = await getGroup(id)
      group = response.payload.data
    }

    memberStatus = group.attributes.member_status

    if (memberStatus === 'admin') {
      const { payload } = await getJoinRequests(id)
      joinRequests = (payload && payload.data) ? payload.data : []
    }

    this.setState({
      currentUserIsAdmin: memberStatus === 'admin',
      currentUserIsMember: memberStatus === 'admin' || memberStatus === 'member',
      gettingJoinRequests: false,
      joinRequests,
      joinRequestSent: memberStatus === 'pending',
      loaded: true,
    })
  }

  constructor (props) {
    const { group } = props

    super(props)

    this._bindMethods([
      '_acceptJoinRequest',
      '_ignoreJoinRequest',
      '_requestToJoin',
      '_requestToJoin',
    ])

    this.state = {
      currentUserIsAdmin: group && (group.attributes.member_status === 'admin'),
      currentUserIsMember: group && ((group.attributes.member_status === 'member') || (group.attributes.member_status === 'admin')),
      gettingJoinRequests: false,
      joinRequests: [],
      joinRequestSent: group && (group.attributes.member_status === 'pending'),
      loaded: group && group.attributes.member_status,
      requestingToJoin: false,
    }
  }

  render () {
    const {
      members,
      group,
    } = this.props
    const {
      currentUserIsAdmin,
      currentUserIsMember,
      gettingJoinRequests,
      joinRequests,
      joinRequestSent,
      loaded,
      requestingToJoin,
    } = this.state

    if (!group && !loaded) {
      return (
        <React.Fragment>
          <header>
            <h1>Group</h1>
          </header>

          <p>Loading...</p>
        </React.Fragment>
      )
    }

    if (!group) {
      return (
        <React.Fragment>
          <header>
            <h1>Group</h1>
          </header>

          <p>No group with that ID was found.</p>
        </React.Fragment>
      )
    }

    const {
      description,
      games,
      geo,
      name,
    } = group.attributes

    return (
      <React.Fragment>
        <header>
          <h1>{name}</h1>

          {!currentUserIsAdmin && (
            <menu type="toolbar">
              {!currentUserIsMember && (
                <button
                  className="success"
                  disabled={requestingToJoin || joinRequestSent}
                  onClick={this._requestToJoin}>
                  {(!requestingToJoin && !joinRequestSent) && 'Request to join'}

                  {(!requestingToJoin && joinRequestSent) && (
                    <span><i className="fas fa-check" /> Request sent</span>
                  )}

                  {requestingToJoin && (
                    <span><i className="fas fa-pulse fa-spinner" /> Sending request...</span>
                  )}
                </button>
              )}

              {currentUserIsMember && (
                <button className="danger">
                  Leave group
                </button>
              )}
            </menu>
          )}
        </header>

        <div className="profile">
          <header>
            <div
              aria-label={`${name}'s avatar`}
              className="avatar large"
              style={{ backgroundImage: `url(//api.adorable.io/avatars/150/${group.id})` }} />

            <section className="games">
              <h4>Games</h4>
              <ul className="group">
                {games.map(game => (
                  <li key={game}>{game}</li>
                ))}
              </ul>
            </section>

            {currentUserIsMember && (
              <section className="location">
                <h4>Location</h4>

                <StaticMap
                  location={geo}
                  markers={[{ ...geo }]} />
              </section>
            )}
          </header>

          <TabPanel className="details">
            <Tab title="Details">
              <section className="description">
                <h4>Description</h4>
                <p>{description || 'No description.'}</p>
              </section>
            </Tab>

            {currentUserIsMember && (
              <Tab title="Members">
                <section className="members">
                  {!members.length && (
                    <p>No other members.</p>
                  )}

                  {!!members.length && (
                    <ul className="">
                      {members.map(({ attributes, id }) => {
                        const {
                          email,
                          username,
                        } = attributes

                        return (
                          <li
                            className="card"
                            key={id}>
                            <header>
                              {attributes.username}
                            </header>

                            <div className="content">
                              <div
                                aria-label={`${username}'s Avatar`}
                                className="avatar small pull-left"
                                style={{ backgroundImage: `url(//api.adorable.io/avatars/50/${id})` }} />

                              <h4>{attributes.username}</h4>
                            </div>

                            <footer>
                              <menu
                                className="compact"
                                type="toolbar">
                                <div className="primary">
                                  <a
                                    className="button small success"
                                    href={`mailto:${email}`}>
                                    Message
                                  </a>
                                </div>

                                {/* <div className="secondary">
                                  <button className="secondary small">
                                    Remove
                                  </button>
                                </div> */}
                              </menu>
                            </footer>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </section>
              </Tab>
            )}

            {currentUserIsAdmin && (
              <Tab title="Join Requests">
                <section className="join-requests">
                  {gettingJoinRequests && (
                    <p>Loading...</p>
                  )}

                  {(!gettingJoinRequests && !joinRequests.length) && (
                    <p>No requests found.</p>
                  )}

                  {(!gettingJoinRequests && !!joinRequests.length) && (
                    <ul>
                      {joinRequests.map(user => (
                        <li key={user.id}>
                          <JoinRequestCard
                            accept={this._acceptJoinRequest}
                            ignore={this._ignoreJoinRequest}
                            user={user} />
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Tab>
            )}

            {currentUserIsAdmin && (
              <Tab title="Settings">
                <section className="settings">
                  Settings!
                </section>
              </Tab>
            )}
          </TabPanel>
        </div>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = [
  'getGroup',
  'getJoinRequests',
  'handleJoinRequest',
  'requestToJoinGroup',
]

const mapStateToProps = (state, ownProps) => {
  const group = state.groups[ownProps.query.id] || null
  let currentUserIsMember = false
  let members = []

  if (group) {
    const memberStatus = group.attributes.member_status
    if (memberStatus) {
      currentUserIsMember = (memberStatus === 'member') || (memberStatus === 'admin')
    }

    if (group.relationships && currentUserIsMember) {
      members = group.relationships.group_members.data.map(member => state.users[member.id])
    }
  }

  return {
    group,
    members,
  }
}





export default Page(GroupProfile, title, {
  mapDispatchToProps,
  mapStateToProps,
})

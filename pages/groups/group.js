// Module imports
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import {
  Tab,
  TabPanel,
} from '../../components/TabPanel'
import {
  convertSlugToUUID,
  isUUID,
} from '../../helpers'
import { actions } from '../../store'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Component from '../../components/Component'
import Link from '../../components/Link'
import Markdown from '../../components/Markdown'
import Page from '../../components/Page'
import GroupDetailsPanel from '../../components/GroupProfilePanels/GroupDetailsPanel'
import GroupSettingsPanel from '../../components/GroupProfilePanels/GroupSettingsPanel'
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
    const {
      accepting,
      ignoring,
    } = this.state

    const {
      bio,
      email,
      username,
    } = user.attributes

    return (
      <div className="card">
        <header>
          <Avatar src={user} size="small" />

          <h2>{username}</h2>
        </header>

        <div className="content">
          {!!bio && (
            <Markdown input={bio} />
          )}

          {!bio && (
            <em>No bio available</em>
          )}
        </div>

        <footer>
          <menu
            className="compact"
            type="toolbar">
            <div className="primary">
              <Link href={`mailto:${email}`}>
                <a className="button small success">Message</a>
              </Link>
            </div>

            <div className="secondary">
              <Button
                action="accept"
                category="Groups"
                className="small success"
                disabled={accepting || ignoring}
                label="Membership"
                onClick={this._accept}>
                {!accepting ? 'Accept' : 'Accepting...'}
              </Button>

              <Button
                action="ignore"
                category="Groups"
                className="small danger"
                disabled={accepting || ignoring}
                label="Membership"
                onClick={this._ignore}>
                {!ignoring ? 'Ignore' : 'Ignoring...'}
              </Button>
            </div>
          </menu>
        </footer>
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

  async _removeMember (userId) {
    const {
      group,
      removeGroupMember,
    } = this.props

    this.setState({
      leaving: {
        [userId]: true,
      },
    })

    const { status } = await removeGroupMember(group.id, userId)

    if (status === 'success') {
      window.location.reload()
    }
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
      id,
    } = this.props
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
      '_removeMember',
      '_requestToJoin',
      '_requestToJoin',
    ])

    this.state = {
      currentUserIsAdmin: group && (group.attributes.member_status === 'admin'),
      currentUserIsMember: group && ((group.attributes.member_status === 'member') || (group.attributes.member_status === 'admin')),
      gettingJoinRequests: false,
      joinRequests: [],
      joinRequestSent: group && (group.attributes.member_status === 'pending'),
      leaving: {},
      loaded: group && group.attributes.member_status,
      requestingToJoin: false,
    }
  }

  static async getInitialProps ({ query, store }) {
    let { id } = query

    if (!isUUID(id)) {
      id = convertSlugToUUID(id, 'groups')
    }

    await actions.getGroup(id)(store.dispatch)

    return {}
  }

  render () {
    const {
      currentUserId,
      members,
      group,
    } = this.props
    const {
      currentUserIsAdmin,
      currentUserIsMember,
      gettingJoinRequests,
      joinRequests,
      joinRequestSent,
      leaving,
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
      address,
      description,
      // games,
      geo,
      name,
      slug,
    } = group.attributes

    return (
      <React.Fragment>
        <Head>
          <meta property="og:description" content={description} />
          <meta property="og:image" content={`https://api.adorable.io/avatars/500/${group.id}`} />
          <meta property="og:site_name" content="Roll For Guild" />
          <meta property="og:title" content={name} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://rfg.group/${slug}`} />
        </Head>

        <header>
          <h1>{name}</h1>

          {!currentUserIsAdmin && (
            <aside>
              <menu type="toolbar">
                {!currentUserIsMember && (
                  <Button
                    action="request"
                    category="Groups"
                    className="success"
                    disabled={requestingToJoin || joinRequestSent}
                    label="Membership"
                    onClick={this._requestToJoin}>
                    {(!requestingToJoin && !joinRequestSent) && 'Request to join'}

                    {(!requestingToJoin && joinRequestSent) && (
                      <span><FontAwesomeIcon icon="check" /> Request sent</span>
                    )}

                    {requestingToJoin && (
                      <span><FontAwesomeIcon icon="spinner" pulse /> Sending request...</span>
                    )}
                  </Button>
                )}

                {currentUserIsMember && (
                  <Button
                    action="cancel"
                    category="Groups"
                    className="danger"
                    disabled={leaving[currentUserId]}
                    label="Membership"
                    onClick={() => this._removeMember(currentUserId)}>
                    {!leaving[currentUserId] && 'Leave group'}

                    {leaving[currentUserId] && (
                      <span><FontAwesomeIcon icon="spinner" pulse /> Leaving group...</span>
                    )}
                  </Button>
                )}
              </menu>
            </aside>
          )}
        </header>

        <div className="profile">
          <header>
            <Avatar src={group} />

            <section className="games">
              <h4>Games</h4>

              <ul className="group">
                {/* {games.map(game => (
                  <li key={game}>{game}</li>
                ))} */}
              </ul>
            </section>

            {currentUserIsMember && (
              <section className="location">
                <h4>Location</h4>

                <StaticMap
                  address={address}
                  category="Groups"
                  location={geo}
                  markers={[{ ...geo }]} />
              </section>
            )}
          </header>

          <TabPanel
            category="Groups"
            className="details">
            <Tab title="Details">
              <GroupDetailsPanel group={group} />
            </Tab>

            {currentUserIsMember && (
              <Tab title="Members">
                <section className="members">
                  {!members.length && (
                    <p>No other members.</p>
                  )}

                  {!!members.length && (
                    <ul className="card-list">
                      {members.map(user => {
                        const {
                          id,
                        } = user

                        const {
                          bio,
                          email,
                          username,
                        } = user.attributes

                        return (
                          <li
                            className="card"
                            key={id}>
                            <header>
                              <Avatar src={user} size="small" className="pull-left" />

                              <h2>{username}</h2>
                            </header>

                            <div className="content">
                              {!!bio && (
                                <Markdown input={bio} />
                              )}

                              {!bio && (
                                <em>No bio available</em>
                              )}
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

                                { currentUserIsAdmin && (
                                  <div className="secondary">
                                    <Button
                                      action="remove"
                                      category="Groups"
                                      className="secondary small"
                                      disabled={leaving[id]}
                                      label="Membership"
                                      onClick={() => this._removeMember(id)}>
                                      {!leaving[id] && 'Remove'}

                                      {leaving[id] && (
                                        <span><FontAwesomeIcon icon="spinner" pulse /> Removing...</span>
                                      )}
                                    </Button>
                                  </div>
                                )}
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
                <GroupSettingsPanel group={group} />
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
  'removeGroupMember',
  'requestToJoinGroup',
]

const mapStateToProps = (state, ownProps) => {
  let { id } = ownProps.query
  let currentUserIsMember = false
  let members = []

  if (!isUUID(id)) {
    id = convertSlugToUUID(id, 'groups')
  }

  const group = state.groups[id] || null

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
    id,
    members,
    currentUserId: ownProps.userId || null,
  }
}





export default Page(GroupProfile, title, {
  mapDispatchToProps,
  mapStateToProps,
})

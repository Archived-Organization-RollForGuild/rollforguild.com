// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import { Router } from '../../routes'
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import Component from '../../components/Component'
import GroupDetailsPanel from '../../components/Groups/GroupDetailsPanel'
import GroupEventsPanel from '../../components/Groups/GroupEventsPanel'
import GroupSettingsPanel from '../../components/Groups/GroupSettingsPanel'
import RegistrationDialog from '../../components/RegistrationDialog'
import Link from '../../components/Link'
import Main from '../../components/Main'
import Markdown from '../../components/Markdown'
import Page from '../../components/Page'
import PageDescription from '../../components/PageDescription'
import PageTitle from '../../components/PageTitle'
import PageHeader from '../../components/PageHeader'
import StaticMap from '../../components/StaticMap'





// Component constants
const adminRoles = ['owner', 'admin']
const memberRoles = ['owner', 'admin', 'member']
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


  async _handleEventLoad (newPage) {
    const {
      getGroupEvents,
      group,
    } = this.props

    const {
      eventData: {
        page: oldPage,
        loaded,
      },
    } = this.state

    if (loaded && oldPage === newPage) {
      return
    }

    const { payload, status } = await getGroupEvents(group.id, newPage)

    if (status === 'success') {
      this.setState({
        eventData: {
          ...this.state.eventData,
          loaded: true,
          page: newPage,
          totalPages: Math.ceil(payload.meta.total / payload.meta.limit),
        },
      })
    }
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

    const currentUserIsAdmin = adminRoles.includes(memberStatus)
    const currentUserIsMember = memberRoles.includes(memberStatus)

    if (currentUserIsAdmin) {
      const { payload } = await getJoinRequests(id)
      joinRequests = (payload && payload.data) ? payload.data : []
    }

    this.setState({
      currentUserIsAdmin,
      currentUserIsMember,
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
      '_handleEventLoad',
      '_removeMember',
      '_requestToJoin',
      '_requestToJoin',
    ])

    this.state = {
      currentUserIsAdmin: group && adminRoles.includes(group.attributes.member_status),
      currentUserIsMember: group && memberRoles.includes(group.attributes.member_status),
      gettingJoinRequests: false,
      eventData: {
        loaded: false,
        page: 1,
        totalPages: 1,
      },
      joinRequests: [],
      joinRequestSent: group && (group.attributes.member_status === 'pending'),
      leaving: {},
      loaded: group && group.attributes.member_status,
      requestingToJoin: false,
      showRegistrationModal: false,
    }
  }

  static async getInitialProps ({ query, store }) {
    let { id } = query

    if (!isUUID(id)) {
      id = convertSlugToUUID(id, 'groups')
    }

    await actions.getGroup(id)(store.dispatch)

    return { initialTab: query.tab || 'details' }
  }

  render () {
    const {
      currentUserId,
      group,
      initialTab,
      members,
    } = this.props
    const {
      currentUserIsAdmin,
      currentUserIsMember,
      gettingJoinRequests,
      eventData,
      joinRequests,
      joinRequestSent,
      leaving,
      loaded,
      requestingToJoin,
      showRegistrationModal,
    } = this.state

    if (!group && !loaded) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>Group Profile</h1>
          </PageHeader>

          <Main title={title}>
            <p>Loading...</p>
          </Main>
        </React.Fragment>
      )
    }

    if (!group) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>Group Profile</h1>
          </PageHeader>

          <Main title={title}>
            <p>No group with that ID was found.</p>
          </Main>
        </React.Fragment>
      )
    }

    const {
      address,
      description,
      geo,
      name,
      slug,
    } = group.attributes

    return (
      <React.Fragment>
        <PageTitle>{name}</PageTitle>
        <PageDescription>{description}</PageDescription>

        <Head>
          <meta property="og:image" content={`https://api.adorable.io/avatars/500/${group.id}`} />
          <meta property="og:url" content={`https://rfg.group/${slug}`} />
        </Head>

        <PageHeader>
          <h1>{name}</h1>

          <aside>
            <menu type="toolbar">
              {!currentUserIsMember && (
              <Button
                action="request"
                category="Groups"
                className="success"
                disabled={requestingToJoin || joinRequestSent}
                label="Membership"
                onClick={currentUserId ? this._requestToJoin : () => this.setState({ showRegistrationModal: true })}>
                {(!requestingToJoin && !joinRequestSent) && 'Request to join'}

                {(!requestingToJoin && joinRequestSent) && (
                  <span><FontAwesomeIcon icon="check" /> Request sent</span>
                )}

                {requestingToJoin && (
                  <span><FontAwesomeIcon icon="spinner" pulse /> Sending request...</span>
                )}
              </Button>
            )}

              {(currentUserIsMember && !currentUserIsAdmin) && (
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
        </PageHeader>

        <Main title={title}>
          <div className="profile">
            <header>
              <Avatar src={group} />

              {(currentUserIsMember && geo) && (
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
              className="details"
              defaultTab={initialTab}
              onSelect={tabId => {
                const route = `${window.location.pathname.replace(/\/(details|events|join-requests|members|settings)/, '')}/${tabId}`

                Router.replaceRoute(route, { tab: tabId }, { shallow: true })
              }}>
              <Tab
                id="details"
                title="Details">
                <GroupDetailsPanel group={group} />
              </Tab>

              {currentUserIsMember && (
                <Tab
                  id="events"
                  title="Events">
                  <GroupEventsPanel
                    {...eventData}
                    currentUserIsAdmin={currentUserIsAdmin}
                    onPageChange={this._handleEventLoad}
                    group={group} />
                </Tab>
              )}

              {currentUserIsMember && (
                <Tab
                  id="members"
                  title="Members">
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
                <Tab
                  id="join-requests"
                  title="Join Requests">
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
                <Tab
                  id="settings"
                  title="Settings">
                  <GroupSettingsPanel group={group} />
                </Tab>
              )}
            </TabPanel>
          </div>
        </Main>

        {showRegistrationModal && (
          <RegistrationDialog
            onClose={() => this.setState({ showRegistrationModal: false })}
            prompt="It doesn't look like you have an account yet! You'll need to register before you can join this group." />
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = [
  'getGroup',
  'getGroupEvents',
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
      currentUserIsMember = memberRoles.includes(memberStatus)
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





export default Page(GroupProfile, {
  mapDispatchToProps,
  mapStateToProps,
})

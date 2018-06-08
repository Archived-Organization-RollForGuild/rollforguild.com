// Module imports
import React from 'react'




// Component imports
import {
  Tab,
  TabPanel,
} from '../../components/TabPanel'
import { Router } from '../../routes'
import Avatar from '../../components/Avatar'
import Component from '../../components/Component'
import connect from '../../helpers/connect'
import Link from '../../components/Link'
import Main from '../../components/Main'
import PageDescription from '../../components/PageDescription'
import PageHeader from '../../components/PageHeader'
import PageTitle from '../../components/PageTitle'
import UserSettingsPanel from '../../components/UserProfilePanels/UserSettingsPanel'
import Markdown from '../../components/Markdown'
import GroupCard from '../../components/GroupCard'




// Component constants
const defaultTitle = 'User Profile'





class UserProfile extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleUserUpdate (response, changes) {
    if (response.status === 'success') {
      this.setState({ user: response.payload.data })

      if (changes.email) {
        this.props.pushAlert('Check your new email for confirmation!', 'warn', 'action required')
      }
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/
  async componentDidMount () {
    const {
      currentUserId,
      getUser,
      query,
    } = this.props
    let {
      currentUser,
      displayedUser,
    } = this.props

    const userIsCurrentUser = query.id === currentUserId

    if (!currentUser) {
      const response = await getUser(currentUserId)
      if (response.status === 'success') {
        currentUser = response.payload.data
      }
    }

    if (!displayedUser && !userIsCurrentUser) {
      const response = await getUser(query.id)
      if (response.status === 'success') {
        displayedUser = response.payload.data
      }
    } else if (!displayedUser && userIsCurrentUser) {
      displayedUser = { ...currentUser }
    }

    let userSharesGroup = !userIsCurrentUser

    if (!userIsCurrentUser && displayedUser && currentUser && displayedUser.relationships.groups.data.length && currentUser.relationships.groups.data.length) {
      const currentUserGroups = currentUser.relationships.groups.data.map(group => group.id)
      const displayedUserGroups = displayedUser.relationships.groups.data.map(group => group.id)

      userSharesGroup = currentUserGroups.some(group => displayedUserGroups.includes(group))
    }

    this.setState({
      loaded: true,
      user: displayedUser,
      userSharesGroup,
      userIsCurrentUser,
    })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleUserUpdate',
    ])

    this.state = {
      loaded: false,
      user: null,
      userIsCurrentUser: false,
      userSharesGroup: false,
    }
  }

  static async getInitialProps ({ query }) {
    return { initialTab: query.tab || 'details' }
  }

  render () {
    const {
      loaded,
      user,
      userIsCurrentUser,
      userSharesGroup,
    } = this.state

    const {
      groups,
      initialTab,
    } = this.props

    if (!user && !loaded) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>{defaultTitle}</h1>
          </PageHeader>

          <Main title={defaultTitle}>
            <p>Loading...</p>
          </Main>
        </React.Fragment>
      )
    }

    if (!user) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>{defaultTitle}</h1>
          </PageHeader>

          <Main title={defaultTitle}>
            <p>No user with that ID was found.</p>
          </Main>
        </React.Fragment>
      )
    }

    const {
      bio,
      email,
      username,
    } = user.attributes
    const title = userIsCurrentUser ? 'Your profile' : `${username}'s profile`

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>
        {Boolean(bio) && (
          <PageDescription>{bio}</PageDescription>
        )}

        <PageHeader>
          <h1>{title}</h1>

          <menu type="toolbar">
            {userSharesGroup && (
              <a
                className="button success"
                href={`mailto:${email}`}>
                Message
              </a>
            )}
          </menu>
        </PageHeader>

        <Main title={title}>
          <div className="profile">
            <header>
              <Avatar src={user} editable={userIsCurrentUser} />
            </header>

            <TabPanel
              category="Users"
              defaultTab={initialTab}
              onSelect={tabId => {
                const route = `${window.location.pathname.replace(/\/(details|groups|settings)/, '')}/${tabId}`

                Router.replaceRoute(route, { tab: tabId }, { shallow: true })
              }}>
              <Tab
                id="details"
                title="Details">
                <section className="bio">
                  <h4>Bio</h4>
                  <div className="section-content">
                    {Boolean(bio) && (
                      <p>{<Markdown input={bio} />}</p>
                    )}

                    {!bio && (
                      <p><em>{`${username} hasn't written their bio yet!`}</em></p>
                    )}
                  </div>
                </section>
              </Tab>

              {(userIsCurrentUser && groups) && (
                <Tab
                  id="groups"
                  title="Groups">
                  <section className="groups">
                    {!groups.length && (
                      <p>It doesn't look like you're a part of any groups yet. Would you like to <Link category="Groups" label="Search" route="group search"><a>search for groups in your area</a></Link>? Or maybe you should <Link category="My Groups" label="Create New Group" route="group create"><a>start a new one</a></Link>!</p>
                    )}

                    {Boolean(groups.length) && (
                      <ul className="card-list">
                        {groups.map(group => (<GroupCard key={group.id} group={group} />))}
                      </ul>
                    )}
                  </section>
                </Tab>
              )}

              {userIsCurrentUser && (
                <Tab
                  id="settings"
                  title="Settings">
                  <UserSettingsPanel
                    user={user}
                    onSubmit={this._handleUserUpdate} />
                </Tab>
              )}
            </TabPanel>
          </div>
        </Main>
      </React.Fragment>
    )
  }





  /***************************************************************************\
    Redux Maps
  \***************************************************************************/

  static mapDispatchToProps = [
    'getUser',
    'pushAlert',
  ]

  static mapStateToProps = (state, ownProps) => {
    const currentUserId = state.authentication.userId // User that the displayedUser is being displayed to.
    const displayedUserId = /^\/my\/profile/.test(ownProps.asPath) ? currentUserId : ownProps.query.id // User that is being displayed

    const currentUser = state.users[currentUserId] || null
    const displayedUser = state.users[displayedUserId] || null

    let groups = null
    if ((currentUserId === displayedUserId) && currentUser && currentUser.relationships) {
      groups = currentUser.relationships.groups.data.map(({ id }) => state.groups[id])
    }

    return {
      currentUser,
      currentUserId,
      displayedUser,
      initialTab: ownProps.query.tab || 'details',
      groups,
      query: {
        ...ownProps.query,
        id: displayedUserId,
      },
    }
  }
}





export default connect(UserProfile)

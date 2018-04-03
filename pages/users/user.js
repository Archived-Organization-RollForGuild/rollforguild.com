// Module imports
import React from 'react'




// Component imports
import {
  Tab,
  TabPanel,
} from '../../components/TabPanel'
import Avatar from '../../components/Avatar'
import Component from '../../components/Component'
import Link from '../../components/Link'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import UserSettingsPanel from '../../components/UserProfilePanels/UserSettingsPanel'





// Component constants
const title = 'User Profile'





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

  render () {
    const {
      loaded,
      user,
      userIsCurrentUser,
      userSharesGroup,
    } = this.state

    const {
      groups,
    } = this.props

    if (!user && !loaded) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>User</h1>
          </PageHeader>

          <Main title={title}>
            <p>Loading...</p>
          </Main>
        </React.Fragment>
      )
    }

    if (!user) {
      return (
        <React.Fragment>
          <PageHeader>
            <h1>User</h1>
          </PageHeader>

          <Main title={title}>
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

    return (
      <React.Fragment>
        <PageHeader>
          <h1>{userIsCurrentUser ? 'Your profile' : `${username}'s profile`}</h1>

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
              className="details">
              <Tab title="Details">
                <section className="bio">
                  <h4>Bio</h4>
                  <div className="section-content">
                    <p>{bio || `${username} hasn't written their bio yet!`}</p>
                  </div>
                </section>
              </Tab>

              {(userIsCurrentUser && groups) && (
                <Tab title="Groups">
                  <section className="groups">
                    <ul className="card-list">
                      {this.props.groups.map(group => {
                        const {
                          description,
                          name,
                          slug,
                        } = group.attributes

                        return (
                          <li
                            className="card"
                            key={group.id}>

                            <header>
                              <Avatar src={group} size="small" />

                              <h2>
                                <Link
                                  action="view-group"
                                  category="Users"
                                  label="Group"
                                  route="group profile"
                                  params={{ id: slug }}>
                                  <a>{name}</a>
                                </Link>
                              </h2>
                            </header>

                            <div className="content">
                              {description}
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                </Tab>
              )}

              {userIsCurrentUser && (
                <Tab title="Settings">
                  <UserSettingsPanel user={user} onSubmit={this._handleUserUpdate} />
                </Tab>
              )}
            </TabPanel>
          </div>
        </Main>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = [
  'getUser',
  'pushAlert',
]

const mapStateToProps = (state, ownProps) => {
  const currentUserId = ownProps.userId || null // User that the displayedUser is being displayed to.
  const displayedUserId = ownProps.asPath === '/my/profile' ? currentUserId : ownProps.query.id // User that is being displayed

  const currentUser = state.users[currentUserId] || null
  const displayedUser = state.users[currentUserId] || null

  let groups = null
  if ((currentUserId === displayedUserId) && currentUser && currentUser.relationships) {
    groups = currentUser.relationships.groups.data.map(({ id }) => state.groups[id])
  }

  return {
    currentUser,
    currentUserId,
    displayedUser,
    groups,
    query: {
      ...ownProps.query,
      id: displayedUserId,
    },
  }
}

export default Page(UserProfile, title, {
  mapDispatchToProps,
  mapStateToProps,
}, true)

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
import Page from '../../components/Page'
import UserSettingsPanel from '../../components/UserProfilePanels/UserSettingsPanel'





// Component constants
const title = 'User Profile'





class UserProfile extends Component {
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
          <header>
            <h1>User</h1>
          </header>

          <p>Loading...</p>
        </React.Fragment>
      )
    }

    if (!user) {
      return (
        <React.Fragment>
          <header>
            <h1>User</h1>
          </header>

          <p>No user with that ID was found.</p>
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
        <header>
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
        </header>

        <div className="profile">
          <header>
            <Avatar src={user} editable={userIsCurrentUser} />
          </header>

          <TabPanel className="details">
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
                  <ul>
                    {this.props.groups.map(group => (
                      <li
                        className="card"
                        key={group.id}>
                        <header>
                          {group.attributes.name}
                        </header>
                        <div className="content">
                          <Avatar src={group} size="small" className="pull-left" />
                          <h4>{group.attributes.name}</h4>
                        </div>
                        <footer>
                          <menu
                            className="compact"
                            type="toolbar">
                            <div className="primary">
                              <Link
                                category="User Profile"
                                label="Group Card"
                                route="group profile"
                                params={{ id: group.id }}>
                                <button
                                  className="small success" >
                                  View
                                </button>
                              </Link>
                            </div>
                          </menu>
                        </footer>
                      </li>
                    ))}
                  </ul>
                </section>
              </Tab>
            )}

            {userIsCurrentUser && (
              <Tab title="Settings">
                <UserSettingsPanel user={user} />
              </Tab>
            )}
          </TabPanel>


        </div>
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = [
  'getUser',
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

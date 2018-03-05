// Module imports
import React from 'react'




// Component imports
import Component from '../../components/Component'
import { Link } from '../../routes'
import Page from '../../components/Page'





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

    let userSharesGroup = userIsCurrentUser

    if (!userIsCurrentUser && displayedUser && currentUser && displayedUser.relationships.groups.data.length && currentUser.relationships.groups.data.length) {
      const currentUserGroups = currentUser.relationships.groups.data.map(group => group.id)
      const displayedUserGroups = displayedUser.relationships.groups.data.map(group => group.id)

      userSharesGroup = currentUserGroups.some(group => displayedUserGroups.includes(group))
    }

    this.setState({
      userSharesGroup,
      userIsCurrentUser,
      user: displayedUser,
      loaded: true,
    })
  }

  constructor (props) {
    super(props)

    this.state = {
      userSharesGroup: false,
      userIsCurrentUser: false,
      user: null,
      loaded: false,
    }
  }

  get renderUserProfile () {
    const {
      userSharesGroup,
      userIsCurrentUser,
      user,
    } = this.state


    const {
      avatar,
      bio,
      email,
      username,
    } = user.attributes



    return (
      <React.Fragment>
        <div className="page-content">
          <div className="user-details">
            <div className="user-details-card">
              <img
                className="user-image"
                src={avatar ? `/api/users/${user.id}/avatar` : `//api.adorable.io/avatars/500/${encodeURIComponent(user.id)}`}
                alt="User Avatar" />

              <div className="user-name">
                <h4>{username}</h4>
              </div>

              <menu
                className="compact"
                type="toolbar">

                {userSharesGroup && (
                  <a
                    className="button small success"
                    href={`mailto:${email}`}>
                    Message
                  </a>
                )}

                <button className="danger small">
                  block
                </button>

              </menu>
            </div>
          </div>
          <div className="profile-section user-bio">
            <h4>About {username}</h4>
            <div className="section-content">
              { bio || 'Blah blash blah I\'m a user bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}
            </div>
          </div>

          {/*<div className="profile-section user-game-history">
            <h4>{username}'s favorite games</h4>
            <ul className="section-content gamelist">
              {gamesHistory.map(game => (
                <li key={game.replace(' ', '')}>{game}</li>
              ))}
            </ul>
          </div>
          <div className="profile-section user-game-interest">
            <h4>Games {username} wants to play</h4>
            <ul className="section-content gamelist">
              {gamesInterest.map(game => (
                <li key={game.replace(' ', '')}>{game}</li>
              ))}
            </ul>
          </div>*/}

          {userIsCurrentUser && (
            <div className="groups">
              <h4>Groups</h4>

              <ul className="gamelist">
                {this.props.groups.map(group => (
                  <li key={group.id}>
                    <Link as={`/groups/${group.id}`} href={`/groups/group?id=${group.id}`}>
                      <a>{group.attributes.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }

  render () {
    const {
      loaded,
      user,
      userIsCurrentUser,
    } = this.state

    let pageTitle = 'Loading profile...'

    if (loaded && userIsCurrentUser) {
      pageTitle = 'Your profile'
    } else if (loaded && user) {
      pageTitle = `${user.attributes.username}'s profile`
    } else if (loaded && !user) {
      pageTitle = 'User Profile'
    }

    return (
      <React.Fragment>
        <header>
          <h1>{pageTitle}</h1>
        </header>

        {(loaded && !user) && (
          <p>No user with that ID was found.</p>
        )}

        {(loaded && user) && this.renderUserProfile}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getUser']

const mapStateToProps = (state, ownProps) => {
  const currentUserId = ownProps.userId || null // User that the displayedUser is being displayed to.
  const displayedUserId = ownProps.asPath === '/my/profile' ? currentUserId : ownProps.query.id // User that is being displayed

  const currentUser = state.users[currentUserId] || null
  const displayedUser = state.users[currentUserId] || null

  const newState = {
    currentUser,
    currentUserId,
    displayedUser,
    query: {
      ...ownProps.query,
      id: displayedUserId,
    },
  }

  if ((currentUserId === displayedUserId)
    && currentUser
    && currentUser.relationships
    && currentUser.relationships.groups
    && currentUser.relationships.groups.data) {
    newState.groups = currentUser.relationships.groups.data.map(({ id }) => state.groups[id])
  }

  return newState
}

export default Page(UserProfile, title, {
  mapDispatchToProps,
  mapStateToProps,
}, true)

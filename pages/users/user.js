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
    } = this.props
    const { id } = this.props.query
    let {
      currentUser,
      displayedUser,
    } = this.props

    if (!currentUser && currentUserId) {
      const response = await getUser(currentUserId)
      if (response.status === 'success') {
        currentUser = response.payload.data
      }
    }

    if (!displayedUser) {
      const response = await getUser(id)
      if (response.status === 'success') {
        displayedUser = response.payload.data
      }
    }

    this.setState({
      currentUser,
      displayedUser,
      loaded: true,
    })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      'currentUserIsDisplayedUser',
      'currentUserSharesGroup',
    ])

    this.state = {
      currentUser: null,
      displayedUser: null,
      loaded: false,
    }
  }

  currentUserIsDisplayedUser () {
    const {
      currentUser,
      displayedUser,
    } = this.state

    return currentUser !== null &&
      displayedUser !== null &&
      currentUser.id === displayedUser.id
  }

  currentUserSharesGroup () {
    const {
      currentUser,
      displayedUser,
    } = this.state

    // If the current user is the same as the displayed user, return true.
    if (this.currentUserIsDisplayedUser()) {
      return true
    }

    // Ensure current user and displayed user exists, then make sure each user has groups to compare. if any condition isn't met, return false.
    if (!currentUser || !displayedUser || !currentUser.relationships.groups.data.length || !displayedUser.relationships.groups.data.length) {
      return false
    }

    // Get a list of group ids for both current user and displayed user.
    const currentUserGroups = currentUser.relationships.groups.data.map(group => group.id)
    const displayedUserGroups = displayedUser.relationships.groups.data.map(group => group.id)

    // If any of the current user's groups are shared with the display user, return true.
    return currentUserGroups.some(group => displayedUserGroups.includes(group))
  }

  get renderUserProfile () {
    const {
      displayedUser,
    } = this.state
    const {
      avatar,
      bio,
      email,
      gamesHistory,
      username,
      gamesInterest,
    } = displayedUser.attributes

    const displayedUserSharesGroup = this.currentUserSharesGroup()

    return (
      <React.Fragment>
        <div className="page-content">
          <div className="user-details">
            <div className="user-details-card">
              <img
                className="user-image"
                src={avatar ? `/api/users/${displayedUser.id}/avatar` : `//api.adorable.io/avatars/500/${encodeURIComponent(displayedUser.id)}`}
                alt="User Avatar" />

              <div className="user-name">
                <h4>{username}</h4>
              </div>

              <menu
                className="compact"
                type="toolbar">

                {displayedUserSharesGroup && (
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
          <div className="profile-section user-game-history">
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
          </div>

          {this.currentUserIsDisplayedUser() && (
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
      displayedUser,
    } = this.state

    let pageTitle = 'Loading profile...'

    if (loaded && this.currentUserIsDisplayedUser()) {
      pageTitle = (
        <React.Fragment>
          <h1>Your profile</h1>

          <Link
            href="/users/edit"
            as="/my/profile/edit" >
            <a className="button small success edit-button">
              Edit
            </a>
          </Link>

        </React.Fragment>
      )
    } else if (loaded && displayedUser) {
      pageTitle = (
        <h1>{displayedUser.attributes.username}'s profile</h1>
      )
    } else if (loaded && !displayedUser) {
      pageTitle = (
        <h1>A user's profile</h1>
      )
    }

    return (
      <React.Fragment>
        <header>
          {pageTitle}
        </header>

        {!loaded && (
          <p>Loading...</p>
        )}

        {(loaded && !displayedUser) && (
          <p>No user with that ID was found.</p>
        )}

        {(loaded && displayedUser) && this.renderUserProfile}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getUser']

const mapStateToProps = (state, ownProps) => {
  const currentUserId = ownProps.userId || null
  const displayedUserId = ownProps.asPath === '/my/profile' ? currentUserId : ownProps.query.id

  const currentUser = state.users[currentUserId] || null

  const newState = {
    currentUser, // User that the displayedUser is being displayed to.
    currentUserId,
    displayedUser: state.users[displayedUserId] || null, // User that is being displayed
    query: {
      ...ownProps.query,
      id: displayedUserId,
    },
  }

  if ((currentUserId === displayedUserId) && currentUser) {
    newState.groups = currentUser.relationships.groups.data.map(({ id }) => state.groups[id])
  }

  return newState
}

export default Page(UserProfile, title, {
  mapDispatchToProps,
  mapStateToProps,
})

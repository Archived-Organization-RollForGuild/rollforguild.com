// Module imports
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'





// Module imports
import connect from '../helpers/connect'
import Link from './Link'
import Avatar from './Avatar'
import Component from './Component'





// Constants
const allowedLinkKeys = ['label', 'params', 'route']
const navItems = [
  {
    key: 'groups',
    title: () => (
      <React.Fragment>
        <FontAwesomeIcon icon="users" fixedWidth />
        <span>Groups</span>
      </React.Fragment>
    ),
    subnav: [
      {
        key: 'group-search',
        route: '/groups/search',
        title: () => (
          <React.Fragment>
            <FontAwesomeIcon icon="search" fixedWidth />
            <span>Search</span>
          </React.Fragment>
        ),
      },

      {
        condition: ({ loggedIn }) => loggedIn && (loggedIn !== 'error'),
        key: 'my-groups',
        params: { tab: 'groups' },
        route: 'user profile current',
        title: () => (
          <React.Fragment>
            <FontAwesomeIcon icon="users" fixedWidth />
            <span>My Groups</span>
          </React.Fragment>
        ),
      },

      {
        condition: ({ loggedIn }) => loggedIn && (loggedIn !== 'error'),
        key: 'create-group',
        route: 'group create',
        title: () => (
          <React.Fragment>
            <FontAwesomeIcon icon="plus" fixedWidth />
            <span>New Group</span>
          </React.Fragment>
        ),
      },
    ],
  },
  {
    condition: ({ loggedIn }) => loggedIn && (loggedIn !== 'error'),
    key: 'profile-links',
    title: ({ user }) => {
      if (user) {
        const {
          email,
          username,
        } = user.attributes

        if (typeof window !== 'undefined' && window.zE) {
          window.zE(() => {
            window.zE.identify({
              email,
              name: username,
            })
          })
        }

        return (
          <React.Fragment>
            <Avatar src={user} size="tiny" />
            <span>{username}</span>
          </React.Fragment>
        )
      }

      return 'Loading...'
    },
    subnav: [
      {
        key: 'my-profile',
        route: 'user profile current',
        title: () => (
          <React.Fragment>
            <FontAwesomeIcon icon="user-circle" fixedWidth />
            <span>My Profile</span>
          </React.Fragment>
        ),
      },
      {
        key: 'logout',
        route: '/logout',
        title: () => (
          <React.Fragment>
            <FontAwesomeIcon icon="sign-out-alt" fixedWidth />
            <span>Logout</span>
          </React.Fragment>
        ),
      },
    ],
  },
  {
    condition: props => !props.loggedIn || (props.loggedIn === 'error'),
    key: 'login',
    route: '/login',
    title: () => (
      <React.Fragment>
        <FontAwesomeIcon icon="sign-in-alt" fixedWidth />
        <span>Login</span>
      </React.Fragment>
    ),
  },
  {
    key: 'forums',
    route: 'forum list',
    title: () => (
      <React.Fragment>
        <FontAwesomeIcon icon="comments" fixedWidth />
        <span>Forums</span>
      </React.Fragment>
    ),
  },
]





class Nav extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    openSubnav: '',
  }


  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleSubnavChange = ({ target }) => {
    const { openSubnav } = this.state
    const { id } = target

    this.setState({ openSubnav: openSubnav === id ? '' : id })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentWillMount () {
    const {
      getUser,
      loggedIn,
      user,
    } = this.props

    if (loggedIn && !user) {
      await getUser(Cookies.get('userId'))
    }
  }

  render () {
    return (
      <nav>
        <ul>{navItems.map(this.renderNavItem)}</ul>
      </nav>
    )
  }

  renderNavItem = (item) => {
    const { path } = this.props
    const { openSubnav } = this.state
    const {
      condition,
      subnav,
      title,
    } = item

    if (condition && !condition(this.props)) {
      return null
    }

    const itemWithOnlyLinkProps = {}
    let renderedItemTitle = typeof title === 'string' ? title : title(this.props)
    let renderedSubnav
    let renderedSubnavToggle

    const key = item.key || renderedItemTitle.toLowerCase().replace(/\s/g, '-')

    for (const [itemKey, itemValue] of Object.entries(item)) {
      if (allowedLinkKeys.includes(itemKey)) {
        itemWithOnlyLinkProps[itemKey] = itemValue
      }
    }

    if (subnav) {
      renderedItemTitle = (
        <label htmlFor={key}>
          {renderedItemTitle}
        </label>
      )

      renderedSubnav = (
        <ul className="subnav">
          {subnav.map(this.renderNavItem)}
        </ul>
      )

      renderedSubnavToggle = (
        <input
          className="subnav-toggle"
          defaultChecked={subnav.find(({ href }) => href === path)}
          hidden
          id={key}
          checked={openSubnav === key}
          onClick={this._handleSubnavChange}
          name="subnav"
          type="radio" />
      )
    } else {
      renderedItemTitle = (
        <Link
          {...itemWithOnlyLinkProps}
          category="Navigation"
          label={typeof renderedItemTitle === 'string' ? renderedItemTitle : key}>
          <a>{renderedItemTitle}</a>
        </Link>
      )
    }

    return (
      <li key={title}>
        {renderedSubnavToggle}

        {renderedItemTitle}

        {renderedSubnav}
      </li>
    )
  }
}





const mapDispatchToProps = ['getUser']

const mapStateToProps = state => ({
  ...state.authentication,
  user: state.users[state.authentication.userId],
})





export default connect(mapStateToProps, mapDispatchToProps)(Nav)

// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import React from 'react'





// Module imports
import { actions } from '../store'
import { Link } from '../routes'
import Component from './Component'





// Constants
const navItems = [
  {
    title: 'Groups',
    subnav: [
      {
        href: '/my/groups',
        title: 'My Groups',
      },

      {
        href: '/groups/search',
        title: 'Search',
      },
    ],
  },

  // {
  //   title: 'Content',
  //   subnav: [
  //     {
  //       href: '/my/characters',
  //       title: 'Characters',
  //     },
  //   ],
  // },

  {
    condition: ({ loggedIn }) => loggedIn && (loggedIn !== 'error'),
    key: 'my-profile',
    title: ({ user }) => {
      if (user) {
        const { username } = user.attributes
        const avatarSrc = user.attributes.avatar ? `/api/users/${user.id}/avatar` : `//api.adorable.io/avatars/20/${user.id}`

        return (
          <React.Fragment>
            <div
              aria-label={`${username}'s Avatar`}
              className="avatar tiny"
              role="img"
              style={{ backgroundImage: `url(${avatarSrc})` }} />
            <span>{username}</span>
          </React.Fragment>
        )
      }

      return 'Loading...'
    },
    subnav: [
      // {
      //   href: '/my/activity-feed',
      //   title: 'Activity Feed',
      // },
      {
        route: 'user profile current',
        title: 'My Profile',
      },
      {
        href: '/logout',
        title: 'Logout',
      },
    ],
  },

  // {
  //   title: 'GM Tools',
  //   subnav: [
  //     {
  //       href: '/roadmap#3005240', // '/groups/manage',
  //       title: 'Groups',
  //     },

  //     {
  //       href: '/roadmap#3005241', // '/gm/dungeons',
  //       title: 'Dungeons',
  //     },

  //     {
  //       href: '/roadmap#3005245', // '/gm/encounters',
  //       title: 'Encounters',
  //     },

  //     // {
  //     //   href: '/roadmap#3005240', // '/gm/monsters',
  //     //   title: 'Monsters',
  //     // },

  //     {
  //       href: '/roadmap#3005248', // '/gm/npcs',
  //       title: 'NPCs',
  //     },

  //     {
  //       href: '/roadmap#3005243', // '/gm/treasure',
  //       title: 'Treasure',
  //     },
  //   ],
  // },

  // {
  //   title: 'About',
  //   subnav: [
  //     // {
  //     //   href: '/mission-statement',
  //     //   title: 'Our Mission',
  //     // },

  //     {
  //       href: '/roadmap',
  //       title: 'Roadmap',
  //     },

  //     {
  //       href: '/contact',
  //       title: 'Contact Us',
  //     },
  //   ],
  // },

  {
    condition: props => !props.loggedIn || (props.loggedIn === 'error'),
    href: '/login',
    title: 'Login/Sign Up',
  },
]





class Nav extends Component {
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

  constructor (props) {
    super(props)

    this._bindMethods(['renderNavItem'])
  }

  render () {
    return (
      <nav>
        <ul>{navItems.map(this.renderNavItem)}</ul>
      </nav>
    )
  }

  renderNavItem (item) {
    const { path } = this.props
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
      if (/^href|as|route|params$/gi.test(itemKey)) {
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
          name="subnav"
          type="radio" />
      )
    } else {
      renderedItemTitle = (<Link {...itemWithOnlyLinkProps}><a>{renderedItemTitle}</a></Link>)
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





const mapDispatchToProps = dispatch => ({ getUser: bindActionCreators(actions.getUser, dispatch) })

const mapStateToProps = state => ({
  ...state.authentication,
  user: Object.values(state.users).find(({ loggedIn }) => loggedIn),
})





export default connect(mapStateToProps, mapDispatchToProps)(Nav)

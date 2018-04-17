// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import React from 'react'





// Module imports
import { actions } from '../store'
import Link from './Link'
import Avatar from './Avatar'
import Component from './Component'





// Constants
const navItems = [
  {
    title: 'Groups',
    subnav: [
      {
        route: '/my/groups',
        title: 'My Groups',
      },

      {
        route: '/groups/search',
        title: 'Search',
      },
    ],
  },
  {
    condition: ({ loggedIn }) => loggedIn && (loggedIn !== 'error'),
    key: 'my-profile',
    title: ({ user }) => {
      if (user) {
        const {
          email,
          username,
        } = user.attributes

        if (window.zE) {
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
        route: 'user profile current',
        title: 'My Profile',
      },
      {
        route: '/logout',
        title: 'Logout',
      },
    ],
  },
  {
    condition: props => !props.loggedIn || (props.loggedIn === 'error'),
    route: '/login',
    title: 'Login/Sign Up',
  },
  {
    route: 'forum list',
    title: 'Forums',
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
      if (/^label|route|params$/gi.test(itemKey)) {
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
      renderedItemTitle = (
        <Link
          {...itemWithOnlyLinkProps}
          category="Navigation"
          label={renderedItemTitle}>
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





const mapDispatchToProps = dispatch => bindActionCreators({
  getUser: actions.getUser,
}, dispatch)

const mapStateToProps = state => ({
  ...state.authentication,
  user: Object.values(state.users).find(({ loggedIn }) => loggedIn),
})





export default connect(mapStateToProps, mapDispatchToProps)(Nav)

// Module imports
import { connect } from 'react-redux'
import React from 'react'





// Module imports
import { Link } from '../routes'
import Component from './Component'





// Constants
const navItems = [
  {
    title: 'Player Tools',
    subnav: [
      {
        href: '/my/characters',
        title: 'My Characters',
      },

      {
        href: '/groups/manage',
        title: 'My Groups',
      },
    ],
  },

  {
    title: 'GM Tools',
    subnav: [
      {
        href: '/roadmap#3005240', // '/groups/manage',
        title: 'Groups',
      },

      {
        href: '/roadmap#3005241', // '/gm/dungeons',
        title: 'Dungeons',
      },

      {
        href: '/roadmap#3005245', // '/gm/encounters',
        title: 'Encounters',
      },

      // {
      //   href: '/roadmap#3005240', // '/gm/monsters',
      //   title: 'Monsters',
      // },

      {
        href: '/roadmap#3005248', // '/gm/npcs',
        title: 'NPCs',
      },

      {
        href: '/roadmap#3005243', // '/gm/treasure',
        title: 'Treasure',
      },
    ],
  },

  {
    title: 'About',
    subnav: [
      // {
      //   href: '/mission-statement',
      //   title: 'Our Mission',
      // },

      {
        href: '/roadmap',
        title: 'Roadmap',
      },

      {
        href: '/contact',
        title: 'Contact Us',
      },
    ],
  },

  {
    condition: props => !props.loggedIn || (props.loggedIn === 'error'),
    href: '/login',
    title: 'Login/Sign Up',
  },

  {
    condition: props => props.loggedIn && (props.loggedIn !== 'error'),
    href: '/logout',
    title: 'Logout',
  },
]





class Nav extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

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
    const sanitizedTitle = title.toLowerCase().replace(/\s/g, '-')
    let renderedItemTitle
    let renderedSubnav
    let renderedSubnavToggle

    Object.keys(item).forEach(key => {
      if (/^href|as$/gi.test(key)) {
        itemWithOnlyLinkProps[key] = item[key]
      }
    })

    renderedItemTitle = (<span>{title}</span>)

    if (subnav) {
      renderedItemTitle = (
        <label htmlFor={sanitizedTitle}>{renderedItemTitle}</label>
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
          id={sanitizedTitle}
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





const mapStateToProps = state => ({ ...state.authentication })





export default connect(mapStateToProps)(Nav)


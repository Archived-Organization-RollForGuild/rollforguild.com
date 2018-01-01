// Module imports
import Link from 'next/link'
import React from 'react'





// Module imports
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
        href: '/roadmap#3005240', // '/groups/manage',
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
    ],
  },

  // {
  //   href: '/login',
  //   title: 'Login/Register',
  // },
]





export default class extends Component {
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
      subnav,
      title,
    } = item

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

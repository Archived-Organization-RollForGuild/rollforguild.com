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
        href: '/my/groups',
        title: 'My Groups',
      },

      {
        href: '/my/characters',
        title: 'My Characters',
      },
    ]
  },

  {
    title: 'GM Tools',
    subnav: [
      {
        href: '/groups/manage',
        title: 'Group Manager',
      },

      {
        href: '/gm/dungeons',
        title: 'Dungeons',
      },

      {
        href: '/gm/encounters',
        title: 'Encounters',
      },

      {
        href: '/gm/monsters',
        title: 'Monsters',
      },

      {
        href: '/gm/npcs',
        title: 'NPCs',
      },

      {
        href: '/gm/treasures',
        title: 'Treasure',
      },
    ]
  },

  {
    href: '/login',
    title: 'Login/Register',
  },
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

  renderNavItem (item, index, navItems) {
    let {
      subnav,
      title,
    } = item

    let itemWithOnlyLinkProps
    let renderedItemTitle
    let renderedSubnav
    let renderedSubnavToggle
    let sanitizedTitle = title.toLowerCase().replace(/\s/g, '-')

    itemWithOnlyLinkProps = {}

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
          hidden={true}
          id={sanitizedTitle}
          type="checkbox" />
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

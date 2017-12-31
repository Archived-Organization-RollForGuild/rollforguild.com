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
        href: '/groups/manage',
        title: 'My Groups',
      },
    ],
  },

  {
    title: 'GM Tools',
    subnav: [
      {
        href: '/groups/manage',
        title: 'Groups',
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
        href: '/gm/treasure',
        title: 'Treasure',
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

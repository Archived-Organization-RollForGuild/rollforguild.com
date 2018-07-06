// Module Imports
import PropTypes from 'prop-types'





// Component Imports
import PageNavigation from '../PageNavigation'





const GroupNavigation = props => {
  const {
    slug,
  } = props

  return (
    <PageNavigation
      activePage={props.activePage}
      pages={[
        {
          category: 'Group Profile Navigation',
          route: `/groups/${slug}`,
          label: 'details',
          key: 'details',
          title: 'Details',
        },
        {
          category: 'Group Profile Navigation',
          route: `/groups/${slug}/events`,
          label: 'events',
          key: 'events',
          title: 'Events',
        },
        {
          category: 'Group Profile Navigation',
          route: `/groups/${slug}/members`,
          label: 'members',
          key: 'members',
          title: 'Members',
        },
        {
          category: 'Group Profile Navigation',
          route: `/groups/${slug}/settings`,
          label: 'settings',
          key: 'settings',
          title: 'Settings',
        },
      ]} />
  )
}

GroupNavigation.propTypes = {
  activePage: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
}





export default GroupNavigation

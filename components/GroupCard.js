// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'



// Component imports
import { actions } from '../store'
import Link from './Link'
import Markdown from './Markdown'
import Avatar from './Avatar'



const GroupCard = (props) => {
  const { group } = props

  const {
    description,
    members,
    name,
    slug,
  } = group.attributes

  return (
    <div className="card">
      <header>
        <Avatar src={group} size="small" />
        <h2 title={name}>
          <Link
            action="view-group"
            category="Groups"
            label="Search"
            route="group profile"
            params={{ id: slug }}>
            <a>{name}</a>
          </Link>
        </h2>
      </header>

      {members && (
        <div className="meta">
          <small>{members} members</small>
        </div>
      )}

      <div className="content">
        {Boolean(description) && (
          <p>{<Markdown input={description} />}</p>
        )}

        {!description && (
          <p><em>No description available</em></p>
        )}
      </div>
    </div>
  )
}

GroupCard.propTypes = {
  group: PropTypes.object.isRequired,
}



const mapDispatchToProps = dispatch => bindActionCreators({
  requestToJoinGroup: actions.requestToJoinGroup,
}, dispatch)





export default connect(null, mapDispatchToProps)(GroupCard)

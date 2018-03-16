// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'




// Component imports
import { actions } from '../store'
import { Link } from '../routes'





const GroupCard = (props) => {
  const { group } = props

  const {
    description,
    games,
    members,
    name,
    slug,
  } = group.attributes

  return (
    <div className="card">
      <header>
        <h2 title={name}>
          <Link
            route="group profile"
            params={{ id: slug }}>
            <a>{name}</a>
          </Link>
        </h2>

        <small>{members} members</small>
      </header>

      <div className="content">
        {!!description && (
          <p>{description}</p>
        )}

        {!description && (
          <p><em>No description</em></p>
        )}

        {games && (
          <header>
            <h3>Games:</h3>
          </header>
        )}

        {games && (
          <ul className="comma-separated inline">
            {games.map(game => (
              <li key={game}>{game}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}





const mapDispatchToProps = dispatch => ({ requestToJoinGroup: bindActionCreators(actions.requestToJoinGroup, dispatch) })





export default connect(null, mapDispatchToProps)(GroupCard)

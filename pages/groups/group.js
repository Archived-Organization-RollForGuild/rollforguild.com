// Module imports
import React from 'react'
// import Switch from 'rc-switch'





// Component imports
import Component from '../../components/Component'
import Page from '../../components/Page'
import StaticMap from '../../components/StaticMap'





// Component constants
const title = 'Group'





class GroupProfile extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const { getGroup } = this.props
    const { id } = this.props.query
    const { group } = this.props

    if (!group) {
      await getGroup(id)
    }

    this.setState({ loaded: true })
  }

  constructor (props) {
    super(props)

    this.state = { loaded: false }
  }

  render () {
    const { loaded } = this.state
    const {
      members,
      group,
    } = this.props

    if (!group && !loaded) {
      return (
        <React.Fragment>
          <header>
            <h1>Group</h1>
          </header>

          <p>Loading...</p>
        </React.Fragment>
      )
    }

    if (!group) {
      return (
        <React.Fragment>
          <header>
            <h1>Group</h1>
          </header>

          <p>No group with that ID was found.</p>
        </React.Fragment>
      )
    }

    const {
      description,
      games,
      geo,
      name,
    } = group.attributes
    const memberStatus = group.attributes.member_status // Because camelCase

    return (
      <React.Fragment>
        <header>
          <h1>{name}</h1>
        </header>

        <div className="games">
          <h2>Games</h2>
          <ul className="comma-separated inline">
            {games.map(game => (
              <li key={game}>{game}</li>
            ))}
          </ul>
        </div>

        <div className="description">
          <h2>Description</h2>
          <p>{description || 'No description.'}</p>
        </div>

        {(!!memberStatus && (memberStatus !== 'pending')) && (
          <div className="location">
            <h2>Location</h2>

            <StaticMap
              location={geo}
              markers={[{ ...geo }]} />
          </div>
        )}

        {members && (
          <div className="players">
            <header>Members:</header>

            <ul>
              {members.map(({ attributes, id }) => (
                <li key={id}>
                  <img
                    alt={`Avatar for ${attributes.username}`}
                    className="avatar"
                    src={`//api.adorable.io/avatars/50/${id}`} />

                  <header>
                    {attributes.username}
                  </header>

                  <menu
                    className="compact"
                    type="toolbar">
                    <div className="primary">
                      <a
                        className="button small success"
                        href={`mailto:${attributes.email}`}>
                        Message
                      </a>

                      <button className="danger small">
                        Remove
                      </button>
                    </div>
                  </menu>
                </li>
              ))}
            </ul>
          </div>
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getGroup']

const mapStateToProps = (state, ownProps) => {
  const group = state.groups[ownProps.query.id] || null
  let members = null

  if (group && group.attributes.member_status && group.attributes.member_status !== 'pending') {
    members = group.relationships.group_members.data.map(member => state.users[member.id])
  }

  return {
    group,
    members,
  }
}





export default Page(GroupProfile, title, {
  mapDispatchToProps,
  mapStateToProps,
})

// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'





// Component imports
import Avatar from '../../components/Avatar'
import Button from '../../components/Button'
import connect from '../../helpers/connect'
import GroupHeader from '../../components/Groups/GroupHeader'
import GroupPage from '../../components/Groups/GroupPage'
import Main from '../../components/Main'
import Markdown from '../../components/Markdown'





// Component constants
const title = 'Group Profile'





class GroupEvents extends GroupPage {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    leaving: {},
    loaded: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _removeMember = async (userId) => {
    const {
      group,
      removeGroupMember,
    } = this.props

    this.setState({
      leaving: {
        [userId]: true,
      },
    })

    const { status } = await removeGroupMember(group.id, userId)

    if (status === 'success') {
      window.location.reload()
    }
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  renderPage = () => {
    const {
      currentUserId,
      group,
      members,
    } = this.props

    const {
      leaving,
    } = this.state

    const { currentUserIsAdmin } = group.attributes

    return (
      <React.Fragment>
        <GroupHeader
          currentUserId={currentUserId}
          group={group}
          title={title} />
        <Main title={title}>
          <div className="profile">
            <section className="members">
              {!members.length && (
                <p>No other members.</p>
              )}

              {!!members.length && (
                <ul className="card-list">
                  {members.map(user => {
                    const {
                      id,
                    } = user

                    const {
                      bio,
                      email,
                      username,
                    } = user.attributes

                    return (
                      <li
                        className="card"
                        key={id}>
                        <header>
                          <Avatar src={user} size="small" className="pull-left" />

                          <h2>{username}</h2>
                        </header>

                        <div className="content">
                          {!!bio && (
                            <Markdown input={bio} />
                          )}

                          {!bio && (
                            <em>No bio available</em>
                          )}
                        </div>

                        <footer>
                          <menu
                            className="compact"

                            type="toolbar">
                            <div className="primary">
                              <a
                                className="button small success"
                                href={`mailto:${email}`}>
                                Message
                              </a>
                            </div>

                            {currentUserIsAdmin && (
                              <div className="secondary">
                                <Button
                                  action="remove"
                                  category="Groups"
                                  className="secondary small"
                                  disabled={leaving[id]}
                                  label="Membership"
                                  onClick={() => this._removeMember(id)}>
                                  {!leaving[id] && 'Remove'}

                                  {leaving[id] && (
                                    <span><FontAwesomeIcon icon="spinner" pulse /> Removing...</span>
                                  )}
                                </Button>
                              </div>
                            )}
                          </menu>
                        </footer>
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          </div>
        </Main>
      </React.Fragment>
    )
  }
}





export default connect(GroupEvents)

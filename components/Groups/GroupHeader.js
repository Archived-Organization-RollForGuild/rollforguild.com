// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import React from 'react'




// Component imports
import Button from '../Button'
import Component from '../Component'
import connect from '../../helpers/connect'
import PageDescription from '../PageDescription'
import GroupNavigation from './GroupNavigation'
import PageTitle from '../PageTitle'
import PageHeader from '../PageHeader'
import RegistrationDialog from '../RegistrationDialog'





class GroupHeader extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/
  state = {
    joinRequestSent: false,
    leaving: {},
    requestingToJoin: false,
    showRegistrationModal: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _toggleRegistrationModal = () => {
    this.setState({ showRegistrationModal: !this.state.showRegistrationModal })
  }

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

  render () {
    const {
      currentUserId,
      group,
      title,
    } = this.props

    const {
      joinRequestSent,
      leaving,
      requestingToJoin,
      showRegistrationModal,
    } = this.state

    const {
      description,
      currentUserIsAdmin,
      currentUserIsMember,
      slug,
    } = group.attributes

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        {
          Boolean(description) && (
            <PageDescription>{description.substr(0, 300)}</PageDescription>
          )
        }

        <Head>
          <meta property="og:image" content={`https://api.adorable.io/avatars/500/${group.id}`} />
          <meta property="og:url" content={`https://rfg.group/${slug}`} />
        </Head>

        <PageHeader>
          <h1>{title}</h1>

          <aside>
            <menu type="toolbar">
              {!currentUserIsMember && (
                <Button
                  action="request"
                  category="Groups"
                  className="success"
                  disabled={requestingToJoin || joinRequestSent}
                  label="Membership"
                  onClick={currentUserId ? this._requestToJoin : () => this.setState({ showRegistrationModal: true })}>
                  {(!requestingToJoin && !joinRequestSent) && 'Request to join'}

                  {(!requestingToJoin && joinRequestSent) && (
                    <span><FontAwesomeIcon icon="check" /> Request sent</span>
                  )}

                  {requestingToJoin && (
                    <span><FontAwesomeIcon icon="spinner" pulse /> Sending request...</span>
                  )}
                </Button>
              )}

              {(currentUserIsMember && !currentUserIsAdmin) && (
                <Button
                  action="cancel"
                  category="Groups"
                  className="danger"
                  disabled={leaving[currentUserId]}
                  label="Membership"
                  onClick={() => this._removeMember(currentUserId)}>
                  {!leaving[currentUserId] && 'Leave group'}

                  {leaving[currentUserId] && (
                    <span><FontAwesomeIcon icon="spinner" pulse /> Leaving group...</span>
                  )}
                </Button>
              )}
            </menu>
          </aside>

          <GroupNavigation activePage="details" slug={slug} />
        </PageHeader>

        {showRegistrationModal && (
          <RegistrationDialog
            onClose={() => this.setState({ showRegistrationModal: false })}
            prompt="It doesn't look like you have an account yet! You'll need to register before you can join this group." />
        )}
      </React.Fragment>
    )
  }

  static mapDispatchToProps = ['removeGroupMember']
}


export default connect(GroupHeader)

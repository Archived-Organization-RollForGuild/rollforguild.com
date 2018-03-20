// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import React from 'react'




// Component imports
import { actions } from '../../store'
import Link from '../Link'
import Avatar from '../Avatar'
import Component from '../Component'

class ForumThreadCard extends Component {
  /***************************************************************************\
  Private Methods
\***************************************************************************/

  async _handleRemoveButtonClick (event) {
    const {
      name,
    } = event.target

    const {
      confirmingRemove,
    } = this.state

    const {
      deleteForumThread,
      onDelete,
      thread,
    } = this.props

    console.log(event.target)

    if (confirmingRemove && name === 'confirm') {
      this.setState({ confirmingRemove: false, removing: true })

      const { status } = await deleteForumThread(thread.id)

      if (status === 'success') {
        this.setState({ removing: false, removed: true })

        if (typeof onDelete === 'function') {
          onDelete(thread)
        }
      } else {
        this.setState({ removing: false })
      }
    } else if (confirmingRemove && name === 'deny') {
      this.setState({ confirmingRemove: false })
    } else {
      this.setState({ confirmingRemove: true })
    }
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    let { user } = this.props

    if (!user) {
      const { payload, status } = await this.props.getUser(this.props.posterId)

      if (status === 'success') {
        user = { ...payload.data }
      }
    }

    this.setState({ user })
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleRemoveButtonClick',
    ])

    this.state = {
      user: null,
      removing: false,
      removed: false,
    }
  }


  renderDeleteButtons() {
    const {
      confirmingRemove,
      removing,
    } = this.state

    return (
      <React.Fragment>
        {confirmingRemove && (
          <React.Fragment>
            <span>Are you sure?</span>
            <button
              className="danger"
              name="deny"
              onClick={this._handleRemoveButtonClick}>
              No
            </button>
          </React.Fragment>
        )}
        <button
          className={confirmingRemove ? 'success' : 'danger'}
          name="confirm"
          onClick={this._handleRemoveButtonClick}>
          {!removing && !confirmingRemove && 'Delete'}

          {!removing && confirmingRemove && 'Yes'}

          {removing && (
            <span name="confirm"><FontAwesomeIcon icon="spinner" pulse /> Deleting...</span>
          )}
        </button>
      </React.Fragment>
    )
  }

  render() {
    const {
      currentUserIsPoster,
      thread,
    } = this.props

    const {
      user,
      removed,
    } = this.state

    /* eslint-disable camelcase  */
    const {
      title,
      inserted_at,
      comments,
      body,
    } = thread.attributes
    /* eslint-enable camelcase  */


    let commentString = ''

    if (comments > 1) {
      commentString = `${comments} Comments`
    } else if (comments > 0) {
      commentString = '1 Comment'
    } else {
      commentString = 'No comments...'
    }

    const instertedAtMoment = moment.utc(inserted_at)

    return (
      <div className={`card forum-thread ${removed ? 'removed' : ''}`}>
        <div className="content">
          {user && (<Avatar src={user} size="small" />)}
          <div className="thread-contents">
            <h4>{title}</h4>
            <small>by {user ? user.attributes.username : 'Unknown'}</small>
            <p className="thread-body">{body.length > 100 ? `${body.substring(0, 97)}...` : body}</p>
          </div>
          <div className="thread-details">
            <time
              dateTime={instertedAtMoment.toISOString()}
              data-friendlydatetime={instertedAtMoment.format('YYYY-MM-DD HH:mm')}>
              {instertedAtMoment.fromNow()}
            </time>
            <small>{commentString}</small>
          </div>
        </div>
        <footer>
          <menu
            className="compact"
            type="toolbar">
            <div className="primary">
              <Link
                category="Forums"
                action=""
                route="forum thread view"
                params={{ id: thread.id }}>
                <a className="button">
                  View Thread
                </a>
              </Link>
            </div>
            <div className="secondary">
              {currentUserIsPoster && this.renderDeleteButtons()}
            </div>
          </menu>
        </footer>
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  getUser: bindActionCreators(actions.getUser, dispatch),
  deleteForumThread: bindActionCreators(actions.deleteForumThread, dispatch),
})

const mapStateToProps = (state, ownProps) => {
  const {
    thread,
  } = ownProps

  const posterId = thread && thread.relationships && thread.relationships.users && thread.relationships.users.id
  const user = state.users[posterId] || null

  const currentUserId = Cookies.get('userId') || null


  const currentUserIsPoster = posterId && currentUserId && posterId === currentUserId

  return {
    currentUserIsPoster,
    posterId,
    user,
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadCard)

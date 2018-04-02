// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import moment from 'moment'
import PropTypes from 'prop-types'
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
    const { thread } = this.props
    let { user } = this.props

    if (!user && !thread.attributes.deleted) {
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


  renderDeleteButtons () {
    const {
      confirmingRemove,
      removing,
      removed,
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
          disabled={removing || removed}
          onClick={this._handleRemoveButtonClick}>
          {!removing && !confirmingRemove && (removed ? 'Deleted' : 'Delete')}

          {!removing && confirmingRemove && 'Yes'}

          {removing && (
            <span name="confirm"><FontAwesomeIcon icon="spinner" pulse /> Deleting...</span>
          )}
        </button>
      </React.Fragment>
    )
  }

  render () {
    const {
      currentUserIsPoster,
      thread,
      fullThread,
    } = this.props

    const {
      user,
      removed,
    } = this.state

    const {
      comments,
    } = thread.attributes


    let commentString = ''

    if (comments > 1) {
      commentString = `${comments} Comments`
    } else if (comments > 0) {
      commentString = '1 Comment'
    } else {
      commentString = 'No comments...'
    }

    const instertedAtMoment = moment.utc(thread.attributes.inserted_at)
    const title = !removed ? thread.attributes.title : '[deleted]'
    const body = !removed ? thread.attributes.body : '[deleted]'

    return (
      <div className={`card forum-thread ${removed || thread.attributes.deleted ? 'removed' : ''}`}>
        <header>
          {(user && !removed) && (<Avatar src={user} size="small" />)}

          <h2 title={title}>
            {fullThread ? (
              title
            ) : (
              <Link
                action="view"
                category="Forums"
                label="Thread"
                route="forum thread view"
                params={{ id: thread.id }}>
                <a>{title}</a>
              </Link>
            )}
          </h2>
        </header>

        <div className="meta">
          <small>
            Posted&nbsp;
            <time
              dateTime={instertedAtMoment.toISOString()}
              data-friendlydatetime={instertedAtMoment.format('YYYY-MM-DD HH:mm')}>
              {instertedAtMoment.fromNow()}
            </time>
          </small>

          <small>{commentString}</small>
        </div>

        <div className="content">
          <p className="thread-body">{!fullThread && body.length > 300 ? `${body.substring(0, 297)}...` : body}</p>
        </div>

        {currentUserIsPoster && (
          <footer>
            <menu
              className="compact"
              type="toolbar">
              <div className="primary" />
              <div className="secondary">
                {this.renderDeleteButtons()}
              </div>
            </menu>
          </footer>
        )}
      </div>
    )
  }
}

ForumThreadCard.defaultProps = {
  currentUserIsPoster: false,
  fullThread: false,
  user: null,
}

ForumThreadCard.propTypes = {
  currentUserIsPoster: PropTypes.bool,
  fullThread: PropTypes.bool,
  posterId: PropTypes.string.isRequired,
  thread: PropTypes.object.isRequired,
  user: PropTypes.object,
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


  const currentUserIsPoster = Boolean(posterId && currentUserId && posterId === currentUserId)

  return {
    currentUserIsPoster,
    posterId,
    user,
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadCard)

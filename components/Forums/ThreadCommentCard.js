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
import Avatar from '../Avatar'
import Component from '../Component'

class ThreadCommentCard extends Component {
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
      deleteThreadComment,
      onDelete,
      comment,
    } = this.props

    if (confirmingRemove && name === 'confirm') {
      this.setState({ confirmingRemove: false, removing: true })

      const { status } = await deleteThreadComment(comment.id)

      if (status === 'success') {
        this.setState({ removing: false, removed: true })

        if (typeof onDelete === 'function') {
          onDelete(comment)
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
          {!removing && !confirmingRemove && (removed ? 'This doesn\'t do anything yet!' : 'Delete')}

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
      comment,
      id,
    } = this.props

    const {
      user,
      removed,
    } = this.state

    /* eslint-disable camelcase  */
    const {
      inserted_at,
    } = comment.attributes
    /* eslint-enable camelcase  */

    const instertedAtMoment = moment.utc(inserted_at)

    return (
      <div id={id} className={`card forum-thread comment ${removed ? 'removed' : ''}`}>
        <header>

          {user ? (
            <span title={user.attributes.username}>
              <Avatar src={user} size="tiny" />
              <span>
                {user.attributes.username}
              </span>
            </span>
          ) : (
            <span title="unknown">Unknown</span>
          )}

          <span className="post-time">
            <time
              dateTime={instertedAtMoment.toISOString()}
              data-friendlydatetime={instertedAtMoment.format('YYYY-MM-DD HH:mm')}>
              {instertedAtMoment.fromNow()}
            </time>
          </span>
        </header>

        <div className="content">
          <div className="thread-contents">
            <p className="thread-body">{comment.attributes.comment}</p>
          </div>
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

ThreadCommentCard.defaultProps = {
  currentUserIsPoster: false,
  id: null,
  user: null,
}

ThreadCommentCard.propTypes = {
  comment: PropTypes.object.isRequired,
  currentUserIsPoster: PropTypes.bool,
  id: PropTypes.string,
  posterId: PropTypes.string.isRequired,
  user: PropTypes.object,
}


const mapDispatchToProps = dispatch => ({
  getUser: bindActionCreators(actions.getUser, dispatch),
  deleteThreadComment: bindActionCreators(actions.deleteThreadComment, dispatch),
})

const mapStateToProps = (state, ownProps) => {
  const {
    comment,
  } = ownProps

  const posterId = comment && comment.relationships && comment.relationships.users && comment.relationships.users.id
  const user = state.users[posterId] || null

  const currentUserId = Cookies.get('userId') || null


  const currentUserIsPoster = Boolean(posterId && currentUserId && posterId === currentUserId)

  return {
    currentUserIsPoster,
    posterId,
    user,
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(ThreadCommentCard)

// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'




// Component imports
import { actions } from '../../store'
import Component from '../Component'

class ThreadCommentForm extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleSubmit (event) {
    const {
      createThreadComment,
      threadId,
    } = this.props

    const {
      comment,
    } = this.state

    event.preventDefault()

    this.setState({
      submitting: true,
    })

    const { payload, status } = await createThreadComment(threadId, comment)

    this.props.onComment(payload)

    return this.setState({
      comment: '',
      error: status !== 'success',
      submitting: false,
    })
  }

  _isValid () {
    const {
      comment,
    } = this.state

    if (!comment) {
      return false
    }

    return true
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods(['_handleSubmit'])

    this.state = {
      comment: '',
      error: false,
      submitting: false,
    }
  }

  render () {
    const {
      comment,
      error,
      submitting,
    } = this.state

    return (
      <form className="thread-comment-form" onSubmit={this._handleSubmit}>
        <fieldset>
          <label htmlFor="group-description">
              Comment
          </label>

          <textarea
            aria-describedby="thread-body"
            disabled={submitting}
            id="thread-body"
            maxLength={8192}
            onChange={({ target }) => this.setState({ comment: target.value })}
            value={comment} />
        </fieldset>

        <menu type="toolbar">
          <div className="secondary" />
          <div className="primary">
            <button
              className={error ? 'danger' : 'success'}
              disabled={submitting || !this._isValid()}>
              {error ? 'Error while submitting' : 'Post'}
            </button>
          </div>
        </menu>
      </form>
    )
  }
}

ThreadCommentForm.propTypes = {
  createThreadComment: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => ({
  createThreadComment: bindActionCreators(actions.createThreadComment, dispatch),
})




export default connect(null, mapDispatchToProps)(ThreadCommentForm)
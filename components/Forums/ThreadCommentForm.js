// Module imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'





// Component imports
import { actions } from '../../store'
import Button from '../Button'
import Component from '../Component'
import EditorHelpDialog from '../EditorHelpDialog'





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

    const response = await createThreadComment(threadId, comment)

    this.props.onComment(response)

    return this.setState({
      comment: '',
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
      displayEditorHelp: false,
      submitting: false,
    }
  }

  render () {
    const {
      comment,
      displayEditorHelp,
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

          <small>
            <Button
              category="Forums"
              className="inline link"
              label="Markdown Help"
              onClick={() => this.setState({ displayEditorHelp: true })}>
              <FontAwesomeIcon fixedWidth icon="pencil-alt" /> Styling with Markdown is supported
            </Button>
          </small>
        </fieldset>

        <menu type="toolbar">
          <div className="secondary" />
          <div className="primary">
            <button
              className="success"
              disabled={submitting || !this._isValid()}>
              Post
            </button>
          </div>
        </menu>

        {displayEditorHelp && (
          <EditorHelpDialog
            data-t="thread-comment-form:editor-help"
            onClose={() => this.setState({ displayEditorHelp: false })} />
        )}
      </form>
    )
  }
}





ThreadCommentForm.propTypes = {
  createThreadComment: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  createThreadComment: actions.createThreadComment,
}, dispatch)





export default connect(null, mapDispatchToProps)(ThreadCommentForm)

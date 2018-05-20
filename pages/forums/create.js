// Module imports
import React from 'react'





// Component imports
import { Router } from '../../routes'
import Component from '../../components/Component'
import EditorHelpDialog from '../../components/EditorHelpDialog'
import Main from '../../components/Main'
import MarkdownHelpButton from '../../components/MarkdownHelpButton'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import ValidatedInput from '../../components/ValidatedInput'





class CreateThread extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _handleSubmit (event) {
    const { createForumThread } = this.props
    const {
      title,
      body,
    } = this.state

    event.preventDefault()

    this.setState({
      submitting: true,
    })

    const { payload, status } = await createForumThread({
      title,
      body,
    })

    if (status === 'success') {
      const {
        id,
      } = payload.data

      return Router.pushRoute('forum thread view', { id })
    }

    return this.setState({ submitting: false })
  }

  _isValid () {
    const {
      title,
      body,
    } = this.state

    if (!title || !body) {
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
      body: '',
      displayEditorHelp: false,
      submitting: false,
      title: '',
    }
  }

  render () {
    const {
      body,
      displayEditorHelp,
      submitting,
      title,
    } = this.state

    return (
      <React.Fragment>
        <PageHeader>
          <h1>Create a Thread</h1>
        </PageHeader>

        <Main title={title}>
          <form onSubmit={this._handleSubmit}>
            <fieldset>
              <label htmlFor="group-name">
                Thread Title
              </label>

              <ValidatedInput
                disabled={submitting}
                id="thread-title"
                onChange={({ target }) => this.setState({ title: target.value })}
                maxLength={256}
                required
                type="text"
                value={title} />
            </fieldset>

            <fieldset>
              <label htmlFor="group-description">
                Message
              </label>

              <textarea
                aria-describedby="thread-body"
                disabled={submitting}
                id="thread-body"
                maxLength={8192}
                onChange={({ target }) => this.setState({ body: target.value })}
                value={body} />

              <small>
                <MarkdownHelpButton
                  category="Forums"
                  onClick={() => this.setState({ displayEditorHelp: true })} />
              </small>
            </fieldset>

            <menu type="toolbar">
              <div className="primary">
                <button
                  className="success"
                  disabled={submitting || !this._isValid()}>
                  Post
                </button>
              </div>
            </menu>
          </form>
        </Main>

        {displayEditorHelp && (
          <EditorHelpDialog
            data-t="create-thread-form:editor-help"
            onClose={() => this.setState({ displayEditorHelp: false })} />
        )}
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['createForumThread']





export default Page(CreateThread, { mapDispatchToProps }, true)

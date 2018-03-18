// Module imports
import React from 'react'





// Component imports
import { Router } from '../../routes'
import Component from '../../components/Component'
import Page from '../../components/Page'
import ValidatedInput from '../../components/ValidatedInput'





// Component constants
const pageTitle = 'Create a Thread'





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
      title: '',
      body: '',
      submitting: false,
    }
  }

  render () {
    const {
      title,
      body,
      submitting,
    } = this.state

    return (
      <React.Fragment>
        <header>
          <h1>Create a Thread</h1>
        </header>

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
      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['createForumThread']





export default Page(CreateThread, pageTitle, { mapDispatchToProps }, true)

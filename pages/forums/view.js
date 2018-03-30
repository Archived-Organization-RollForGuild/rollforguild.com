// Module imports
import React from 'react'





// Component imports
import { actions } from '../../store'
import { Router } from '../../routes'
import Component from '../../components/Component'
import ForumThreadCard from '../../components/Forums/ForumThreadCard'
import Page from '../../components/Page'
import Pagination from '../../components/Pagination'
import ThreadCommentCard from '../../components/Forums/ThreadCommentCard'
import ThreadCommentForm from '../../components/Forums/ThreadCommentForm'





// Component constants
const pageTitle = 'Public Forums'





class ViewThread extends Component {
  /***************************************************************************\
    Private  Methods
  \***************************************************************************/

  _handleNewComment ({ payload, status }) {
    if (status === 'success') {
      const newComment = payload.data

      this.setState({
        comments: [...this.state.comments, newComment],
      })
    }
  }

  async _getComments (page, oldPage) {
    let newState = { ...this.state }
    const { getThreadComments, query } = this.props

    if (page !== oldPage) {
      const { payload, status } = await getThreadComments(query.id, page)

      if (status === 'success') {
        newState = {
          comments: payload.data || [],
          totalCommentPages: Math.ceil(payload.meta.total / payload.meta.limit),
        }
      } else {
        newState.comments = []
      }
    }

    return newState
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      getForumThread,
      thread,
      query,
    } = this.props

    if (!thread) {
      await getForumThread(query.id)
    }

    const newState = await this._getComments(query.page, null)

    this.setState({
      ...newState,
      loaded: true,
    })
  }
  async componentWillReceiveProps (newProps) {
    const newState = await this._getComments(newProps.page, this.props.page)
    this.setState(newState)
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleNewComment',
      '_getComments',
    ])

    const { thread } = props
    this.state = {
      comments: [],
      loaded: !!thread,
      totalCommentPages: 0,
    }
  }

  static async getInitialProps ({ query, store }) {
    await actions.getForumThread(query.id)(store.dispatch)
    return {}
  }

  render () {
    const {
      comments,
      loaded,
      totalCommentPages,
    } = this.state

    const {
      thread,
      page,
    } = this.props

    if (!loaded) {
      return (
        <React.Fragment>
          <header>
            <h1>Public Forums</h1>
          </header>

          <span>Loading...</span>

        </React.Fragment>
      )
    }


    if (loaded && !thread) {
      return (
        <React.Fragment>
          <header>
            <h1>Public Forums</h1>
          </header>

          <span>Thread not found!</span>

        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <header>
          <h1>Public Forums</h1>
        </header>

        <div className="thread">
          <ForumThreadCard thread={thread} fullThread />
        </div>

        <Pagination
          category="Forums"
          currentPage={page}
          label="view"
          onPageChange={(newPage) => Router.pushRoute('forum thread view', { id: thread.id, page: newPage > 1 ? newPage : null })}
          showPageLinks
          totalPageCount={totalCommentPages} />

        {(Array.isArray(comments) && comments.length > 0) ? (
          <div className="comments">
            {comments.map(comment => (
              <ThreadCommentCard
                key={comment.id}
                id={comment.id}
                comment={comment}
                />
              ))}
          </div>
        ) : (
          <span>There are no Comments yet!</span>
        )}

        <div className="comment-form">
          <ThreadCommentForm threadId={thread.id} onComment={this._handleNewComment} />
        </div>

      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getForumThread', 'getThreadComments']

const mapStateToProps = (state, ownProps) => {
  let page = ownProps.query.page || 1

  if (typeof page !== 'number') {
    page = Number.parseInt(ownProps.query.page, 10)
  }

  if (page < 1) {
    page = 1
  }

  return {
    page,
    thread: state.forums.threads[ownProps.query.id] || null,
  }
}





export default Page(ViewThread, pageTitle, { mapDispatchToProps, mapStateToProps }, true)

// Module imports
import React from 'react'





// Component imports
import { actions } from '../../store'
import { Router } from '../../routes'
import Component from '../../components/Component'
import ForumThreadCard from '../../components/Forums/ForumThreadCard'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import PageTitle from '../../components/PageTitle'
import Pagination from '../../components/Pagination'
import ThreadCommentCard from '../../components/Forums/ThreadCommentCard'
import ThreadCommentForm from '../../components/Forums/ThreadCommentForm'





// Component constants
const title = 'Public Forums'





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

    this.setState({
      ...newState,
      loaded: true,
    })
  }

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  componentDidMount () {
    const {
      getForumThread,
      query,
      thread,
    } = this.props

    if (!thread) {
      getForumThread(query.id)
    }

    this._getComments(this.state.page, null)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this._getComments(this.state.page, prevState.page)
    }
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
      page: 0,
      totalCommentPages: 0,
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.page !== prevState.page) {
      return { page: nextProps.page }
    }
    return null
  }

  static async getInitialProps ({ query, store }) {
    await actions.getForumThread(query.id)(store.dispatch)
  }

  render () {
    const {
      loggedIn,
      page,
      thread,
    } = this.props

    const {
      comments,
      loaded,
      totalCommentPages,
    } = this.state

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <Main title={title}>
          {!loaded && (
            <p>Loading...</p>
          )}

          <ul className="card-list">
            {Boolean(loaded && !thread) && (
              <li>Thread not found!</li>
            )}

            {Boolean(loaded && thread) && (
              <li>
                <ForumThreadCard thread={thread} fullThread />
              </li>
            )}

            {Boolean(!comments || !comments.length) && (
              <span>There are no Comments yet!</span>
            )}

            {Boolean(comments && comments.length) && comments.map(comment => (
              <li key={comment.id}>
                <ThreadCommentCard
                  id={comment.id}
                  comment={comment} />
              </li>
            ))}
          </ul>

          <Pagination
            category="Forums"
            currentPage={page}
            label="view"
            onPageChange={(newPage) => Router.pushRoute('forum thread view', { id: thread.id, page: newPage > 1 ? newPage : null })}
            showPageLinks
            totalPageCount={totalCommentPages} />

          {Boolean(loggedIn) && (
            <div className="comment-form">
              <ThreadCommentForm threadId={thread.id} onComment={this._handleNewComment} />
            </div>
          )}
        </Main>
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
    loggedIn: state.authentication.loggedIn,
  }
}





export default Page(ViewThread, {
  mapDispatchToProps,
  mapStateToProps,
})

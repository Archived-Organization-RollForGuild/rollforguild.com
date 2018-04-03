// Module imports
import React from 'react'





// Component imports
import { Router } from '../../routes'
import Component from '../../components/Component'
import ForumThreadCard from '../../components/Forums/ForumThreadCard'
import Link from '../../components/Link'
import Main from '../../components/Main'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Pagination from '../../components/Pagination'





// Component constants
const title = 'Public Forums'





class ForumList extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  async _getThreads (page, oldPage) {
    let newState = { ...this.state }
    const { getForumThreads } = this.props

    if (page !== oldPage) {
      this.setState({ loaded: false })

      const { payload, status } = await getForumThreads(page)

      if (status === 'success') {
        newState = ({
          ...newState,
          ...payload.meta,
          loaded: true,
          threads: payload.data || [],
          totalPages: Math.ceil(payload.meta.total / payload.meta.limit),
        })
      } else {
        newState.threads = []
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
      page,
    } = this.props

    this._getThreads(page, null)
  }

  componentWillReceiveProps (newProps) {
    this._getThreads(newProps.page, this.props.page)
  }

  constructor (props) {
    super(props)

    this._bindMethods([
      '_getThreads',
    ])

    this.state = {
      count: 0,
      limit: 0,
      loaded: false,
      offset: 0,
      threads: [],
      total: 0,
      totalPages: 0,
    }
  }

  render () {
    const {
      loggedIn,
      page,
    } = this.props

    const {
      count,
      limit,
      loaded,
      offset,
      threads,
      total,
      totalPages,
    } = this.state

    return (
      <React.Fragment>
        <PageHeader>
          <h1>{title}</h1>

          {loaded && (
            <aside>
              <menu type="toolbar">
                {Boolean(loggedIn) && (
                  <Link
                    action="create"
                    category="Forums"
                    label="Thread"
                    route="forum thread create">
                    <a
                      className="button success" >
                      New Thread
                    </a>
                  </Link>
                )}
              </menu>
            </aside>
          )}
        </PageHeader>

        <Main title={title}>
          {!loaded && (
            <p>Loading...</p>
          )}

          {(loaded && !threads.length) && (
            <span>There is nothing here. (yet!!)</span>
          )}

          {(loaded && threads.length) && (
            <React.Fragment>
              <span className="list-stats">Displaying threads {offset + 1} - {Math.min(count + offset, limit + offset)} of {total} threads</span>

              <ol className="card-list">
                {threads.map(thread => (
                  <ForumThreadCard thread={thread} key={thread.id} />
                ))}
              </ol>
            </React.Fragment>
          )}

          {loaded && (
            <Pagination
              category="Forums"
              currentPage={page}
              label="list"
              onPageChange={(newPage) => Router.pushRoute('forum list', { page: newPage > 1 ? newPage : null })}
              showPageLinks
              totalPageCount={totalPages} />
          )}
        </Main>
      </React.Fragment>
    )
  }
}

ForumList.defaultProps = {
  page: 1,
}



const mapDispatchToProps = ['getForumThreads']
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
    loggedIn: state.authentication.loggedIn,
  }
}





export default Page(ForumList, title, { mapDispatchToProps, mapStateToProps })

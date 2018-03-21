// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import ForumThreadCard from '../../components/Forums/ForumThreadCard'
import Page from '../../components/Page'
import Link from '../../components/Link'





// Component constants
const pageTitle = 'Public Forums'





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

  componentWillReceiveProps(newProps) {
    this._getThreads(newProps.page, this.props.page)
  }

  constructor(props) {
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

  render() {
    if (!this.state.loaded) {
      return (
        <React.Fragment>
          <header>
            <h1>Public Forums</h1>
          </header>

          <span>Loading...</span>

        </React.Fragment>
      )
    }

    const {
      count,
      limit,
      offset,
      threads,
      total,
      totalPages,
    } = this.state

    const { page } = this.props

    return (
      <React.Fragment>
        <header>
          <h1>Public Forums</h1>

          <menu type="toolbar">
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
          </menu>
        </header>


        {!threads.length && (
          <span>There is nothing here. (yet!!)</span>
        )}

        {!!threads.length && (
          <div className="thread-list">
            <span className="list-stats">Displaying threads {offset + 1} - {Math.min(count + offset, limit + offset)} of {total} threads</span>
            {threads.map(thread => (
              <ForumThreadCard thread={thread} key={thread.id} />
            ))}
          </div>
        )}

        <menu type="toolbar">
          <div className="primary">
            {(page > 1) && (
              <Link
                action="prev-page"
                category="Forums"
                label="List"
                route="forum list"
                params={{ page: page > 2 ? page - 1 : null }}>
                <a className="button success">
                  Previous Page
                </a>
              </Link>
            )}
          </div>
          <div className="secondary">
            {(page < (totalPages)) && (
              <Link
                action="next-page"
                category="Forums"
                label="List"
                route="forum list"
                params={{ page: page + 1 }}>
                <a className="button success">
                  Next Page
                </a>
              </Link>
            )}
          </div>

        </menu>
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

  return { page }
}





export default Page(ForumList, pageTitle, { mapDispatchToProps, mapStateToProps }, true)

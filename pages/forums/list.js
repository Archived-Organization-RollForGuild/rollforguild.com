// Module imports
import React from 'react'





// Component imports
import Component from '../../components/Component'
import ForumThreadCard from '../../components/Forums/ForumThreadCard'
import Page from '../../components/Page'





// Component constants
const pageTitle = 'Public Forums'





class ForumList extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/



  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      getForumThreads,
      page,
    } = this.props

    if (page && typeof page !== 'number') {
      this.setState({ loaded: true })
      return
    }

    const { payload, status } = await getForumThreads(page)

    if (status === 'success') {
      this.setState({
        ...payload.meta,
        loaded: true,
        threads: payload.data,
        totalPages: Math.ceil(payload.meta.count / payload.meta.limit),
      })
    } else {
      this.setState({
        loaded: true,
      })
    }
  }

  async componentWillReceiveProps(newProps) {
    const {
      getForumThreads,
      page,
    } = this.props

    if (newProps.page && typeof newProps.page === 'number' && newProps.page !== page) {
      this.setState({ loaded: false })

      const { payload, status } = await getForumThreads(newProps.page)

      if (status === 'success') {
        this.setState({
          ...payload.meta,
          loaded: true,
          threads: payload.data,
          totalPages: Math.ceil(payload.meta.count / payload.meta.limit),
        })
      }
    }
  }

  constructor(props) {
    super(props)

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
    const {
      count,
      limit,
      loaded,
      offset,
      threads,
      total,
      totalPages,
    } = this.state


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


    if (loaded && !threads.length) {
      return (
        <React.Fragment>
          <header>
            <h1>Public Forums</h1>
          </header>

          <span>There is nothing here. (yet!!)</span>

        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <header>
          <h1>Public Forums</h1>
        </header>

        <div className="thread-list">
          <span className="">Displaying threads {offset + 1}-{Math.min(count + offset, limit + offset)} of {total} threads, {totalPages} pages exist</span>
          {threads.map(thread => (
            <ForumThreadCard thread={thread} key={thread.id} />
          ))}
        </div>

      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getForumThreads']





export default Page(ForumList, pageTitle, { mapDispatchToProps }, true)

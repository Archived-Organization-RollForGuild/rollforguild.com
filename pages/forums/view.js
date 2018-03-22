// Module imports
import React from 'react'





// Component imports
import { actions } from '../../store'
import Component from '../../components/Component'
import ForumThreadCard from '../../components/Forums/ForumThreadCard'
import Page from '../../components/Page'





// Component constants
const pageTitle = 'Public Forums'





class ViewThread extends Component {
  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    const {
      getForumThread,
      query,
    } = this.props

    let {
      thread,
    } = this.props

    if (!thread) {
      const { payload, status } = await getForumThread(query.id)

      if (status === 'success' && payload.data) {
        thread = payload.data
      }
    }

    this.setState({
      loaded: true,
      thread,
    })
  }

  constructor (props) {
    super(props)

    const { thread } = props
    this.state = {
      loaded: !!thread,
      thread,
    }
  }

  static async getInitialProps ({ query, store }) {
    await actions.getForumThread(query.id)(store.dispatch)
    return {}
  }

  render () {
    const {
      loaded,
      thread,
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
          <ForumThreadCard thread={thread} fullBody />
        </div>


      </React.Fragment>
    )
  }
}





const mapDispatchToProps = ['getForumThread']

const mapStateToProps = (state, ownProps) => ({ thread: state.threads[ownProps.query.id] || null })





export default Page(ViewThread, pageTitle, { mapDispatchToProps, mapStateToProps }, true)

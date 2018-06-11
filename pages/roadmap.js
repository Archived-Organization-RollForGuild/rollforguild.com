// Module imports
// import Chart from 'echarts-for-react'
import CountUp from 'react-countup'
import moment from 'moment'
import React from 'react'
import 'isomorphic-fetch'





// Component imports
import Component from '../components/Component'
import PageHeader from '../components/PageHeader'
import PageTitle from '../components/PageTitle'





// Component constants
const title = 'Roadmap'





class Roadmap extends Component {
  /***************************************************************************\
    Properties
  \***************************************************************************/

  state = {
    data: null,
    loading: false,
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  static _sortMilestones (a, b) {
    const momentA = moment(a.due_on)
    const momentB = moment(b.due_on)

    if (!momentA.isValid() || momentA.isAfter(momentB, 'day')) {
      return 1
    }

    if (!momentB.isValid() || momentA.isBefore(momentB, 'day')) {
      return -1
    }

    return 0
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  async componentDidMount () {
    this.setState({ loading: true })

    let response = await fetch('https://api.github.com/repos/RollForGuild/rollforguild.com/milestones?client_id=21088d01bb910659c4d4&client_secret=ac169bfdb23ff8bfe0b1d581aec1119408241fcb')
    response = await response.json()
    response.sort(Roadmap._sortMilestones)

    this.setState({
      data: response,
      loading: false,
    })
  }

  render () {
    const {
      data,
      loading,
    } = this.state

    return (
      <React.Fragment>
        <PageTitle>{title}</PageTitle>

        <PageHeader>
          <h1>{title}</h1>
        </PageHeader>

        <p>Entering the tavern, an unusually alluring odor draws you to the bar. Before you can question the barkeep about the scent, you notice there's something... off. He's missing some limbs. And mugs. And now that you mention it, there's no bar, just a bunch of stools and most of a barkeep. Everything just seems... unfinished.</p>

        <p>That's because this is our pre-alpha, meaning literally everything is still in flux. We wanted to launch early so we could get as much feedback as possible! Take a peek at what we have in store, and help hold us accountable on social media for all of our feature launch dates!</p>

        {loading && (
          <div>Loading...</div>
        )}

        {(!loading && data) && (
          <ol>
            {data.map(datum => {
              const percentComplete = Math.round((datum.closed_issues / (datum.open_issues + datum.closed_issues)) * 100 || 0)
              const dueDateIsValid = moment(datum.due_on).isValid()

              return (
                <li id={datum.id} key={datum.id}>
                  <header>
                    <h2>{datum.title}</h2>

                    <h3>
                      <sup>Launch Date</sup>
                      {dueDateIsValid && (
                        <time
                          dateTime={datum.due_on}
                          title={moment(datum.due_on).format('DD MMMM, YYYY')}>
                          {moment(datum.due_on).format('DD MMMM')}
                          {moment().isAfter(datum.due_on) && (
                            <span>(late)</span>
                          )}
                        </time>
                      )}

                      {!dueDateIsValid && (
                        <abbr title="To be determined">TBD</abbr>
                      )}
                    </h3>
                  </header>

                  <div className="progress-container">
                    <progress
                      max={datum.open_issues + datum.closed_issues}
                      value={datum.closed_issues || 0} />

                    <div
                      className="completion-percentage"
                      style={{ left: `${percentComplete}%` }}>
                      <CountUp
                        end={percentComplete}
                        start={0}
                        suffix="%" />
                    </div>
                  </div>

                  <p>{datum.description}</p>
                </li>
              )
            })}
          </ol>
        )}
      </React.Fragment>
    )
  }
}





export default Roadmap

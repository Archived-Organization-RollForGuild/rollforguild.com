// Module Imports
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'





// Component Imports
import { actions } from '../../store'
import { formatGameString } from '../../helpers'
// import Button from '../Button'
import Component from '../Component'
import Markdown from '../Markdown'




class GroupEventCard extends Component {
  async componentDidMount () {
    /*const {
      event,
      getGroupEventGames,
      groupId,
    } = this.props

    const { payload, status } = await getGroupEventGames(groupId, event.id)

    let game = null

    if (status === 'success' && payload.data.length) {
      [game] = payload.data
    }

    this.setState({
      game,
      gameLoaded: true,
    })*/

    this.setState({
      gameLoaded: true,
    })
  }

  constructor (props) {
    super(props)


    this.state = {
      game: null,
      gameLoaded: false,
    }
  }


  render () {
    const {
      game,
      gameLoaded,
    } = this.state

    const {
      event,
    } = this.props

    const {
      title,
      description,
      location,
    } = event.attributes

    return (
      <li
        className="card"
        key={event.id}>
        <header className="space-content">
          <h2>{title}</h2>
          {this.formattedEventTime}
        </header>

        <div className="meta">
          {Boolean(gameLoaded && game) && (
          <small>
            Playing&nbsp;
            {formatGameString(game)}
          </small>
          )}

          <small>
            {location}
          </small>
        </div>

        <div className="content">
          {Boolean(description) && (
            <Markdown input={description} />
          )}

          {!description && (
            <em>No description available</em>
          )}
        </div>

        {/* left for future development coming shortly */}
        <footer>
          <menu
            className="compact"
            type="toolbar" />
        </footer>
      </li>
    )
  }

  get formattedEventTime () {
    const {
      start_time: startTime,
      end_time: endTime,
    } = this.props.event.attributes

    const startMoment = moment.utc(startTime).local()
    const endMoment = moment.utc(endTime).local()


    const startTimeString = startMoment.format('DD MMM YYYY HH:mm')
    const endTimeString = endMoment.format(`${endMoment.isSame(startMoment, 'day') ? '' : 'DD MMM YYYY '}HH:mm`)

    return (<h4>{startTimeString} - {endTimeString}</h4>)
  }
}

GroupEventCard.propTypes = {
  event: PropTypes.object.isRequired,
  // groupId: PropTypes.string.isRequired,
}



const mapDispatchToProps = dispatch => bindActionCreators({
  getGroupEventGames: actions.getGroupEventGames,
}, dispatch)


export default connect(null, mapDispatchToProps)(GroupEventCard)

// Module imports
import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import PropTypes from 'prop-types'



// Component Imports
import Component from './Component'


class DateTimePicker extends Component {
  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  _handleChange (type, value) {
    const {
      value: date,
      onDateChange,
    } = this.props

    let newDate = date

    switch (type) {
      case 'date':
        if (value) {
          newDate = value
        }
        break

      case 'time':
        if (value.split(':').length > 1) {
          let [hour, minute] = value.split(':')

          hour = Math.max(Math.min(hour, 23), 0)
          minute = Math.max(Math.min(minute, 59), 0)
          newDate.setHours(hour, minute)
        }
        break

      default:
        break
    }

    if (typeof onDateChange === 'function') {
      onDateChange(newDate)
    }
  }





  /***************************************************************************\
    Private Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleChange',
    ])
  }

  render () {
    const {
      value: date,
    } = this.props

    let hours = date.getHours()
    hours = hours < 10 ? `0${hours}` : hours

    let minutes = date.getMinutes()
    minutes = minutes < 10 ? `0${minutes}` : minutes

    const timeString = `${hours}:${minutes}`

    return (
      <div
        {...this.renderProps}
        className="time-date-picker"
        data-t="date-time-picker:wrapper">
        <DayPickerInput
          data-t="date-time-picker:day-input"
          dayPickerProps={{
            todayButton: 'Today',
          }}
          onDayChange={newDate => this._handleChange('date', newDate)}
          placeholder="Date"
          value={date} />
        <input
          className="time-picker"
          data-t="date-time-picker:time-input"
          type="time"
          onChange={({ target: { value } }) => this._handleChange('time', value)}
          value={timeString} />
      </div>
    )
  }





  get renderProps () {
    const newProps = { ...this.props }

    delete newProps.onDateChange
    delete newProps.value

    return newProps
  }
}

DateTimePicker.defaultProps = {
  onDateChange: null,
}

DateTimePicker.propTypes = {
  onDateChange: PropTypes.func,
  value: PropTypes.instanceOf(Date).isRequired,
}





export default DateTimePicker

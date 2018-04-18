// Module imports
import React from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import PropTypes from 'prop-types'




const DateTimePicker = ({ onChange, value: date }) => {
  const handleChange = (type, value) => {
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

    if (typeof onChange === 'function') {
      onChange(newDate)
    }
  }

  let hours = date.getHours()
  hours = hours < 10 ? `0${hours}` : hours

  let minutes = date.getMinutes()
  minutes = minutes < 10 ? `0${minutes}` : minutes

  const timeString = `${hours}:${minutes}`

  return (
    <div
      className="time-date-picker"
      data-t="date-time-picker:wrapper">
      <DayPickerInput
        data-t="date-time-picker:day-input"
        dayPickerProps={{
          todayButton: 'Today',
        }}
        onDayChange={newDate => handleChange('date', newDate)}
        placeholder="Date"
        value={date} />
      <input
        className="time-picker"
        data-t="date-time-picker:time-input"
        type="time"
        onChange={({ target: { value } }) => handleChange('time', value)}
        value={timeString} />
    </div>
  )
}

DateTimePicker.defaultProps = {
  onChange: null,
}

DateTimePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date).isRequired,
}





export default DateTimePicker

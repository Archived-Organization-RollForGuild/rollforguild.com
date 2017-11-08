// Module imports
import React from 'react'





export default class Index extends React.Component {
  render () {
    let {
      onChange,
      options,
      name,
    } = this.props

    return (
      <select
        onChange={onChange}
        name={name}>
        {options.map((option, index) => {
          return (
            <option
              key={index}
              value={option}>
              {option}
            </option>
          )
        })}
      </select>
    )
  }
}

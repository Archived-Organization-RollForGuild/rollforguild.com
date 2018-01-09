// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../Chooser/Chooser'





const BackgroundPropChooser = (props) => {
  const {
    options,
    onChange,
    title,
    value,
  } = props
  const safeTitle = title.toLowerCase().replace(/\s/g, '-')

  return (
    <React.Fragment>
      <header>
        <h4>{title}</h4>
      </header>

      <Chooser
        className="list"
        options={options}
        renderButton={false}
        renderOption={(option, index, active) => {
          const id = `${safeTitle}-${index}`

          return (
            <React.Fragment>
              <input
                checked={active}
                hidden
                id={id}
                name={safeTitle}
                onChange={onChange}
                type="radio"
                value={option} />

              <label htmlFor={id}>
                {option}
              </label>
            </React.Fragment>
          )
        }}
        value={value} />
    </React.Fragment>
  )
}

BackgroundPropChooser.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
}





export default BackgroundPropChooser

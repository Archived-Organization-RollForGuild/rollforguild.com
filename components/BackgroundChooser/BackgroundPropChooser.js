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

  return (
    <React.Fragment>
      <header>
        <h4>{title}</h4>
      </header>

      <Chooser
        className="list"
        onChange={onChange}
        options={options}
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

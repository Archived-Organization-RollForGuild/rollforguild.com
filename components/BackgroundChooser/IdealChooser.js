// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../Chooser/Chooser'





const IdealChooser = (props) => {
  const {
    character,
    ideals,
    onChange,
  } = props

  return (
    <React.Fragment>
      <header>
        <h4>Ideals</h4>
      </header>

      <Chooser
        className="list"
        onChange={onChange}
        options={ideals}
        value={character.ideal} />
    </React.Fragment>
  )
}

IdealChooser.propTypes = {
  character: PropTypes.object.isRequired,
  ideals: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}





export default IdealChooser

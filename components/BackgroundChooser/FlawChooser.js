// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../Chooser/Chooser'





const FlawChooser = (props) => {
  const {
    character,
    flaws,
    onChange,
  } = props

  return (
    <React.Fragment>
      <header>
        <h4>Flaws</h4>
      </header>

      <Chooser
        className="list"
        onChange={onChange}
        options={flaws}
        value={character.flaw} />
    </React.Fragment>
  )
}

FlawChooser.propTypes = {
  character: PropTypes.object.isRequired,
  flaws: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}





export default FlawChooser

// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../Chooser/Chooser'





const BondChooser = (props) => {
  const {
    character,
    bonds,
    onChange,
  } = props

  return (
    <React.Fragment>
      <header>
        <h4>Bonds</h4>
      </header>

      <Chooser
        className="list"
        onChange={onChange}
        options={bonds}
        value={character.bond} />
    </React.Fragment>
  )
}

BondChooser.propTypes = {
  character: PropTypes.object.isRequired,
  bonds: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}





export default BondChooser

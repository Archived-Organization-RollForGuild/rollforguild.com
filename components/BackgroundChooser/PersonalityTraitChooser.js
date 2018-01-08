// Module imports
import PropTypes from 'prop-types'
import React from 'react'





// Module imports
import Chooser from '../Chooser/Chooser'





const PersonalityTraitChooser = (props) => {
  const {
    character,
    personalityTraits,
    onChange,
  } = props

  return (
    <React.Fragment>
      <header>
        <h4>Personality Traits</h4>
      </header>

      <Chooser
        className="list"
        onChange={onChange}
        options={personalityTraits}
        value={character['personality-trait']} />
    </React.Fragment>
  )
}

PersonalityTraitChooser.propTypes = {
  character: PropTypes.object.isRequired,
  personalityTraits: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}





export default PersonalityTraitChooser

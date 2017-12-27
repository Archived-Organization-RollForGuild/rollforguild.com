// Module imports
import { connect } from 'react-redux'
import React from 'react'





// Module imports
import Chooser from '../components/Chooser'





const RaceChooser = (props) => {
  const { ruleset } = props

  return (
    <React.Fragment>
      <Chooser
        onChange={props.onRaceChange}
        options={ruleset['player-characters'].races}
        renderOption={option => option.name}
        value={props.race} />

      {(props.race && props.race.subraces.length) ? (
        <Chooser
          onChange={props.onSubraceChange}
          options={props.race.subraces}
          renderOption={option => option.name}
          value={props.subrace} />
      ) : null}
    </React.Fragment>
  )
}





const mapStateToProps = state => ({ ruleset: state.rulesets['dnd-5e'] })





export default connect(mapStateToProps)(RaceChooser)

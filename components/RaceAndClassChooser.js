// Module imports
import React from 'react'





// Module imports
import Chooser from '../components/Chooser/Chooser'





const RaceChooser = (props) => {
  const {
    character,
    ruleset,
  } = props
  const {
    classes,
    races,
  } = ruleset['player-characters']
  const subraces = (character.race && races[character.race].subraces) ? races[character.race].subraces : null

  return (
    <React.Fragment>
      <header>
        <h2>Select Your Race</h2>
      </header>

      <Chooser
        onChange={props.onRaceChange}
        options={Object.keys(races).map(item => ({
          ...races[item],
          value: item,
        }))}
        renderOption={option => option.name}
        returnValue={option => option.value}
        value={character.race} />

      {subraces && (
        <React.Fragment>
          <header>
            <h2>Select Your Subrace</h2>
          </header>

          <Chooser
            onChange={props.onSubraceChange}
            options={Object.keys(subraces).map(item => ({
              ...subraces[item],
              value: item,
            }))}
            renderOption={option => option.name}
            returnValue={option => option.value}
            value={character.subrace} />
        </React.Fragment>
      )}

      <header>
        <h2>Select Your Class</h2>
      </header>

      <Chooser
        onChange={props.onClassChange}
        options={Object.keys(classes).map(item => ({
          ...classes[item],
          value: item,
        }))}
        renderOption={option => option.name}
        returnValue={option => option.value}
        value={character.class} />
    </React.Fragment>
  )
}





export default RaceChooser

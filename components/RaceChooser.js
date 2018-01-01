// Module imports
import React from 'react'





// Module imports
import Chooser from '../components/Chooser'





const RaceChooser = (props) => {
  const {
    character,
    ruleset,
  } = props
  const { races } = ruleset['player-characters']
  const subraces = (character.race && races[character.race].subraces) ? races[character.race].subraces : null

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}





export default RaceChooser

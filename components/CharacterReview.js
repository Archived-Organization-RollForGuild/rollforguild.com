// Module imports
import React from 'react'





// Component imports
import AbilityScore from './AbilityScore'





const CharacterReview = (props) => {
  const {
    character,
    ruleset,
  } = props
  const { description } = ruleset['player-characters']
  const abilityScores = ruleset['player-characters']['ability-scores']

  return (
    <div className="character-review">
      <header>
        <h2>{character.description.name}</h2>
        <h3>Lvl {character.level} {character.subrace ? character.subrace : character.race} {character.class}</h3>
      </header>

      <div className="description">
        {Object.keys(description).map(property => {
          const { name } = description[property]
          const value = character.description[property]

          return (
            <div
              className="input-group"
              key={property}>
              <label htmlFor={property}>{name}</label>

              <span>{value}</span>
            </div>
          )
        })}
      </div>

      <div className="ability-scores">
        {Object.keys(abilityScores).map(ability => (
          <AbilityScore
            ability={ability}
            breakdown="none"
            character={character}
            key={ability}
            ruleset={ruleset} />
        ))}
      </div>
    </div>
  )
}





export default CharacterReview

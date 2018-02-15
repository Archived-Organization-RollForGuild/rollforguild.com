// Module imports
// import 'isomorphic-fetch'
import LocalForage from 'localforage'
import uuid from 'uuid/v4'




// Component imports
import actionTypes from '../actionTypes'





// Temporary conversion function to convert old character objects into JSONAPI compliant data objects.
// Remove once characters are on API.
function convertCharObjToJSONAPIObj(character) {
  return {
    id: character.id,
    type: 'characters',
    attributes: {
      ...character.description,
      abilityScores: character['ability-scores'],
      className: character.class,
      race: character.race,
      skills: character.skills,
      subrace: character.subrace,
    },
  }
}





export const createCharacter = character => async dispatch => {
  dispatch({ type: actionTypes.CREATE_CHARACTER })

  let id = null

  try {
    // const response = await fetch('/api/characters', {
    //   body: JSON.stringify(character),
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'post',
    // })
    // const payload = await response.json()
    id = uuid()

    let compliantChar = character

    // Old character object to JSONAPI compliant object migration.
    if (!compliantChar.id || !compliantChar.type || !compliantChar.attributes) {
      compliantChar = convertCharObjToJSONAPIObj({ ...character, id })
    }

    const characters = await LocalForage.getItem('characters')
    Promise.all([
      await LocalForage.setItem('characters', (characters || []).concat(compliantChar)),
      await LocalForage.removeItem('characterInProgress'),
    ])

    dispatch({
      payload: {
        data: compliantChar,
      },
      status: 'success',
      type: actionTypes.CREATE_CHARACTER,
    })
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.CREATE_CHARACTER,
    })
  }

  return id
}





export const getCharacter = characterId => async dispatch => {
  dispatch({ type: actionTypes.GET_CHARACTER })

  try {
    // const response = await fetch(`/api/characters/${characterId}`)
    // const payload = await response.json()

    let characters = await LocalForage.getItem('characters')

    // Old character object to JSONAPI compliant object migration.
    if (characters.length && (!characters[0].type || !characters.attributes)) {
      characters = characters.map(convertCharObjToJSONAPIObj)
      await LocalForage.setItem('characters', characters)
    }

    dispatch({
      payload: {
        data: characters.find(character => character.id === characterId),
      },
      status: 'success',
      type: actionTypes.GET_CHARACTER,
    })
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.GET_CHARACTER,
    })
  }
}





export const getCharactersForUser = () => async dispatch => {
  dispatch({ type: actionTypes.GET_CHARACTERS })

  try {
    // const response = await fetch('/api/characters')
    // const payload = await response.json()
    let characters = await LocalForage.getItem('characters') || []

    // Old character object to JSONAPI compliant object migration.
    if (characters.length && (!characters[0].type || !characters.attributes)) {
      characters = characters.map(convertCharObjToJSONAPIObj)
      await LocalForage.setItem('characters', characters)
    }

    dispatch({
      payload: { data: characters },
      status: 'success',
      type: actionTypes.GET_CHARACTERS,
    })
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.GET_CHARACTERS,
    })
  }
}

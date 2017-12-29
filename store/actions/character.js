// Module imports
// import fetch from 'isomorphic-fetch'
import LocalForage from 'localforage'
import uuid from 'uuid/v4'





// Component imports
import actionTypes from '../actionTypes'





export const createCharacter = character => async dispatch => {
  dispatch({ type: actionTypes.CREATE_CHARACTER })

  try {
    // const response = await fetch('/api/characters', {
    //   body: JSON.stringify(character),
    //   headers: { 'Content-Type': 'application/json' },
    //   method: 'post',
    // })
    // const payload = await response.json()
    const id = uuid()

    const characters = await LocalForage.getItem('characters')
    Promise.all([
      await LocalForage.setItem('characters', (characters || []).concat({ ...character, id })),
      await LocalForage.removeItem('characterInProgress'),
    ])

    dispatch({
      payload: {
        data: { ...character, id },
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
}





export const getCharacter = characterId => async dispatch => {
  dispatch({ type: actionTypes.GET_CHARACTER })

  try {
    // const response = await fetch(`/api/characters/${characterId}`)
    // const payload = await response.json()

    const characters = await LocalForage.getItem('characters')

    dispatch({
      payload: {
        data: characters.find(character => character.description.name === decodeURIComponent(characterId)),
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

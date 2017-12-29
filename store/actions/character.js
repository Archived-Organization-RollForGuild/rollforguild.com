// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const createCharacter = character => async dispatch => {
  dispatch({ type: actionTypes.CREATE_CHARACTER })

  try {
    const response = await fetch('/api/characters', {
      body: JSON.stringify(character),
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
    })
    const payload = await response.json()

    dispatch({
      payload,
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
    const response = await fetch(`/api/characters/${characterId}`)
    const payload = await response.json()

    dispatch({
      payload,
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

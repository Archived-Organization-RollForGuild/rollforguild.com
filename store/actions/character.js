// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





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

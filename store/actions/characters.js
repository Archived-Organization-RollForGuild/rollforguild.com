// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getCharactersForUser = () => async dispatch => {
  dispatch({ type: actionTypes.GET_CHARACTERS })

  try {
    const response = await fetch('/api/characters')
    const payload = await response.json()

    dispatch({
      payload,
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

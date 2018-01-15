// Module imports
// import 'isomorphic-fetch'
import LocalForage from 'localforage'





// Component imports
import actionTypes from '../actionTypes'





export const getCharactersForUser = () => async dispatch => {
  dispatch({ type: actionTypes.GET_CHARACTERS })

  try {
    // const response = await fetch('/api/characters')
    // const payload = await response.json()
    const characters = await LocalForage.getItem('characters') || []

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

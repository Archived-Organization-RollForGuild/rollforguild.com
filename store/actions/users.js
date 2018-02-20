// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getUser = userId => async dispatch => {
  dispatch({ type: actionTypes.GET_USER })

  try {
    const token = await Cookies.get('accessToken')

    let response = await fetch(`/api/users/${userId}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'get',
    })

    response = await response.json()

    if (response.errors) {
      const errorMessage = response.errors[0] ? response.errors[0].detail : 'Unknown'
      throw new Error(`API Error Occured. "${errorMessage}"`)
    }


    /*******************************************************\
    |* REMOVE THESE ONCE THEY ARE IMPLEMENTED INTO THE API *|
    \*******************************************************/

    response.data.attributes.playedGames = [
      'D&D 5e',
      'Battlestar Galactica: The Board Game',
      'Zork',
    ]

    response.data.attributes.wantToPlayGames = [
      'Kingdom Death: Monsters',
      'Something completely different',
    ]

    return dispatch({
      status: 'success',
      type: actionTypes.GET_USER,
      payload: response,
    })
  } catch (error) {
    return dispatch({
      error,
      status: 'error',
      type: actionTypes.GET_USER,
    })
  }
}


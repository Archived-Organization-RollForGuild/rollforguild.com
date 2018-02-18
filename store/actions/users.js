// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getUser = userId => async dispatch => {
  dispatch({ type: actionTypes.GET_USER })

  try {
    const token = await Cookies.get('accessToken')

    if (!token) {
      throw new Error('token not found.')
    }

    let response = await fetch(`/api/users/${userId}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'get',
    })

    response = await response.json()

    return dispatch({
      status: 'success',
      type: actionTypes.GET_USER,
      payload: response,
    })
  } catch (error) {
    return dispatch({
      status: 'error',
      type: actionTypes.GET_USER,
    })
  }
}


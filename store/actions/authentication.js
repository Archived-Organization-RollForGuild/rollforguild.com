// Module imports
import 'isomorphic-fetch'
import Cookies from 'js-cookie'





// Component imports
import actionTypes from '../actionTypes'





export const confirmAccount = token => async dispatch => {
  let response = null
  let success = false

  dispatch({ type: actionTypes.CONFIRM_ACCOUNT })

  try {
    response = await fetch(`/api/confirmation/${token}`, { method: 'post' })

    success = response.ok
  } catch (error) {
    success = false
  }

  if (success) {
    response = await response.json()

    Cookies.set('accessToken', response.data.attributes.token, { expires: 365 })
    Cookies.set('userId', response.data.attributes.user_id, { expires: 365 })
  }

  dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.CONFIRM_ACCOUNT,
  })
}





export const login = (email, password) => async dispatch => {
  let response = null
  let success = false

  dispatch({ type: actionTypes.LOGIN })

  try {
    const token = Cookies.get('accessToken')

    if (!token) {
      response = await fetch('/api/login', {
        body: JSON.stringify({
          data: {
            type: 'auth',
            attributes: {
              email,
              password,
            },
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      })

      success = response.ok
    }
  } catch (error) {
    success = false
  }

  if (success) {
    response = await response.json()

    Cookies.set('accessToken', response.data.attributes.token, { expires: 365 })
    Cookies.set('userId', response.data.attributes.user_id, { expires: 365 })
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.LOGIN,
  })
}





export const logout = () => async dispatch => {
  Cookies.remove('accessToken')
  Cookies.remove('userId')

  dispatch({ type: actionTypes.LOGOUT })
}





export const register = (username, email, password) => async dispatch => {
  let response = null
  let success = false

  dispatch({ type: actionTypes.REGISTER })

  try {
    response = await fetch('/api/register', {
      body: JSON.stringify({
        data: {
          type: 'user',
          attributes: {
            email,
            password,
            username,
          },
        },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })

    success = response.ok
  } catch (error) {
    success = false
  }

  return dispatch({
    status: success ? 'success' : 'error',
    type: actionTypes.REGISTER,
  })
}





export const resetAuthenticationState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_AUTHENTICATION_STATE })
}

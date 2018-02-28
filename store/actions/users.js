// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getUser = userId => async dispatch => {
  dispatch({ type: actionTypes.GET_USER })

  let response = null
  let success = false

  try {
    const token = await Cookies.get('accessToken')

    response = await fetch(`/api/users/${userId}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'get',
    })

    if (!response.ok) {
      response = await response.json()
      throw new Error('Api returned error.')
    }

    response = await response.json()

    /*******************************************************\
    |* REMOVE THESE ONCE THEY ARE IMPLEMENTED INTO THE API *|
    \*******************************************************/

    response.data.attributes.gamesHistory = [
      'D&D 5e',
      'Battlestar Galactica: The Board Game',
      'Zork',
    ]

    response.data.attributes.gamesInterest = [
      'Kingdom Death: Monsters',
      'Something completely different',
    ]

    success = true
  } catch (err) {
    // Do nothing
  }

  return dispatch({
    payload: response,
    status: success ? 'success' : 'error',
    type: actionTypes.GET_USER,
  })
}

/* eslint-disable camelcase */
export const updateUserPassword = (userId, attributes) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_USER })

  let response = null
  let success = false

  try {
    const token = await Cookies.get('accessToken')

    response = await fetch(`/api/users/${userId}/password`, {
      body: JSON.stringify({
        data: {
          type: 'users',
          attributes,
        },
      }),
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
      method: 'put',
    })

    if (!response.ok) {
      response = await response.json()
      throw new Error('Api returned error.')
    }

    response = await response.json()
    success = true
  } catch (error) {
    // Do nothing.
  }

  return dispatch({
    payload: response,
    status: success ? 'success' : 'error',
    type: actionTypes.UPDATE_USER,
  })
}
/* eslint-enable camelcase */

export const updateUserAvatar = (userId, file) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_USER_AVATAR })

  let response = null
  let success = false

  try {
    const body = new FormData()
    const token = await Cookies.get('accessToken')

    body.append('file', file)

    response = await fetch(`/api/users/${userId}/avatar`, {
      body,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'post',
    })

    if (!response.ok) {
      response = await response.json()
      throw new Error('Api returned error.')
    }

    response = await response.json()
    success = true
  } catch (error) {
    // Do nothing.
  }

  return dispatch({
    payload: response,
    status: success ? 'success' : 'error',
    type: actionTypes.UPDATE_USER_AVATAR,
  })
}

export const updateUser = (userId, changedAttributes) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_USER })

  const payload = { ...changedAttributes }
  let response = null
  let success = false

  try {
    const token = await Cookies.get('accessToken')

    /* Disabled until gameLists are Ready API-side.

    if (changedAttributes.gamesHistory) {
      response = await fetch(`/api/users/${userId}/relationships/games-history`, {
        body: JSON.stringify({
          data: [...changedAttributes.gamesHistory],
        }),
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        method: 'patch',
      })

      if (!response.ok) {
        response = await response.json()
        throw new Error('Api returned error.')
      }

      delete payload.gamesHistory
    }

    if (changedAttributes.gamesInterest) {
      response = await fetch(`/api/users/${userId}/relationships/games-interest`, {
        body: JSON.stringify({
          data: [...changedAttributes.gamesInterest],
        }),
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        method: 'patch',
      })

      if (!response.ok) {
        response = await response.json()
        throw new Error('Api returned error.')
      }

      delete payload.gamesInterest
    }

    */

    if (Object.keys(payload).length) {
      response = await fetch(`/api/users/${userId}`, {
        body: JSON.stringify({
          data: {
            type: 'users',
            attributes: {
              ...payload,
            },
          },
        }),
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }),
        method: 'put',
      })

      if (!response.ok) {
        response = await response.json()
        throw new Error('Api returned error.')
      }
    } else {
      response = await fetch(`/api/users/${userId}`, {
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
        method: 'get',
      })

      if (!response.ok) {
        response = await response.json()
        throw new Error('Api returned error.')
      }
    }

    response = await response.json()
    success = true
  } catch (error) {
    // Do nothing.
  }

  return dispatch({
    payload: response,
    status: success ? 'success' : 'error',
    type: actionTypes.UPDATE_USER,
  })
}

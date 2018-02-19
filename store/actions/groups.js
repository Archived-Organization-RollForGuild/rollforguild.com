// Module imports
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const createGroup = group => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.CREATE_GROUP })

  try {
    response = await fetch('/api/groups', {
      body: JSON.stringify({
        data: {
          type: 'groups',
          attributes: group,
        },
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'post',
    })

    success = response.ok

    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.CREATE_GROUP,
  })
}





export const getGroup = groupId => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.GET_GROUP })

  try {
    response = await fetch(`/api/groups/${groupId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    success = response.ok

    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.GET_GROUP,
  })
}

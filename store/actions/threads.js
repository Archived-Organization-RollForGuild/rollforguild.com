// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const createForumThread = thread => async dispatch => {
  dispatch({ type: actionTypes.CREATE_FORUM_THREAD })

  let response = null
  let success = false

  try {
    const accessToken = Cookies.get('accessToken')

    response = await fetch('/api/threads', {
      body: JSON.stringify({
        data: {
          type: 'threads',
          attributes: thread,
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
    type: actionTypes.CREATE_FORUM_THREAD,
  })
}

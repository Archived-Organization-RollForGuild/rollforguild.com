// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const updateAvatar = (type, id, file) => async dispatch => {
  dispatch({ type: actionTypes.UPDATE_AVATAR })

  let response = null
  let success = false

  try {
    const body = new FormData()
    const token = await Cookies.get('accessToken')

    body.append('file', file)

    response = await fetch(`/api/${type}/${id}/avatar`, {
      body,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'post',
    })

    success = response.ok
  } catch (error) {
    success = false
    response = error
  }

  return dispatch({
    payload: success ? {
      file,
      id,
      type,
    } : response,
    status: success ? 'success' : 'error',
    type: actionTypes.UPDATE_AVATAR,
  })
}

// Component imports
import actionTypes from '../actionTypes'
import { createAlertObject } from '../../helpers'




// Component Constants





export const pushAlert = (...args) => async dispatch => {
  dispatch({ type: actionTypes.CREATE_ALERT })

  let response = null
  let success = false

  try {
    response = createAlertObject(...args)
    success = true
  } catch (error) {
    response = error
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.CREATE_ALERT,
  })
}

export const deleteAlert = id => async dispatch => {
  dispatch({ type: actionTypes.DELETE_ALERT })
  return dispatch({
    payload: typeof id === 'string' ? { id } : id,
    status: 'success',
    type: actionTypes.DELETE_ALERT,
  })
}

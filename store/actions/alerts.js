// Component imports
import { createAction } from '../actionCreators'
import { createAlertObject } from '../../helpers'
import actionTypes from '../actionTypes'




// Component Constants





export const pushAlert = (...args) => createAction({
  actionType: actionTypes.CREATE_ALERT,
  actionFunction: createAlertObject,
  actionPayload: args,
})

export const deleteAlert = id => async dispatch => dispatch({
  payload: typeof id === 'string' ? { id } : id,
  status: 'success',
  type: actionTypes.DELETE_ALERT,
})

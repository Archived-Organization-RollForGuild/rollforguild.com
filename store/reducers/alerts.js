import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.alerts, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_ALERT:
      if (status === 'success' && !state[payload.id]) {
        return {
          ...state,
          [payload.id]: { ...payload },
        }
      }
      break

    case actionTypes.UPDATE_ALERT:
      if (status === 'success') {
        return {
          ...state,
          [payload.id]: { ...payload },
        }
      }
      break

    case actionTypes.DELETE_ALERT:
      if (status === 'success') {
        const newState = { ...state }
        delete newState[payload.id]
        return newState
      }
      break

    default:
      if (status !== 'success'
        && payload
        && typeof payload.type === 'string'
        && payload.type === 'website-alerts'
      ) {
        return {
          ...state,
          [payload.id]: { ...payload },
        }
      }
  }

  return { ...state }
}

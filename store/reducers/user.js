import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.user, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CONFIRM_ACCOUNT:
    case actionTypes.LOGIN:
      if (status === 'success') {
        return {
          ...state,
          id: payload.data.id,
        }
      }

    default:
      return { ...state }
  }
}

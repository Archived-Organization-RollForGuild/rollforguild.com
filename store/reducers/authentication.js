import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.authentication, action) {
  const {
    // payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CONFIRM_ACCOUNT:
    case actionTypes.LOGIN:
      if (status === 'success') {
        return {
          ...state,
          loggedIn: true,
        }
      }

    default:
      return { ...state }
  }
}

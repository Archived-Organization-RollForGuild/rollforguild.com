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
      return {
        ...state,
        loggedIn: typeof status === 'string' && status === 'success',
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
      }

    case actionTypes.RESET_AUTHENTICATION_STATE:
      return { ...initialState.authentication }

    default:
      return { ...state }
  }
}

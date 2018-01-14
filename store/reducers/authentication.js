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
      if (typeof status !== 'undefined') {
        return {
          ...state,
          loggedIn: status,
        }
      }

    case actionTypes.LOGOUT:
      return {
        ...state,
        loggedIn: false,
      }

    case actionTypes.REGISTER:
      if (typeof status !== 'undefined') {
        return {
          ...state,
          registered: status,
        }
      }

    default:
      return { ...state }
  }
}

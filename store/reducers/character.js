import initialState from '../initialState'
import actionTypes from '../actionTypes'





export default function (state = initialState.character, action) {
  const {
    payload,
    status,
    type,
  } = action
  const newState = { ...state }

  switch (type) {
    case actionTypes.GET_CHARACTER:
      switch (status) {
        case 'success':
          newState.character = payload.data
          return newState

        default:
          return newState
      }

    default:
      return newState
  }
}

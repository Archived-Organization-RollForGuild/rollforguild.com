import initialState from '../initialState'
import actionTypes from '../actionTypes'





export default function (state = initialState.characters, action) {
  const {
    payload,
    status,
    type,
  } = action
  const newState = { ...state }

  switch (type) {
    case actionTypes.GET_CHARACTERS:
      switch (status) {
        case 'success':
          newState.characters = payload

          return newState

        default:
          return newState
      }

    default:
      return newState
  }
}

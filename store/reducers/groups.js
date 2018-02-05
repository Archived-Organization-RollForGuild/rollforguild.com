import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.groups, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_GROUP:
    case actionTypes.GET_GROUP:
      if (status === 'success') {
        return {
          ...state,
          [payload.data.id]: payload.data,
        }
      }

    default:
      return { ...state }
  }
}

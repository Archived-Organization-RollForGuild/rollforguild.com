import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.avatars, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.UPDATE_AVATAR:
      if (status === 'success') {
        return {
          ...state,
          [payload.type]: {
            ...state[payload.type],
            [payload.id]: URL.createObjectURL(payload.file),
          },
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}

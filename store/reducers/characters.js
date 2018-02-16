import initialState from '../initialState'
import actionTypes from '../actionTypes'




export default function (state = initialState.characters, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_CHARACTER:
    case actionTypes.GET_CHARACTER:
    case actionTypes.GET_CHARACTERS:
      if (status === 'success') {
        return {
          ...state,
          ...payload.data.reduce((accumulator, character) => ({ ...accumulator, [character.id]: character }), {}),
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}

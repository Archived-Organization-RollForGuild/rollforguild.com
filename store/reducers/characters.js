import initialState from '../initialState'
import actionTypes from '../actionTypes'
import parseJSONAPIResponseForEntityType from '../../helpers/parseJSONAPIResponseForEntityType'




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
          ...parseJSONAPIResponseForEntityType(payload, 'characters', true),
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}

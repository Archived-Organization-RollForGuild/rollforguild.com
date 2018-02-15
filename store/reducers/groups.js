import actionTypes from '../actionTypes'
import initialState from '../initialState'
import parseJSONAPIResponseForEntityType from '../../helpers/parseJSONAPIResponseForEntityType'




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
          ...parseJSONAPIResponseForEntityType(payload, 'groups', true),
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}

import actionTypes from '../actionTypes'
import initialState from '../initialState'
import {
  deepMergeJSONAPIObjectCollections,
  parseJSONAPIResponseForEntityType,
} from '../../helpers'





export default function (state = initialState.groups, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_GROUP:
    case actionTypes.GET_GROUP:
    case actionTypes.GET_USER:
      if (status === 'success') {
        const newGroups = parseJSONAPIResponseForEntityType(payload, 'groups', true)
        return deepMergeJSONAPIObjectCollections(state, newGroups)
      }
      return { ...state }

    default:
      return { ...state }
  }
}

import actionTypes from '../actionTypes'
import initialState from '../initialState'
import {
  deepMergeJSONAPIObjectCollections,
  parseJSONAPIResponseForEntityType,
} from '../../helpers'





export default function (state = initialState.events, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_GROUP_EVENT:
    case actionTypes.GET_GROUP_EVENT:
    case actionTypes.GET_GROUP_EVENTS:
    case actionTypes.UPDATE_GROUP_EVENT:
      if (status === 'success') {
        const newGroups = parseJSONAPIResponseForEntityType(payload, 'events', true)
        return deepMergeJSONAPIObjectCollections(state, newGroups)
      }
      return { ...state }

    default:
      return { ...state }
  }
}

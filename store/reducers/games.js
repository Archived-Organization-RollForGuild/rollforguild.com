import actionTypes from '../actionTypes'
import initialState from '../initialState'
import {
  deepMergeJSONAPIObjectCollections,
  parseJSONAPIResponseForEntityType,
} from '../../helpers'





export default function (state = initialState.games, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.GET_GAMES:
    case actionTypes.GET_GROUP_EVENT_GAMES:
      if (status === 'success') {
        const newGroups = parseJSONAPIResponseForEntityType(payload, 'games', true)
        return deepMergeJSONAPIObjectCollections(state, newGroups)
      }
      return { ...state }

    default:
      return { ...state }
  }
}

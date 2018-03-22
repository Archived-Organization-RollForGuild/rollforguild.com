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
    case actionTypes.CREATE_FORUM_THREAD:
    case actionTypes.GET_FORUM_THREAD:
    case actionTypes.GET_FORUM_THREADS:
      if (status === 'success') {
        const newThreads = parseJSONAPIResponseForEntityType(payload, 'threads', true)
        return deepMergeJSONAPIObjectCollections(state, newThreads)
      }
      return { ...state }

    default:
      return { ...state }
  }
}

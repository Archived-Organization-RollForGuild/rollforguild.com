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
    case actionTypes.DELETE_FORUM_THREAD:
    case actionTypes.GET_FORUM_THREAD:
    case actionTypes.GET_FORUM_THREADS:
      if (status === 'success') {
        const newThreads = parseJSONAPIResponseForEntityType(payload, 'threads', true)
        return {
          ...state,
          threads: deepMergeJSONAPIObjectCollections(state.threads, newThreads),
        }
      }
      break

    case actionTypes.CREATE_THREAD_COMMENT:
    case actionTypes.DELETE_THREAD_COMMENT:
    case actionTypes.GET_THREAD_COMMENTS:
      if (status === 'success') {
        let newComments = parseJSONAPIResponseForEntityType(payload, 'thread-comments')
        newComments = newComments.reduce((accumulator, comment) => {
          const threadId = comment.relationships.threads.id

          return {
            ...accumulator,
            [threadId]: {
              ...accumulator[threadId],
              [comment.id]: { ...comment },
            },
          }
        }, {})


        return {
          ...state,
          comments: deepMergeJSONAPIObjectCollections(state.comments, newComments),
        }
      }
      break

    default:
      break
  }

  return { ...state }
}

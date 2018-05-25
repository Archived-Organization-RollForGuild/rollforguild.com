// Module imports
import Cookies from 'js-cookie'





// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'
import deepMergeJSONAPIObjectCollections from '../../helpers/deepMergeJSONAPIObjectCollections'
import parseJSONAPIResponseForEntityType from '../../helpers/parseJSONAPIResponseForEntityType'




export default function (state = initialState.users, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.CREATE_FORUM_THREAD:
    case actionTypes.GET_FORUM_THREAD:
    case actionTypes.GET_FORUM_THREADS:
    case actionTypes.GET_THREAD_COMMENTS:
    case actionTypes.GET_GROUP:
    case actionTypes.GET_USER:
    case actionTypes.GET_USERS:
    case actionTypes.UPDATE_USER:
      if (status === 'success') {
        const newUsers = parseJSONAPIResponseForEntityType(payload, 'users', true)
        const newState = deepMergeJSONAPIObjectCollections(state, newUsers)

        const currentUserId = Cookies.get('userId')
        if (newState[currentUserId]) {
          newState[currentUserId].loggedIn = true
        }

        return newState
      }
      return { ...state }

    case actionTypes.LOGOUT:
      if (status === 'success') {
        const { userId } = payload
        const newState = { ...state }

        if (newState[userId]) {
          newState[userId].loggedIn = false
        }

        return newState
      }
      return { ...state }


    default:
      return { ...state }
  }
}

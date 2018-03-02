// Module imports
import Cookies from 'js-cookie'





// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'
import parseJSONAPIResponseForEntityType from '../../helpers/parseJSONAPIResponseForEntityType'
import deepMergeJSONAPIObjectCollections from '../../helpers/deepMergeJSONAPIObjectCollections'




export default function (state = initialState.users, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.GET_GROUP:
    case actionTypes.GET_USER:
    case actionTypes.GET_USERS:
    case actionTypes.UPDATE_USER:
      if (status === 'success') {
        const newUsers = parseJSONAPIResponseForEntityType(payload, 'users')
        const newState = deepMergeJSONAPIObjectCollections(state, newUsers)

        const currentUserId = Cookies.get('userId')
        if (newState[currentUserId]) {
          newState[currentUserId].loggedIn = true
        }

        return newState
      }
      return { ...state }

    default:
      return { ...state }
  }
}

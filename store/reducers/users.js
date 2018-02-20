// Module imports
import Cookies from 'js-cookie'





// Component imports
import actionTypes from '../actionTypes'
import initialState from '../initialState'
import parseJSONAPIResponseForEntityType from '../../helpers/parseJSONAPIResponseForEntityType'




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
      if (status === 'success') {
        const userId = Cookies.get('userId')
        const newState = {
          ...state,
          ...parseJSONAPIResponseForEntityType(payload, 'users', true),
        }

        if (newState[userId]) {
          newState[userId].loggedIn = true
        }

        return newState
      }
      return { ...state }

    default:
      return { ...state }
  }
}

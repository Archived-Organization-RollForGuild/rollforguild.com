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
        return {
          ...state,
          ...parseJSONAPIResponseForEntityType(payload, 'users', true),
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}

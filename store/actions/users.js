// Module imports
import 'isomorphic-fetch'





// Component imports
import { actionSeries, createApiAction } from '../actionCreators'
import actionTypes from '../actionTypes'





export const getUser = userId => createApiAction({
  actionType: actionTypes.GET_USER,
  url: `/api/users/${userId}`,
  onError: 'Failed to retrieve user.\nPlease try again in a few moments.',
})





export const updateUserPassword = (userId, attributes) => createApiAction({
  actionType: actionTypes.UPDATE_USER_PASSWORD,
  url: `/api/users/${userId}/password`,
  method: 'put',
  data: {
    data: {
      type: 'users',
      attributes,
    },
  },
  onError: 'Failed to update password.\nMake sure the current password is correct!',
})





export const updateUserGamesList = (userId, gamesHistory) => createApiAction({
  actionType: actionTypes.UPDATE_USER_GAMES_HISTORY,
  url: `/api/users/${userId}/relationships/games-history`,
  method: 'patch',
  data: {
    data: gamesHistory,
  },
  onError: 'Failed to update game lists.\nPlease try again in a few moments.',
})




export const updateUserProfile = (userId, attributes) => createApiAction({
  actionType: actionTypes.UPDATE_USER,
  url: `/api/users/${userId}`,
  method: 'put',
  data: {
    data: {
      type: 'users',
      attributes,
    },
  },
  onError: 'Failed to update user.\nPlease try again in a few moments.',
})




export const newUpdateUser = (userId, _attributes) => {
  const actions = []

  const {
    currentPassword,
    gamesList,
    password,
    ...attributes
  } = _attributes

  if (gamesList) {
    actions.push(updateUserGamesList(userId, gamesList))
  }

  if (currentPassword && password) {
    actions.push(updateUserPassword(userId, {
      current_password: currentPassword,
      password,
    }))
  }

  if (Object.keys(attributes).length) {
    actions.push(updateUserProfile(userId, attributes))
  } else {
    actions.push(getUser(userId))
  }

  return actionSeries(actions, false, true)
}

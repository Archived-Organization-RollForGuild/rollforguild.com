// Component Imports
import actionTypes from '../actionTypes'
import { createApiAction } from '../actionCreators'





export const getGames = query => createApiAction({
  actionType: actionTypes.GET_GAMES,
  url: '/api/games',
  params: {
    query,
    limit: 5,
  },
  onError: 'Failed to get game list.\nPlease try again in a few moments.',
})





export const suggestGame = attributes => createApiAction({
  actionType: actionTypes.SUGGEST_GAME,
  url: '/api/games',
  method: 'post',
  data: {
    data: {
      type: 'games',
      attributes,
    },
  },
  onError: 'Game suggestion submission failed.\nPlease try again in a few moments.',
})

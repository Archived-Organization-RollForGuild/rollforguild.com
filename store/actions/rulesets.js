// Module imports
import 'isomorphic-fetch'





// Component imports
import { createApiAction } from '../actionCreators'
import actionTypes from '../actionTypes'





export const getRuleset = ruleset => createApiAction({
  actionType: actionTypes.GET_RULESET,
  url: `/local-api/rulesets/${ruleset}`,
})


export const getRulesets = () => createApiAction({
  actionType: actionTypes.GET_RULESETS,
  url: '/local-api/rulesets',
})

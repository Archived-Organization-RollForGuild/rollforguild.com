import initialState from '../initialState'
import actionTypes from '../actionTypes'





import findAndEvaluateModifiers from '../../helpers/findAndEvaluateModifiers'





export default function (state = initialState.rulesets, action) {
  const {
    payload,
    status,
    type,
  } = action
  const newState = { ...state }

  switch (type) {
    case actionTypes.GET_RULESET:
      switch (status) {
        case 'success':
          findAndEvaluateModifiers(payload.data)
          return {
            ...newState,
            ...payload.data,
          }

        default:
          return newState
      }

    case actionTypes.GET_RULESETS:
      switch (status) {
        case 'success':
          for (const ruleset of payload.data) {
            newState[ruleset] = null
          }

          return newState

        default:
          return newState
      }

    default:
      return newState
  }
}

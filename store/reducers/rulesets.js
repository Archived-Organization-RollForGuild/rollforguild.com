import initialState from '../initialState'
import actionTypes from '../actionTypes'





import { findAndEvaluateModifiers } from '../../helpers'





export default function (state = initialState.rulesets, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.GET_RULESET:
      if (status === 'success') {
        findAndEvaluateModifiers(payload.data)
        return {
          ...state,
          ...payload.data,
        }
      }
      return { ...state }

    case actionTypes.GET_RULESETS:
      if (status === 'success') {
        const rulesets = payload.data.reduce((accumulator, ruleset) => ({ ...accumulator, [ruleset]: null }), {})

        return {
          ...state,
          ...rulesets,
        }
      }
      return { ...state }

    default:
      return { ...state }
  }
}

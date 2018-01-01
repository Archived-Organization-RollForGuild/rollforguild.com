// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const getRuleset = ruleset => async dispatch => {
  dispatch({ type: actionTypes.GET_RULESET })

  try {
    const response = await fetch(`/api/rulesets/${ruleset}`)
    const payload = await response.json()

    dispatch({
      payload,
      status: 'success',
      type: actionTypes.GET_RULESET,
    })
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.GET_RULESET,
    })
  }
}





export const getRulesets = () => async dispatch => {
  dispatch({ type: actionTypes.GET_RULESETS })

  try {
    const response = await fetch('/api/rulesets')
    const payload = await response.json()

    dispatch({
      payload,
      status: 'success',
      type: actionTypes.GET_RULESETS,
    })
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.GET_RULESETS,
    })
  }
}

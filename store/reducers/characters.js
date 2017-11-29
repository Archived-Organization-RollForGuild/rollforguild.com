import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.characters, action) {
  switch (action.type) {
    default:
      return { ...state }
  }
}

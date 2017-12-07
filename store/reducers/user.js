import initialState from '../initialState'





export default function (state = initialState.user, action) {
  switch (action.type) {
    default:
      return { ...state }
  }
}

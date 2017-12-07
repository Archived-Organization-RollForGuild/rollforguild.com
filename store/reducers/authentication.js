import initialState from '../initialState'





export default function (state = initialState.authentication, action) {
  switch (action.type) {
    default:
      return { ...state }
  }
}

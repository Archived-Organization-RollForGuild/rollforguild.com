// import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.user, action) {
  const {
    // payload,
    // status,
    type,
  } = action

  switch (type) {
    // case actionTypes.GET_USER:
    //   if (status === 'success') {
    //     return {
    //       ...state,
    //       ...payload.data,
    //     }
    //   }

    //   return { ...state }
    default:
      return { ...state }
  }
}

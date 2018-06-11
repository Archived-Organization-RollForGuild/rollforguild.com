import actionTypes from '../actionTypes'
import initialState from '../initialState'





export default function (state = initialState.rescues, action) {
  const {
    payload,
    status,
    type,
  } = action

  switch (type) {
    case actionTypes.GET_WORDPRESS_PAGE:
    case actionTypes.GET_WORDPRESS_PAGES:
      if (status === 'success') {
        return {
          ...state,
          page: {
            ...state.page,
            ...payload.reduce((accumulator, page) => ({
              ...accumulator,
              [page.slug]: page,
            }), {}),
          },
        }
      }
      return { ...state }


    default:
      return { ...state }
  }
}

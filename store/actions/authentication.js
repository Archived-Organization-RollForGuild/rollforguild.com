// Module imports
import fetch from 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'





export const login = (email, password) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN })

  try {
    let token = localStorage.getItem('access_token')

    if (!token) {
      const data = JSON.stringify({
        grant_type: 'password',
        password,
        username: email,
      })

      let response = await fetch('/token', {
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
      })

      response = await response.json()

      token = response.access_token
      localStorage.setItem('access_token', token)
    }

    dispatch({
      status: 'success',
      type: actionTypes.LOGIN,
    })

    /* eslint-disable no-restricted-globals */
    if (location && location.search) {
      const searchParams = {}

      location.search.replace(/^\?/, '').split('&').forEach(searchParam => {
        const [key, value] = searchParam.split('=')

        searchParams[key] = value
      })

      /* eslint-disable no-global-assign */
      location = searchParams.destination ? searchParams.destination : '/profile'
      /* eslint-enable  no-global-assign */
    }
    /* eslint-enable */
  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.LOGIN,
    })
  }
}

// Module imports
import fetch from 'isomorphic-fetch'
import Router from 'next/router'





// Component imports
import actionTypes from '../actionTypes'





export const login = (email, password) => async dispatch => {
  dispatch({ type: actionTypes.LOGIN })

  try {
    let token = localStorage.getItem('access_token')

    if (!token) {
      let data = JSON.stringify({
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

    if (location && location.search) {
      let searchParams = {}

      location.search.replace(/^\?/, '').split('&').forEach(searchParam => {
        let [ key, value ] = searchParam.split('=')

        searchParams[key] = value
      })

      location = searchParams['destination'] ? searchParams['destination'] : '/profile'
    }

  } catch (error) {
    dispatch({
      status: 'error',
      type: actionTypes.LOGIN,
    })

    console.log(error)
  }
}

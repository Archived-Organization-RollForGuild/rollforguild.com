// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'
import LocalForage from 'localforage'
import Router from 'next/router'





// Component imports
import actionTypes from '../actionTypes'




const dev = preval`module.exports = process.env.NODE_ENV !== 'production'`





export const getUser = userId => async dispatch => {
  dispatch({ type: actionTypes.GET_USER })

  try {
    const token = await Cookies.get('accessToken')

    if (!token) {
      throw new Error('token not found.')
    }

    let response = await fetch(`/api/users/${userId}`, {
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      method: 'get',
    })

    response = await response.json()

    return dispatch({
      status: 'success',
      type: actionTypes.GET_USER,
      payload: response,
    })
  } catch (error) {
    return dispatch({
      status: 'error',
      type: actionTypes.GET_USER,
    })
  }
}


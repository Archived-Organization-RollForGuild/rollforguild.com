// Module imp
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import actionTypes from '../actionTypes'



export const getForumThreads = page => async dispatch => {
  dispatch({ type: actionTypes.GET_FORUM_THREADS })

  let response = null
  let success = false

  try {
    const accessToken = Cookies.get('accessToken')

    response = await fetch(`/api/threads${page ? `?page=${page}` : ''}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    success = response.ok
    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.GET_FORUM_THREADS,
  })
}

export const getForumThread = id => async dispatch => {
  dispatch({ type: actionTypes.GET_FORUM_THREAD })

  let response = null
  let success = false

  try {
    const accessToken = Cookies.get('accessToken')

    response = await fetch(`/api/threads/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    success = response.ok
    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.GET_FORUM_THREAD,
  })
}

export const createForumThread = thread => async dispatch => {
  dispatch({ type: actionTypes.CREATE_FORUM_THREAD })

  let response = null
  let success = false

  try {
    const accessToken = Cookies.get('accessToken')

    response = await fetch('/api/threads', {
      body: JSON.stringify({
        data: {
          type: 'threads',
          attributes: thread,
        },
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'post',
    })

    success = response.ok
    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.CREATE_FORUM_THREAD,
  })
}

export const deleteForumThread = () => async dispatch => {
  dispatch({ type: actionTypes.DELETE_FORUM_THREAD })

  let response = null
  let success = false

  try {
    // const accessToken = Cookies.get('accessToken')

    // response = await fetch('/api/threads', {
    //   body: JSON.stringify({
    //     data: {
    //       type: 'threads',
    //       attributes: thread,
    //     },
    //   }),
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'post',
    // })

    // success = response.ok
    // response = await response.json()

    // Placeholder timer to immitate the server doing something.
    await new Promise(resolve => setTimeout(() => resolve(null), 750))
    success = true
  } catch (error) {
    success = false
    response = error
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.DELETE_FORUM_THREAD,
  })
}

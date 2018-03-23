// Component imports
import actionTypes from '../actionTypes'
import apiService from '../../services/api'



export const getForumThreads = page => async dispatch => {
  dispatch({ type: actionTypes.GET_FORUM_THREADS })

  let response = null
  let success = false

  try {
    response = await apiService.get(`/api/threads${page ? `?page=${page}` : ''}`)
    response = response.data


    success = true
  } catch (error) {
    success = false
    response = error.data
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
    response = await apiService.get(`/api/threads/${id}`)
    response = response.data

    success = true
  } catch (error) {
    success = false
    response = error.data
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
    response = await apiService.post('/api/threads', {
      data: {
        type: 'threads',
        attributes: thread,
      },
    })
    response = response.data

    success = true
  } catch (error) {
    success = false
    response = error.data
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

// Module imports
import Cookies from 'js-cookie'
import 'isomorphic-fetch'





// Component imports
import { convertObjectToQueryParams } from '../../helpers'
import actionTypes from '../actionTypes'





export const createGroup = group => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.CREATE_GROUP })

  try {
    response = await fetch('/api/groups', {
      body: JSON.stringify({
        data: {
          type: 'groups',
          attributes: group,
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
    type: actionTypes.CREATE_GROUP,
  })
}





export const getGroup = groupId => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.GET_GROUP })

  try {
    response = await fetch(`/api/groups/${groupId}`, {
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
    type: actionTypes.GET_GROUP,
  })
}





export const getJoinRequests = groupId => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.GET_JOIN_REQUESTS })

  try {
    response = await fetch(`/api/groups/${groupId}/join-requests`, {
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
    type: actionTypes.GET_JOIN_REQUESTS,
  })
}





export const handleJoinRequest = (groupId, userId, status) => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.HANDLE_JOIN_REQUESTS })

  try {
    response = await fetch(`/api/groups/${groupId}/join-requests/${userId}`, {
      body: JSON.stringify({
        data: {
          type: 'join-requests',
          attributes: { status },
        },
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'put',
    })

    success = response.ok

    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.HANDLE_JOIN_REQUESTS,
  })
}





export const leaveGroup = groupId => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  const userId = Cookies.get('userId')
  let response = null
  let success = false

  dispatch({ type: actionTypes.LEAVE_GROUP })

  try {
    response = await fetch(`/api/groups/${groupId}/members/${userId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'delete',
    })

    success = response.ok

    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.LEAVE_GROUP,
  })
}





export const requestToJoinGroup = groupId => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.SEARCH_FOR_GROUPS })

  try {
    response = await fetch(`/api/groups/${groupId}/join-requests`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'post',
    })

    success = response.ok

    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    status: success ? 'success' : 'error',
    type: actionTypes.SEARCH_FOR_GROUPS,
  })
}





export const searchForGroups = ({ lat, lng }, { distance, itemsPerPage, page }) => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  const queryParams = {
    lat,
    lng,
    limit: itemsPerPage || 5,
    meters: (distance || 5) * 1609.34, // Convert distance to meters
    page: page || 1,
  }

  dispatch({ type: actionTypes.SEARCH_FOR_GROUPS })

  try {
    response = await fetch(`/api/groups/${convertObjectToQueryParams(queryParams)}`, {
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
    type: actionTypes.SEARCH_FOR_GROUPS,
  })
}





export const updateGroup = (groupId, updates) => async dispatch => {
  const accessToken = Cookies.get('accessToken')
  let response = null
  let success = false

  dispatch({ type: actionTypes.UPDATE_GROUP })

  try {
    response = await fetch(`/api/groups/${groupId}`, {
      body: JSON.stringify({
        data: {
          type: 'groups',
          attributes: updates,
        },
      }),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      method: 'put',
    })

    success = response.ok

    response = await response.json()
  } catch (error) {
    success = false
  }

  return dispatch({
    payload: response || null,
    status: success ? 'success' : 'error',
    type: actionTypes.UPDATE_GROUP,
  })
}

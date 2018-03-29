// Module imports
import 'isomorphic-fetch'
import Cookies from 'js-cookie'





// Component imports
import { createApiAction } from '../actionCreators'
import actionTypes from '../actionTypes'




export const confirmAccount = token => createApiAction({
  actionType: actionTypes.CONFIRM_ACCOUNT,
  url: `/api/confirmation/${token}`,
  method: 'post',
  onSuccess: ({ data }) => {
    Cookies.set('accessToken', data.data.attributes.token, { expires: 365 })
    Cookies.set('userId', data.data.attributes.user_id, { expires: 365 })
  },
})





export const confirmEmailUpdate = (confirmationToken, accept = true) => createApiAction({
  actionType: actionTypes.CONFIRM_EMAIL_UPDATE,
  url: `/api/email/${confirmationToken}`,
  method: 'put',
  params: {
    response: accept ? 'accept' : 'reject',
  },
})





export const login = (email, password) => createApiAction({
  actionType: actionTypes.LOGIN,
  url: '/api/login',
  method: 'post',
  data: {
    data: {
      type: 'auth',
      attributes: {
        email,
        password,
      },
    },
  },
  onSuccess: ({ data }) => {
    Cookies.set('accessToken', data.data.attributes.token, { expires: 365 })
    Cookies.set('userId', data.data.attributes.user_id, { expires: 365 })
  },
  onError: () => {
    Cookies.remove('accessToken')
    Cookies.remove('userId')
  },
})





export const logout = () => async dispatch => {
  Cookies.remove('accessToken')
  Cookies.remove('userId')
  dispatch({ type: actionTypes.LOGOUT })
}





export const register = (username, email, password) => createApiAction({
  actionType: actionTypes.REGISTER,
  url: '/api/register',
  method: 'post',
  data: {
    data: {
      type: 'users',
      attributes: {
        email,
        password,
        username,
      },
    },
  },
})





export const requestPasswordReset = email => createApiAction({
  actionType: actionTypes.REQUEST_PASSWORD_RESET,
  url: '/api/resets',
  method: 'post',
  data: {
    data: {
      type: 'resets',
      attributes: { email },
    },
  },
})





export const resetAuthenticationState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_AUTHENTICATION_STATE })
}





export const resetPassword = (password, token) => createApiAction({
  actionType: actionTypes.RESET_PASSWORD,
  url: `/api/resets/${token}`,
  data: {
    data: {
      type: 'users',
      attributes: { password },
    },
  },
})

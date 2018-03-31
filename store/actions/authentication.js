// Module imports
import 'isomorphic-fetch'
import Cookies from 'js-cookie'





// Component imports
import { createApiAction } from '../actionCreators'
import actionTypes from '../actionTypes'
import { createAlertObject } from '../../helpers'




export const confirmAccount = token => createApiAction({
  actionType: actionTypes.CONFIRM_ACCOUNT,
  url: `/api/confirmation/${token}`,
  method: 'post',
  onSuccess: ({ data }) => {
    Cookies.set('accessToken', data.data.attributes.token, { expires: 365 })
    Cookies.set('userId', data.data.attributes.user_id, { expires: 365 })
  },
  onError: 'Failed to confirm account.\nPlease make sure your token is correct.',
})





export const confirmEmailUpdate = (confirmationToken, accept = true) => createApiAction({
  actionType: actionTypes.CONFIRM_EMAIL_UPDATE,
  url: `/api/email/${confirmationToken}`,
  method: 'put',
  params: {
    response: accept ? 'accept' : 'reject',
  },
  onError: `Failed to ${accept ? 'confirm' : 'reject'} email change.\nPlease make sure your token is correct.`,
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
  onError: (error) => {
    Cookies.remove('accessToken')
    Cookies.remove('userId')

    if (error.response.status === 401) {
      return createAlertObject('Make sure your email and password are correct!', 'error', 'Login Failure!', null, true)
    }

    return createAlertObject('Failed to login.\nPlease try again in a few moments.')
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
  timeout: 60000,
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
  onError: 'An error occured while registering.\nPlease try again in a few moments.',
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
  onError: 'Failed to request password reset.\nPlease try again in a few moments.',
})





export const resetAuthenticationState = () => dispatch => {
  dispatch({ type: actionTypes.RESET_AUTHENTICATION_STATE })
}





export const resetPassword = (password, token) => createApiAction({
  actionType: actionTypes.RESET_PASSWORD,
  url: `/api/resets/${token}`,
  method: 'put',
  data: {
    data: {
      type: 'users',
      attributes: { password },
    },
  },
  onError: 'Password reset failed.\nMake sure your reset token is correct.',
})

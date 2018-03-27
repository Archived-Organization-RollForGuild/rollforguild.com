// Component imports
import apiService from '../services/api'
import { isRequired } from '../helpers'





const onFetchResult = response => response.data

const getServiceRequestPayload = options => {
  const payload = { ...options }

  delete payload.actionType
  delete payload.onFetchError
  delete payload.onFetchSuccess
  delete payload.service
  delete payload.preDispatch
  delete payload.postDispatch

  if (!payload.url) {
    isRequired('options.url')
  }

  return payload
}





/*
 * Example Options:
 *
 * Note that by default, the only required fields are 'actionType' and 'url'.
 * Using only the required options will result in an action which will perform a basic GET on the url, and return the data within the payload property of the returning object.
 *
 * {
 *   // action name to include in the calls to redux dispatch.
 *   actionType: actionTypes.ACTION_NAME, // REQUIRED
 *
 *   // server URL which will be used in the request.
 *   url: '/api/endpoint', // REQUIRED
 *
 *   // Called directly after either event happens. passes the direct response from the apiService.
 *   // By default, these functions will return the data body of the response.
 *   // Note that these functions directly set the resulting payload, which is sent to the reducers and calling function.
 *   onFetchError: function (response) { return response.data }, // default
 *   onFetchSuccess: function (response) { return response.data }, // default
 *
 *   // Axios service to use when performing the request. By default, this is set to apiService under /services/api
 *   service: apiService, // default
 *
 *   // Additional properties to send with the pre-request and post-request dispatch calls.
 *   preDispatch: {}, // default
 *   postDispatch: {}, // default
 *
 *   // ** All other options are sent to the service request **
 *   // Below are some common examples. for a full list see: https://github.com/axios/axios#request-config
 *
 *   // request method to be used
 *   method: 'get', // default
 *
 *   // Any additional custom headers
 *   headers: {
 *     'X-A-Header': 'hello world!',
 *   },
 *
 *   // Data body to be sent. This only applies to 'PUT', 'POST', and 'PATCH' methods.
 *   data: {
 *     foob: 'foobar',
 *   },
 *
 *   // Additional query parameters to be used in the request
 *   params: {
 *     foo: 'bar',
 *   },
 *
 *   // Any additional options to send to the axios service can be put into this object
 *
 *   requestOptions: {
 *     timeout: 5000,
 *   },
 *
 * }
 */

function createBasicAction (options = isRequired('options')) {
  const type = options.actionType || isRequired('options.actionType')

  const onFetchError = typeof options.onFetchError === 'function' ? options.onFetchError : onFetchResult
  const onFetchSuccess = typeof options.onFetchSuccess === 'function' ? options.onFetchSuccess : onFetchResult

  return async dispatch => {
    let response = null
    let success = false

    dispatch({
      type,
      ...options.preDispatch,
    })

    try {
      response = await (options.service || apiService).request(getServiceRequestPayload(options))
      response = onFetchSuccess(response)
      success = true
    } catch (error) {
      response = onFetchError(error)
      success = false
    }

    return dispatch({
      payload: response || null,
      status: success ? 'success' : 'error',
      type,
      ...options.postDispatch,
    })
  }
}

function createTimeoutAction (options = isRequired('options')) {
  const type = options.actionType || isRequired('options.actionType')
  const data = options.data || {}

  const onFetchError = typeof options.onFetchError === 'function' ? options.onFetchError : onFetchResult
  const onFetchSuccess = typeof options.onFetchSuccess === 'function' ? options.onFetchSuccess : onFetchResult

  return async dispatch => {
    let response = null
    let success = false

    dispatch({
      type,
      ...options.preDispatch,
    })

    try {
      response = await new Promise((resolve, reject) => setTimeout(() => (options.fail ? reject(data) : resolve(data)), options.timeout || 1000))
      response = onFetchSuccess(response)
      success = true
    } catch (error) {
      response = onFetchError(error)
      success = false
    }

    return dispatch({
      payload: response || null,
      status: success ? 'success' : 'error',
      type,
      ...options.postDispatch,
    })
  }
}



export default createBasicAction
export {
  createBasicAction,
  createTimeoutAction,
}

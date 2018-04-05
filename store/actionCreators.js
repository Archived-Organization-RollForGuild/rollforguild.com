import { isPlainObject } from 'lodash'

// Component imports
import {
  createAlertObject,
  isRequired,
} from '../helpers'
import apiService from '../services/api'





const getCleanedPayload = options => {
  const payload = { ...options }

  delete payload.actionFunction
  delete payload.actionPayload
  delete payload.actionType
  delete payload.onError
  delete payload.onSuccess
  delete payload.onUnhandledError
  delete payload.onUnhandledSuccess
  delete payload.preDispatch
  delete payload.postDispatch

  return payload
}


const getActionOptions = (options = isRequired('options')) => {
  let onError = null
  switch (typeof options.onError) {
    case 'function':
      ({ onError } = options)
      break

    case 'string':
      onError = () => createAlertObject(options.onError)
      break

    default:
      onError = () => undefined
      break
  }

  let onSuccess = null
  switch (typeof options.onSuccess) {
    case 'function':
      ({ onSuccess } = options)
      break

    case 'string':
      onSuccess = () => createAlertObject(options.onSuccess, 'success')
      break

    default:
      onSuccess = () => undefined
      break
  }

  const {
    actionFunction,
  } = options

  let {
    onUnhandledResult,
    onUnhandledResult: onUnhandledError,
    onUnhandledResult: onUnhandledSuccess,
    actionPayload,
  } = options

  if (typeof actionFunction !== 'function') {
    isRequired('options.actionFunction')
  }

  if (typeof onUnhandledResult === 'function') {
    ({ onUnhandledResult } = options)
  }

  if (typeof options.onUnhandledError === 'function') {
    ({ onUnhandledError } = options)
  }

  if (typeof options.onUnhandledSuccess === 'function') {
    ({ onUnhandledSuccess } = options)
  }

  if (typeof actionPayload === 'undefined') {
    actionPayload = getCleanedPayload(options)
  } else if (typeof actionPayload === 'function') {
    actionPayload = actionPayload(options)
  }

  if (!Array.isArray(actionPayload)) {
    actionPayload = [actionPayload]
  }

  return {
    actionFunction,
    actionPayload,
    actionType: options.actionType || isRequired('options.actionType'),
    onError,
    onSuccess,
    onUnhandledError,
    onUnhandledSuccess,
    preDispatch: isPlainObject(options.preDispatch) ? options.preDispatch : {},
    postDispatch: isPlainObject(options.postDispatch) ? options.postDispatch : {},
  }
}




/**
 * Constructs a new redux action function.
 *
 * @param   {Object.<string, *>} options                      Object containing configuration settings for the action.
 * @param   {Function}           options.actionFunction       The main action to perform.
 * @param   {*}                  [options.actionPayload]      Arguments to be sent to the actionFunction.
 * @param   {String}             options.actionType           Redux action type.
 * @param   {Function}           [options.onError]            Called immediately after catching an error thrown by the action.
 * @param   {Function}           [options.onSuccess]          Called immediately after the action completes.
 * @param   {Function}           [options.onUnhandledResult]  Convenience option to populate both onUnhandledError/Success.
 * @param   {Function}           [options.onUnhandledError]   Called if onError either is or returns undefined.
 * @param   {Function}           [options.onUnhandledSuccess] Called if onSuccess either is or returns undefined.
 * @param   {Object.<string, *>} [options.preDispatch]        Object of extra properties to include in the pre-action redux dispatch call.
 * @param   {Object.<string, *>} [options.postDispatch]       Object of extra properties to include in the post-action redux dispatch call.
 * @param   {*}                  [options.any]                All other entries of the options object are passed to the actionFunction by default.
 * @returns {Function}                                        Function which performs a redux action defined by the given configuration.
 */
function createAction (options) {
  const {
    actionFunction,
    actionPayload,
    actionType,
    onError,
    onSuccess,
    onUnhandledError,
    onUnhandledSuccess,
    preDispatch,
    postDispatch,
  } = getActionOptions(options)

  return async dispatch => {
    let response = null
    let success = false

    dispatch({
      ...preDispatch,
      type: actionType,
    })

    try {
      response = await actionFunction(...actionPayload)

      const eventResponse = onSuccess(response)

      if (typeof eventResponse !== 'undefined') {
        response = eventResponse
      } else if (onUnhandledSuccess) {
        response = onUnhandledSuccess(response)
      }

      success = true
    } catch (error) {
      const eventResponse = onError(error)

      if (typeof eventResponse !== 'undefined') {
        response = eventResponse
      } else if (onUnhandledError) {
        response = onUnhandledError(error)
      }

      success = false
    }

    return dispatch({
      ...postDispatch,
      payload: response || null,
      status: success ? 'success' : 'error',
      type: actionType,
    })
  }
}

const createApiAction = options => createAction({
  ...options,
  actionFunction: apiService.request,
  onUnhandledSuccess: res => res.data,
  onUnhandledError: res => res.response.data,
})

const createTimeoutAction = options => createAction({
  ...options,
  actionFunction: opts => {
    const data = { data: opts.data }

    return new Promise((resolve, reject) =>
      setTimeout(
        () => (opts.fail ? reject(data) : resolve(data)),
        opts.timeout || 1000
      ))
  },
})



/**
 * Performs a series of specified redux actions
 *
 * @param   {String}       actions      List of actions to take
 * @param   {Boolean}      [silentFail] Determines if the action chain should ignore actions which return with an error
 * @param   {Boolean}      [returnLast] Determines if the last response or the entire array of responses should be returned
 * @returns {Array|Object}              Array of responses from the actions performed, or the last response in the chain depending on returnLast
 */
/* eslint-disable no-await-in-loop */
function actionSeries (actions = isRequired('actions'), silentFail, returnLast) {
  return async dispatch => {
    const responses = []

    if (Array.isArray(actions) && actions.length) {
      for (const action of actions) {
        if (typeof action === 'function') {
          const response = await action(dispatch)

          responses.push(response)

          if (!silentFail && response && response.status && response.status !== 'success') {
            break
          }
        }
      }
    }

    if (returnLast) {
      if (responses.length) {
        return responses[responses.length - 1]
      }
      return null
    }

    return responses
  }
}
/* eslint-enable no-await-in-loop */


export default createAction
export {
  actionSeries,
  createAction,
  createApiAction,
  createTimeoutAction,
}

import { isPlainObject } from 'lodash'
import UUIDv4 from 'uuid/v4'

// Component imports
import createAlertObject from '../helpers/createAlertObject'
import isRequired from '../helpers/isRequired'
import apiService from '../services/api'
import wpService from '../services/wordpress'





const getActionOptions = (options = isRequired('options')) => {
  /* Use single let statement here to make the rest arg act as intended */
  /* eslint-disable prefer-const */
  let {
    actionArguments,
    actionFunction,
    actionPayload,
    actionShouldRun,
    actionType,
    onError,
    onSuccess,
    onUnhandledResult: onUnhandledError,
    onUnhandledResult: onUnhandledSuccess,
    preDispatch,
    postDispatch,
    ...otherOpts
  } = options
  /* eslint-enable prefer-const */

  switch (typeof onError) {
    case 'function':
      break

    case 'string':
      onError = () => createAlertObject(options.onError)
      break

    default:
      onError = () => undefined
      break
  }

  switch (typeof onSuccess) {
    case 'function':
      break

    case 'string':
      onSuccess = () => createAlertObject(options.onSuccess, 'success')
      break

    default:
      onSuccess = () => undefined
      break
  }

  if (typeof options.onUnhandledError === 'function') {
    ({ onUnhandledError } = options)
  }

  if (typeof options.onUnhandledSuccess === 'function') {
    ({ onUnhandledSuccess } = options)
  }

  if (typeof actionPayload === 'undefined') {
    actionPayload = { ...otherOpts }
  } else if (typeof actionPayload === 'function') {
    actionPayload = actionPayload(options)
  }

  if (!Array.isArray(actionPayload)) {
    actionPayload = [actionPayload]
  }

  if (typeof actionArguments === 'undefined') {
    actionArguments = [...actionPayload]
  }

  return {
    actionArguments,
    actionFunction,
    actionPayload,
    actionShouldRun,
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
 * @param   {*}                  [options.actionArguments]    Arguments to be stored in pending request tracker. Used to determine if poetentially duplicate requests should run.
 * @param   {Function}           options.actionFunction       The main action to perform.
 * @param   {*}                  [options.actionPayload]      Arguments to be sent to the actionFunction.
 * @param   {Function}           [options.actionShouldRun]    Function which determines if the action should be ran. Passes an object of all currently running actions under the same actionType
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
    actionArguments,
    actionFunction,
    actionPayload,
    actionShouldRun,
    actionType,
    onError,
    onSuccess,
    onUnhandledError,
    onUnhandledSuccess,
    preDispatch,
    postDispatch,
  } = getActionOptions(options)

  return async (dispatch, getState) => {
    let response = null
    let success = false

    if (typeof actionShouldRun === 'function') {
      const shouldRun = actionShouldRun(getState().__pending[actionType] || null)

      if (!shouldRun) {
        return {
          payload: null,
          status: 'pending',
          type: actionType,
        }
      }
    }

    const __aId = UUIDv4()

    dispatch({
      ...preDispatch,
      type: actionType,
      __aId,
      __aArg: actionArguments,
    })

    try {
      response = await actionFunction(...actionPayload)

      const eventResponse = await onSuccess(response)

      if (typeof eventResponse !== 'undefined') {
        response = eventResponse
      } else if (onUnhandledSuccess) {
        response = await onUnhandledSuccess(response)
      }

      success = true
    } catch (error) {
      const eventResponse = await onError(error)

      if (typeof eventResponse !== 'undefined') {
        response = eventResponse
      } else if (onUnhandledError) {
        response = await onUnhandledError(error)
      }

      success = false
    }

    return dispatch({
      ...postDispatch,
      payload: response || null,
      status: success ? 'success' : 'error',
      type: actionType,
      __aId,
    })
  }
}

const createApiAction = options => createAction({
  ...options,
  actionFunction: apiService.request,
  onUnhandledSuccess: res => res.data,
  onUnhandledError: res => res.response.data,
})

const createWpAction = options => createAction({
  ...options,
  actionFunction: wpService.request,
  onUnhandledSuccess: res => res.data,
  onUnhandledError: res => res && res.response && res.response.data,
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
  return async (...thunkArgs) => {
    const responses = []

    if (Array.isArray(actions) && actions.length) {
      for (const action of actions) {
        if (typeof action === 'function') {
          const response = await action(...thunkArgs)

          responses.push(response)

          if (!silentFail && response && response.status && response.status === 'error') {
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
  createWpAction,
}

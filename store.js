// Module imports
import {
  combineReducers,
  createStore,
  applyMiddleware
} from 'redux'
import thunkMiddleware from 'redux-thunk'





// Component imports
import actionTypes from './store/actionTypes'
import initialState from './store/initialState'
import reducer from './store/reducers/index'

/* actions */
import * as authenticationActions from './store/actions/authentication'





export const actions = Object.assign(
  {},
  authenticationActions,
)





export const initStore = (initialState = initialState) => {
  return createStore(reducer, initialState, applyMiddleware(thunkMiddleware))
}

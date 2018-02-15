// Module imports
import {
  createStore,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'





// Component imports
import initialState from './store/initialState'
import reducer from './store/reducers/index'

/* actions */
import * as authenticationActions from './store/actions/authentication'
import * as charactersActions from './store/actions/characters'
import * as groupsActions from './store/actions/groups'
import * as rulesetsActions from './store/actions/rulesets'
// import * as userActions from './store/actions/user'





export const actions = {
  ...authenticationActions,
  ...charactersActions,
  ...groupsActions,
  ...rulesetsActions,
  // ...userActions,
}





export const initStore = () => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))

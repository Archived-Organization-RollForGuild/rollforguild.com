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
import * as avatarsActions from './store/actions/avatars'
import * as charactersActions from './store/actions/characters'
import * as groupsActions from './store/actions/groups'
import * as rulesetsActions from './store/actions/rulesets'
import * as usersActions from './store/actions/users'





export const actions = {
  ...authenticationActions,
  ...avatarsActions,
  ...charactersActions,
  ...groupsActions,
  ...rulesetsActions,
  ...usersActions,
}





export const initStore = () => createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))

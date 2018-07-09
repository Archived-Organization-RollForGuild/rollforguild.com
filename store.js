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
import * as alertsActions from './store/actions/alerts'
import * as authenticationActions from './store/actions/authentication'
import * as avatarsActions from './store/actions/avatars'
import * as eventsActions from './store/actions/events'
import * as gamesActions from './store/actions/games'
import * as groupsActions from './store/actions/groups'
import * as forumsActions from './store/actions/forums'
import * as usersActions from './store/actions/users'
import * as wordpressActions from './store/actions/wordpress'





export const actions = {
  ...alertsActions,
  ...authenticationActions,
  ...avatarsActions,
  ...eventsActions,
  ...gamesActions,
  ...groupsActions,
  ...forumsActions,
  ...usersActions,
  ...wordpressActions,
}





export const initStore = (state = initialState) => createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))

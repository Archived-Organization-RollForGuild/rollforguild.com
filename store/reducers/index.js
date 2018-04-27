import { combineReducers } from 'redux'
import alerts from './alerts'
import authentication from './authentication'
import avatars from './avatars'
import characters from './characters'
import events from './events'
import groups from './groups'
import rulesets from './rulesets'
import forums from './forums'
import users from './users'





export default combineReducers({
  alerts,
  authentication,
  avatars,
  characters,
  events,
  forums,
  groups,
  rulesets,
  users,
})

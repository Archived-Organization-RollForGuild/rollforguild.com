import { combineReducers } from 'redux'
import authentication from './authentication'
import avatars from './avatars'
import characters from './characters'
import groups from './groups'
import rulesets from './rulesets'
import threads from './threads'
import users from './users'





export default combineReducers({
  authentication,
  avatars,
  characters,
  groups,
  rulesets,
  threads,
  users,
})

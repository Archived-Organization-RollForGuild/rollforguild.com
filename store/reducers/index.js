import { combineReducers } from 'redux'
import authentication from './authentication'
import character from './character'
import characters from './characters'
import groups from './groups'
import rulesets from './rulesets'
import user from './user'





export default combineReducers({
  authentication,
  character,
  characters,
  groups,
  rulesets,
  user,
})

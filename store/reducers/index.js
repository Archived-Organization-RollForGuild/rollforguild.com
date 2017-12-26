import { combineReducers } from 'redux'
import authentication from './authentication'
import character from './character'
import characters from './characters'
import rulesets from './rulesets'
import user from './user'





export default combineReducers({
  authentication,
  character,
  characters,
  rulesets,
  user,
})

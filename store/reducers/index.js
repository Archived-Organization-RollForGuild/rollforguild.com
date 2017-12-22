import { combineReducers } from 'redux'
import authentication from './authentication'
import character from './character'
import characters from './characters'
import user from './user'





export default combineReducers({
  authentication,
  character,
  characters,
  user,
})

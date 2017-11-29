import { combineReducers } from 'redux'
import authentication from './authentication'
import characters from './characters'
import user from './user'





export default combineReducers({
  authentication,
  characters,
  user,
})

import { combineReducers } from 'redux'
import cheats from './cheatsReducer'
import user from './userReducer'

const rootReducer = combineReducers({
  cheats,
  user
});

export default rootReducer;
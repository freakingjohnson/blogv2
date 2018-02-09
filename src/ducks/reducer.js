import { combineReducers } from 'redux'
import blogReducer from './subDucks/blogReducer'

const reducer = combineReducers({
  blogReducer,
})

export default reducer
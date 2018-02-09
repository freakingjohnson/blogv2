import { combineReducers } from 'redux'
import blogReducer from './subDucks/blogReducer'
import imgReducer from './subDucks/imgReducer'

const reducer = combineReducers({
  blogReducer,
  imgReducer,
})

export default reducer
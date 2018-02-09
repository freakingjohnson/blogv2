import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './ducks/reducer'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk, promiseMiddleware())))
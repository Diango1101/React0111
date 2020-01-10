import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { counterReducer } from './count.redux'
import { user } from './user.redux'
// combineReducers可将多个reducer融为一个
const store = createStore(
    combineReducers({ counter: counterReducer, user: user }),
    applyMiddleware(logger, thunk)
)

export default store

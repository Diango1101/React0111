// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'
// import { counterReducer } from './count.redux'
// import { user } from './user.redux'

// combineReducers可将多个reducer融为一个
// const store = createStore(
//     combineReducers({ counter: counterReducer, user: user }),
//     applyMiddleware(logger, thunk)
// )

// export default store

// import createStore from 'antd/lib/table/createStore'
// import { combineReducers, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
// import { user } from './user.redux'
// import createSagaMiddleware from 'redux-saga'
// import mySaga from './sagas'
// // 1.创建saga中间件并注册
// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//     combineReducers({ user }),
//     applyMiddleware(logger, sagaMiddleware)
// )
// // 2.中间件运行saga
// sagaMiddleware.run(mySaga)
// export default store

import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { counterReducer } from './count.redux'
import { user } from './user.redux'
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

// 1.创建saga中间件并注册
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    combineReducers({ user }),
    applyMiddleware(logger, sagaMiddleware)
)
// 2.中间件运行saga
sagaMiddleware.run(mySaga)
export default store

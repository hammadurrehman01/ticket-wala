import { createStore, applyMiddleware, compose } from "redux"
import createSagaMiddleware from "redux-saga"

import rootReducer from "./reducers"
import rootSaga from "./sagas"
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middleWares = [sagaMiddleware, thunk]

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleWares))
)
sagaMiddleware.run(rootSaga)

export default store

import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // LocalStorage by default
import { logger } from './logger'
import { reducers } from './reducers'
import { hypermergeRedux, _Action } from './hypermerge-redux'
import { Repo } from 'hypermerge'
import ram from 'random-access-web'

const sync = new Repo({
  path: '.data',
  storage: ram(),
})

const init = () => {}

const persistConfig = { key: 'root', storage }
const reducer = persistReducer(persistConfig, reducers)

const enhancer = applyMiddleware(logger, hypermergeRedux(sync, { init }))

export const store = createStore(reducer, enhancer)

export const persistor = persistStore(store)

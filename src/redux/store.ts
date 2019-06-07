import { Repo } from 'hypermerge'
import ram from 'random-access-web'
import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // LocalStorage by default
import { hypermergeRedux } from './hypermerge-redux'
import { logger } from './logger'
import { reducers } from './reducers'

const repo = new Repo({
  path: '.data',
  storage: ram(),
})

const persistConfig = { key: 'root', storage }
const reducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  reducer,
  applyMiddleware(logger, hypermergeRedux(repo))
)

export const persistor = persistStore(store)

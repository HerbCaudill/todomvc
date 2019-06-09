// import { Repo } from 'hypermerge';
// import webStorage from 'random-access-web'; // for hypermerge
import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // for redux
// import { hypermergeRedux } from './hypermerge-redux';
import { logger } from './logger'
import { reducers } from './reducers'

// const repo = new Repo({
//   path: '.data',
//   storage: webStorage
// })

// const url = repo.create('state')

const persistConfig = { key: 'root', storage }
const reducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  reducer,
  applyMiddleware(logger)
  // applyMiddleware(logger, hypermergeRedux(repo, url))
)

export const persistor = persistStore(store)

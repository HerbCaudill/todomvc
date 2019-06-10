import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // for redux
import { logger } from './logger'
import { reducers } from './reducers'

const persistConfig = { key: 'root', storage }
const reducer = persistReducer(persistConfig, reducers)

export const store = createStore(reducer, applyMiddleware(logger))

export const persistor = persistStore(store)

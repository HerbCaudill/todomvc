import { createStore } from 'redux'
// import { logger } from './logger'
import { reducers } from './reducers'

export const store = createStore(reducers)


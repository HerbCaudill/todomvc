import { applyMiddleware, createStore } from 'redux'
// import { logger } from './logger'
import { reducers } from './reducers'
import { reduxSwarmLogMiddleware } from '../redux-swarmlog'

export const store = createStore(reducers, applyMiddleware(reduxSwarmLogMiddleware))


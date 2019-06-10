import { createStore } from 'redux'
// import { logger } from './logger'
import { reducers } from './reducers'
import scuttlebutt from 'redux-scuttlebutt'

export const store = createStore(
  reducers,
  undefined,
  scuttlebutt({
    uri: 'http://localhost:2222',
  })
)

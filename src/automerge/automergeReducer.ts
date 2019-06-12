import Automerge from 'automerge'
import { Reducer } from 'react'
import { Action } from 'src/types'
import { ProxyReducer } from './types'

type AR = <T>(proxyReducer: ProxyReducer<T>) => Reducer<T, Action>

export const automergeReducer: AR = proxyReducer => (state, action) => {
  const { type, payload } = action
  const msg = `${type}: ${JSON.stringify(payload)}`
  const fn = proxyReducer({ type, payload })
  return fn
    ? Automerge.change(state, msg, fn) // return a modified Automerge object
    : state // no matching change function was found, return state unchanged
}

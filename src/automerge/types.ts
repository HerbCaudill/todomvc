import Automerge from 'automerge'
import { Action } from 'src/types'

export type ProxyReducer<T> = (action: Action) => Automerge.ChangeFn<T> | null

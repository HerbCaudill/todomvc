import React, { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { AnyAction } from 'redux'
import { State, VisibilityFilter } from 'src/types'
import { actions } from './actions'
import { reducer } from './reducer'
import Automerge from 'automerge'

export interface ContextInterface {
  state: State
  dispatch: Dispatch<AnyAction>
  actions: typeof actions
}

const STORAGE_KEY = 'todos'

const DEFAULT_STATE: State = Automerge.change(Automerge.init<State>(), d => {
  d.visibilityFilter = VisibilityFilter.ALL
  d.todoList = []
  d.todoMap = {}
})

const getInitialState = () => {
  const rehydrate = (historyJson: string): State => {
    const history = JSON.parse(historyJson)
    return Automerge.applyChanges(Automerge.init(), history)
  }

  const history = localStorage.getItem(STORAGE_KEY)
  return history ? rehydrate(history) : DEFAULT_STATE
}

const DISPATCH_PLACEHOLDER = () => {}

const initialState = getInitialState()

export const StoreContext = createContext<ContextInterface>({
  state: initialState,
  dispatch: DISPATCH_PLACEHOLDER,
  actions,
})

type Reducer = typeof reducer

const persist = (r: Reducer): Reducer => (prevState, action) => {
  const nextState = r(prevState, action)
  const changes = Automerge.getChanges(prevState, nextState)
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...history, ...changes]))
  return nextState
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(persist(reducer), initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  )
}

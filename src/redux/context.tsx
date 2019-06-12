import React, { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { AnyAction } from 'redux'
import { State, VisibilityFilter } from 'src/types'
import { reducer } from './reducer'
import Automerge from 'automerge'

export interface ContextInterface {
  state: State
  dispatch: Dispatch<AnyAction>
}

const STORAGE_KEY = 'todos'

const DEFAULT_STATE: State = Automerge.change(
  Automerge.init<State>(),
  'initialize',
  d => {
    d.visibilityFilter = VisibilityFilter.ALL
    d.todoList = []
    d.todoMap = {}
    d.data = {
      a: [1, 2, 34, 4, 5, 6, 34, 2342, 1],
      b: {
        q: [1243,1234]
      }
    }
  }
)

const persistChanges = (prevState: State, nextState: State): void => {
  const changes = Automerge.getChanges(prevState, nextState)
  const prevHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  const history = prevHistory.concat(changes)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
}

const getInitialState = () => {
  const rehydrate = (historyJson: string): State => {
    const history = JSON.parse(historyJson)
    return Automerge.applyChanges(Automerge.init(), history)
  }

  const history = localStorage.getItem(STORAGE_KEY)
  if (history) {
    return rehydrate(history)
  } else {
    persistChanges(Automerge.init(), DEFAULT_STATE)
    return DEFAULT_STATE
  }
}

const DISPATCH_PLACEHOLDER = () => {}

const initialState = getInitialState()

export const StoreContext = createContext<ContextInterface>({
  state: initialState,
  dispatch: DISPATCH_PLACEHOLDER,
})

type Reducer = typeof reducer

const persist = (r: Reducer): Reducer => (prevState, action) => {
  console.log('persist', action.type)
  const nextState = r(prevState, action)
  persistChanges(prevState, nextState)
  return nextState
}

const persistedReducer = persist(reducer)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(persistedReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

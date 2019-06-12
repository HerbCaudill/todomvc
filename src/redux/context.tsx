import React, { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { AnyAction } from 'redux'
import { State, VisibilityFilter } from 'src/types'
import { actions } from './actions'
import { reducer } from './reducer'

export interface ContextInterface {
  state: State
  dispatch: Dispatch<AnyAction>
  actions: typeof actions
}

const DEFAULT_STATE: State = {
  visibilityFilter: VisibilityFilter.ALL,
  todoList: [],
  todoMap: {},
}

const persistedState = localStorage.getItem('todos')
const initialState = persistedState ? JSON.parse(persistedState) : DEFAULT_STATE

const DISPATCH_PLACEHOLDER = () => {}

export const StoreContext = createContext<ContextInterface>({
  state: initialState,
  dispatch: DISPATCH_PLACEHOLDER,
  actions,
})

type Reducer = typeof reducer

const persist = (r: Reducer): Reducer => (prevState, action) => {
  const nextState = r(prevState, action)
  localStorage.setItem('todos', JSON.stringify(nextState))
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

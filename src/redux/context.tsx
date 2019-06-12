import React, { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { AnyAction } from 'redux'
import { State, VisibilityFilter } from 'src/types'
import { actions } from './actions'
import { reducers } from './reducers'

const initialState: State = {
  visibilityFilter: VisibilityFilter.ALL,
  todoList: [],
  todoMap: {},
}

export interface ContextInterface {
  state: State
  dispatch: Dispatch<AnyAction>
  actions: typeof actions
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducers, initialState)
  const context = { state, dispatch, actions }
  const StoreContext = createContext(context)
  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  )
}

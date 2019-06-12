import React, { createContext, Dispatch, ReactNode, useReducer } from 'react'
import { AnyAction } from 'redux'
import { State, VisibilityFilter } from 'src/types'
import { actions } from './actions'
import { reducers } from './reducers'

export interface ContextInterface {
  state: State
  dispatch: Dispatch<AnyAction>
  actions: typeof actions
}

const initialState: State = {
  visibilityFilter: VisibilityFilter.ALL,
  todoList: [],
  todoMap: {},
}

const [state, dispatch] = useReducer(reducers, initialState)
const context = { state, dispatch, actions }

export const StoreContext = createContext(context)

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
)

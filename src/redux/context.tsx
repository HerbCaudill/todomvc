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

const DISPATCH_PLACEHOLDER = () => {}

export const StoreContext = createContext<ContextInterface>({
  state: initialState,
  dispatch: DISPATCH_PLACEHOLDER,
  actions,
})

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducers, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  )
}

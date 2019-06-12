import React, {
  createContext,
  useReducer,
  Dispatch,
  ReactChildren,
} from 'react'
import { State, VisibilityFilter } from 'src/types'
import { reducers } from './reducers'
import { AnyAction } from 'redux'

const initialState: State = {
  visibilityFilter: VisibilityFilter.ALL,
  todoList: [],
  todoMap: {},
}

export interface ContextInterface {
  state: State
  dispatch?: Dispatch<AnyAction>
}

export const StoreContext = createContext<ContextInterface>({
  state: initialState,
})

export const StoreProvider = ({ children }: any) => {
  // Get state and dispatch from Reacts new API useReducer.
  const [state, dispatch] = useReducer(reducers, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

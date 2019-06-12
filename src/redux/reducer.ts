// import { combineReducers } from 'redux'
// import { visibilityFilter } from './reducers/visibilityFilter'
// import { todoList } from './reducers/todoList'
// import { todoMap } from './reducers/todoMap'
// export const reducer = combineReducers({
//   visibilityFilter,
//   todoList,
//   todoMap,
// })

import { Reducer } from 'react'
import { AnyAction } from 'redux'
import { State } from 'src/types'
import { ActionType } from './actions'

export const reducer: Reducer<State, AnyAction> =
  (state, { type, payload }) => {
    switch (type) {
      case ActionType.SET_FILTER:
        return {
          ...state,
          visibilityFilter: payload.filter
        }

      case ActionType.ADD_TODO: {
        const { id, content } = payload
        return {
          ...state,
          todoMap: {
            ...state.todoMap,
            [id]: {
              content: content,
              completed: false,
            },
          },
          todoList: [...state.todoList, payload.id]
        }
      }

      case ActionType.DESTROY_TODO: {
        const { id } = payload
        const { [id]: _, ...rest } = state.todoMap
        return {
          ...state,
          todoMap: rest,
          todoList: state.todoList.filter(d => d !== payload.id)
        }
      }

      case ActionType.TOGGLE_TODO: {
        const { id } = payload
        const currentTodo = state.todoMap[id]
        return {
          ...state,
          todoMap: {
            ...state.todoMap,
            [id]: {
              ...currentTodo,
              completed: !currentTodo.completed,
            },
          },
        }
      }

      case ActionType.EDIT_TODO: {
        const { id, content } = payload
        const currentTodo = state.todoMap[id]
        return {
          ...state,
          todoMap: {
            ...state.todoMap,
            [id]: { ...currentTodo, content: content },
          }
        }
      }

      default:
        return state
    }
  }


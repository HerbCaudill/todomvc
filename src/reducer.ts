import Automerge from 'automerge'
import { Reducer } from 'react'
import { State, Action } from 'src/types'
import { ActionType } from './actions'

export const reducer: Reducer<State, Action> = (state, { type, payload }) => {
  const msg = `${type}: ${JSON.stringify(payload)}`
  console.log(msg)

  switch (type) {
    case ActionType.SET_FILTER:
      return Automerge.change(state, msg, d => {
        d.visibilityFilter = payload.filter
      })

    case ActionType.ADD_TODO: {
      const { id, content } = payload
      return Automerge.change(state, msg, d => {
        d.todoList.push(id)
        d.todoMap[id] = { id, content, completed: false }
      })
    }

    case ActionType.DESTROY_TODO: {
      const { id } = payload
      return Automerge.change(state, msg, d => {
        delete d.todoMap[id]
        d.todoList = d.todoList.filter(_id => _id !== payload.id)
      })
    }

    case ActionType.TOGGLE_TODO: {
      const { id } = payload
      const currentTodo = state.todoMap[id]
      return Automerge.change(state, msg, d => {
        d.todoMap[id].completed = !currentTodo.completed
      })
    }

    case ActionType.EDIT_TODO: {
      const { id, content } = payload
      return Automerge.change(state, msg, d => {
        d.todoMap[id].content = content
      })
    }

    default:
      return state
  }
}

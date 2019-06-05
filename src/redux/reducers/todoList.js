import { ADD_TODO, DESTROY_TODO } from '../actions'

export const todoList = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return [...state, payload.id]
    case DESTROY_TODO:
      return state.filter(d => d !== payload.id)
    default:
      return state
  }
}

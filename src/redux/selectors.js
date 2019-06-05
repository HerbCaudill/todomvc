import { VISIBILITY_FILTERS } from '../constants'

export const getVisibilityFilter = state => state.visibilityFilter

export const getTodo = id => state => ({ ...state.todoMap[id], id })

export const getAllTodos = state => state.todoList.map(id => getTodo(id)(state))

export const getFilteredTodos = visibilityFilter => state => {
  const allTodos = getAllTodos(state)

  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.ALL:
      return allTodos
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed)
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed)
    default:
      throw new Error(`Unknown visibility filter '${visibilityFilter}'`)
  }
}

export const getVisibleTodos = state => {
  const visibilityFilter = getVisibilityFilter(state)
  return getFilteredTodos(visibilityFilter)(state)
}

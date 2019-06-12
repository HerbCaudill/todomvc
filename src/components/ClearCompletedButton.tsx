import React, { useContext } from 'react'

import { actions } from '../redux/actions'
import { getFilteredTodos } from '../redux/selectors'
import { VisibilityFilter } from '../types'
import { StoreContext } from 'src/redux/context'

export function ClearCompletedButton() {
  const { state, dispatch } = useContext(StoreContext)

  // don't render this button if there are no completed todos
  const completedTodos = getFilteredTodos(VisibilityFilter.COMPLETED)(state)

  if (completedTodos.length === 0) return null

  const destroyCompletedTodos = () =>
    completedTodos.forEach(({ id }) => dispatch(actions.destroyTodo(id)))

  return (
    <button className="clear-completed" onClick={destroyCompletedTodos}>
      Clear completed
    </button>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { destroyTodo } from '../redux/actions'
import { getFilteredTodos } from '../redux/selectors'
import { VISIBILITY_FILTERS } from '../constants'

export function ClearCompletedButton() {
  const dispatch = useDispatch()

  // don't render this button if there are no completed todos
  const completedTodos = useSelector(
    getFilteredTodos(VISIBILITY_FILTERS.COMPLETED)
  )
  if (completedTodos.length === 0) return null

  const destroyCompletedTodos = () =>
    completedTodos.forEach(({ id }) => dispatch(destroyTodo(id)))

  return (
    <button className="clear-completed" onClick={destroyCompletedTodos}>
      Clear completed
    </button>
  )
}

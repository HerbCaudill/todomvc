import React, { useContext } from 'react'
import { StoreContext } from 'src/redux/context'
import { Todo } from '.'
import { getVisibleTodos } from '../redux/selectors'

export const TodoList = () => {
  const { state } = useContext(StoreContext)

  const todos = getVisibleTodos(state)

  return (
    <ul className="todo-list">
      {todos && todos.map(todo => <Todo key={`todo-${todo.id}`} {...todo} />)}
    </ul>
  )
}

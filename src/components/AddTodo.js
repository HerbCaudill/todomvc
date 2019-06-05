import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/actions'

export const AddTodo = props => {
  // input.current will contain a reference to the new todo input field
  const input = useRef()

  const dispatch = useDispatch()

  const save = e => {
    // don't post back
    e.preventDefault()
    const newText = input.current.value.trim()
    // don't create empty todos
    if (newText.length === 0) return
    // update state with new todo
    dispatch(addTodo(newText))
    // clear input
    input.current.value = ''
  }

  return (
    <div>
      <form onSubmit={save}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          ref={input}
          autoFocus={true}
        />
      </form>
    </div>
  )
}

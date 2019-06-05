import uuid from 'uuid'
export const ADD_TODO = 'ADD_TODO'
export const addTodo = content => ({
  type: ADD_TODO,
  payload: { content, id: uuid() },
})

export const TOGGLE_TODO = 'TOGGLE_TODO'
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id },
})

export const EDIT_TODO = 'EDIT_TODO'
export const editTodo = (id, content) => ({
  type: EDIT_TODO,
  payload: { id, content },
})

export const DESTROY_TODO = 'DESTROY_TODO'
export const destroyTodo = id => ({
  type: DESTROY_TODO,
  payload: { id },
})

export const SET_FILTER = 'SET_FILTER'
export const setFilter = filter => ({
  type: SET_FILTER, //
  payload: { filter },
})

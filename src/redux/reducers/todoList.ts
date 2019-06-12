import { Reducer } from 'redux';
import { Todo } from '../../types';
import { ActionType } from '../actions';


export const todoList: Reducer = (state: Todo[] = [], { type, payload }) => {
  switch (type) {
    case ActionType.ADD_TODO:
      return [...state, payload.id]
    case ActionType.DESTROY_TODO:
      return state.filter(d => d !== payload.id)
    default:
      return state
  }
}

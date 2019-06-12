import { VisibilityFilter } from '../../types'
import { ActionType } from '../actions'
import { Reducer } from 'redux'

export const visibilityFilter: Reducer = (
  state = VisibilityFilter.ALL,
  { type, payload }
) => {
  switch (type) {
    case ActionType.SET_FILTER:
      return payload.filter
    default:
      return state
  }
}

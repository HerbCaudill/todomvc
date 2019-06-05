import { SET_FILTER } from '../actions'
import { VISIBILITY_FILTERS } from '../../constants'

export const visibilityFilter = (
  state = VISIBILITY_FILTERS.ALL,
  { type, payload }
) => {
  switch (type) {
    case SET_FILTER:
      return payload.filter
    default:
      return state
  }
}

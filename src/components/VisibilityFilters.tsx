import React from 'react'
import cn from 'classnames'
import { useSelector, useDispatch } from 'react-redux'

import { setFilter } from '../redux/actions'
import { VISIBILITY_FILTERS } from '../constants'

export const VisibilityFilters = () => {
  const activeFilter = useSelector((state: any) => state.visibilityFilter)
  const dispatch = useDispatch()

  return (
    <ul className="filters">
      {Object.keys(VISIBILITY_FILTERS).map(filterKey => {
        const currentFilter = VISIBILITY_FILTERS[filterKey]

        const selected = currentFilter === activeFilter

        const onClick = e => {
          e.preventDefault()
          dispatch(setFilter(currentFilter))
        }

        return (
          <li key={`visibility-filter-${currentFilter}`}>
            {/* linter doesn't like not having an href */}
            {/* eslint-disable-next-line */}
            <a
              className={cn({ selected })}
              onClick={onClick}
              style={{ cursor: 'pointer' }}
            >
              {currentFilter}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

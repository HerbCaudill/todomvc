export interface Todo {
  id: string
  content: string
  completed: boolean
}

export interface State {
  todoList: string[]
  todoMap: { [id: string]: Todo }
  visibilityFilter: VisibilityFilter
}

export enum VisibilityFilter {
  ALL = 'All',
  INCOMPLETE = 'Active',
  COMPLETED = 'Completed',
}

export type VisibilityFilterKey = keyof typeof VisibilityFilter

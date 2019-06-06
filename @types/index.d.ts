declare enum VisibilityFilter {
  ALL = 'All',
  INCOMPLETE = 'Active',
  COMPLETED = 'Completed',
}

declare type VisibilityFilterKey = keyof typeof VisibilityFilter

declare interface Todo {
  id: string
  content: string
  completed: boolean
}

declare interface State {
  todoList: string[]
  todoMap: { [id: string]: Todo }
  visibilityFilter: VisibilityFilter
}

export type Todo = {
  id: number
  name: string
  completed: boolean
  description?: string
  priority: 1 | 2 | 3;
}

// export type TodoCreate = Omit<Todo, 'id' | 'completed'>

export type TodoToggle = Pick<Todo, 'id' | 'completed'>

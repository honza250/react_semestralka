import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import { Spinner } from '../spinner'
import { ErrorMessage } from '../error-message'
import { useTodosQuery } from '../../hooks/useTodosQuery'
import { useState } from 'react'



export const TodosSection = () => {
  const [priorityFilter, setPriorityFilter] = useState<number | undefined>(undefined)
  const { data: todos, error, isLoading, refetch } = useTodosQuery(priorityFilter)

  return (
    <main>
      <div>
        <label>Filter by priority: </label>
        <select
          value={priorityFilter ?? ''}
          onChange={(e) => {
            const value = e.target.value
            setPriorityFilter(value ? Number(value) : undefined)
          }}
        >
          <option value="">All</option>
          <option value="1">Priority 1</option>
          <option value="2">Priority 2</option>
          <option value="3">Priority 3</option>
        </select>
      </div>

      {error && <ErrorMessage message={error.message} onDismiss={refetch} />}
      <TodoForm />
      <div className="todo-container">
        <ul>
          {todos?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
        {isLoading && <Spinner />}
      </div>
    </main>
  )
}

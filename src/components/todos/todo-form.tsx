import { useState, type ChangeEvent } from 'react'
import { useTodoCreate } from '../../hooks/useTodoCreate'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState('')
  const [priority, setPriority] = useState<1 | 2 | 3>(3) // default 3
  const { mutate } = useTodoCreate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPriority(Number(e.target.value) as 1 | 2 | 3)
  }

  const handleSubmit = () => {
    if (!todoName.trim()) return
    mutate({ name: todoName, priority })
    setTodoName('')
    setPriority(3) // reset na default
  }

  return (
    <div className="input-group">
      <input
        value={todoName}
        onChange={handleInputChange}
        name="todo-text"
        placeholder="What needs to be done?"
      />
      <select value={priority} onChange={handlePriorityChange}>
        <option value={1}>Priority 1</option>
        <option value={2}>Priority 2</option>
        <option value={3}>Priority 3</option>
      </select>
      <button onClick={handleSubmit} type="submit">
        Add
      </button>
    </div>
  )
}

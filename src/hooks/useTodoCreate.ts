import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi'
import type { Todo } from '../types'

type NewTodoData = {
  name: string,
  priority?: 1 | 2 | 3
}
export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Todo,
    ApiError,
    NewTodoData,
    { previousTodos: Todo[] | undefined }
  >({
    mutationKey: ['createTodo'],
    mutationFn: async ({ name, priority = 3 }) => {
      return await todoApi.createTodo(name, priority)
    },
    onMutate: async ({ name, priority = 3 }) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        return [
          ...(old || []),
          {
            name,
            id: Date.now(),
            completed: false,
            priority,
          },
        ]
      })

      return { previousTodos }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

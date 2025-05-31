import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { todoApi } from '../api/todoApi'
import { useQuery } from '@tanstack/react-query'

export const useTodoQuery = (priority?: number) => {
  return useQuery({
    queryKey: ['todos', priority],  // klíč závisí na priority, aby se správně kešovalo
    queryFn: () => {
      return todoApi.fetchTodos(priority)
    },
  })
}

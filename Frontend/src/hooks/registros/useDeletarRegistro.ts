import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useDeletarRegistro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => api.delete(`/api/v1/registros/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registros'] })
    },
  })
}

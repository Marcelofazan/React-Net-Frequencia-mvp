import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { CriarRegistroPayload, Registro } from '@/types/registro'

export function useCriarRegistro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CriarRegistroPayload) => {
      const form = new FormData()
      form.append('empresa', payload.empresa)
      form.append('cnpj', payload.cnpj)
      form.append('local', payload.local)
      form.append('nomeFuncionario', payload.nomeFuncionario)
      form.append('dataPonto', payload.dataPonto)
      form.append('horarioPonto', payload.horarioPonto)
      form.append('imagem', payload.imagem)

      const { data } = await api.post<Registro>('/api/v1/registros', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registros'] })
    },
  })
}

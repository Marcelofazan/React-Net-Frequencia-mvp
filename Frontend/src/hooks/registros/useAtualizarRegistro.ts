import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { AtualizarRegistroPayload, Registro } from '@/types/registro'

export function useAtualizarRegistro() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: AtualizarRegistroPayload }) => {
      // Garantimos que a hora envie os segundos (ex: de "13:30" para "13:30:00")
      // O C# (TimeOnly/TimeSpan) rejeita a requisição se não houver segundos.
      const horarioComSegundos = payload.horarioPonto.length === 5 
        ? `${payload.horarioPonto}:00` 
        : payload.horarioPonto

      // Criamos o objeto misturando as chaves minúsculas e maiúsculas baseadas no seu cURL de teste
      const body = {
        empresa: payload.empresa,
        nomeFuncionario: payload.nomeFuncionario,
        Cnpj: payload.cnpj,
        Local: payload.local,
        dataPonto: payload.dataPonto, // Formato esperado: "YYYY-MM-DD"
        horarioPonto: horarioComSegundos
      }

      const { data } = await api.put<Registro>(`/api/v1/registros/${id}`, body)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registros'] })
    },
  })
}
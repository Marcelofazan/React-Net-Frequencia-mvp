import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { api } from '@/services/api'
import type { PaginaRegistros, Registro } from '@/types/registro'

interface Filtros {
  dataInicio?: string
  dataFim?: string
  empresa?: string
  pagina?: number
}

export function useRegistros(filtros: Filtros = {}) {
  return useQuery({
    queryKey: ['registros', filtros],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filtros.dataInicio) params.set('dataInicio', filtros.dataInicio)
      if (filtros.dataFim) params.set('dataFim', filtros.dataFim)
      if (filtros.empresa) params.set('empresa', filtros.empresa)
      params.set('pagina', String(filtros.pagina ?? 1))
      const { data } = await api.get<PaginaRegistros>(`/api/v1/registros?${params}`)
      return data
    },
    placeholderData: keepPreviousData,
  })
}

export function useRegistrosPorData(data: string) {
  return useQuery({
    queryKey: ['registros', 'data', data],
    queryFn: async () => {
      const { data: registros } = await api.get<Registro[]>(`/api/v1/registros/data/${data}`)
      return registros
    },
    enabled: !!data,
  })
}

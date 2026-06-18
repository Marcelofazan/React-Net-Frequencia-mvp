export interface Registro {
  id: string
  empresa: string
  cnpj: string
  local: string
  nomeFuncionario: string
  dataPonto: string
  horarioPonto: string
  imagemUrl: string
  status: 'Ativo' | 'Arquivado'
  criadoEm: string
  atualizadoEm: string | null
}

export interface PaginaRegistros {
  itens: Registro[]
  total: number
  pagina: number
  tamanhoPagina: number
  totalPaginas: number
}

export interface CriarRegistroPayload {
  empresa: string
  cnpj: string
  local: string
  nomeFuncionario: string
  dataPonto: string
  horarioPonto: string
  imagem: File
}

export interface AtualizarRegistroPayload {
  empresa: string
  cnpj: string
  local: string
  nomeFuncionario: string
  dataPonto: string
  horarioPonto: string
}

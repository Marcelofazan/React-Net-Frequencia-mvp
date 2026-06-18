import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { RegistrosFiltros } from '@/components/registros/RegistrosFiltros'
import { RegistrosTable } from '@/components/registros/RegistrosTable'
import { UploadSheet } from '@/components/upload/UploadSheet'
import { AuthPage } from '@/components/auth/AuthPage'
import { useRegistros } from '@/hooks/registros/useRegistros'
import { useAuth } from '@/contexts/AuthContext'

interface Filtros {
  dataInicio: string
  dataFim: string
  empresa: string
}

function saudacao(): string {
  const hora = new Date().getHours()
  if (hora < 12) return 'Bom dia'
  if (hora < 18) return 'Boa tarde'
  return 'Boa noite'
}

function Painel() {
  const { usuario } = useAuth()
  const [uploadAberto, setUploadAberto] = useState(false)
  const [filtros, setFiltros] = useState<Filtros>({ dataInicio: '', dataFim: '', empresa: '' })
  const [pagina, setPagina] = useState(1)

  const { data, isLoading } = useRegistros({
    dataInicio: filtros.dataInicio || undefined,
    dataFim: filtros.dataFim || undefined,
    empresa: filtros.empresa || undefined,
    pagina,
  })

  const registros = data?.itens ?? []
  const total = data?.total ?? 0
  const totalPaginas = data?.totalPaginas ?? 0

  if (totalPaginas > 0 && pagina > totalPaginas) {
    setPagina(totalPaginas)
  }

  const aoFiltrar = (novos: Filtros) => {
    setFiltros(novos)
    setPagina(1)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onUploadClick={() => setUploadAberto(true)} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {saudacao()},{' '}
              <span className="font-medium text-foreground">{usuario?.nome}</span>
            </p>
            <h2 className="text-lg font-semibold mt-0.5">Registros de ponto</h2>
            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? 'registro' : 'registros'} encontrados
            </p>
          </div>
        </div>

        <RegistrosFiltros onFiltrar={aoFiltrar} />
        <RegistrosTable
          registros={registros}
          isLoading={isLoading}
          pagina={pagina}
          totalPaginas={totalPaginas}
          onPaginaChange={setPagina}
        />
      </main>

      <UploadSheet aberto={uploadAberto} onFechar={() => setUploadAberto(false)} />
    </div>
  )
}

export default function App() {
  const { isAutenticado } = useAuth()

  if (!isAutenticado) return <AuthPage />

  return <Painel />
}

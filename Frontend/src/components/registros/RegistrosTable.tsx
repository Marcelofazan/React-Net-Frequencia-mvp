import { useState } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from '@tanstack/react-table'
import { ChevronLeft, ChevronRight, ExternalLink, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import type { Registro } from '@/types/registro'
import { useDeletarRegistro } from '@/hooks/registros/useDeletarRegistro'
import { EditarRegistroDialog } from '@/components/registros/EditarRegistroDialog'

function formatarData(data: string) {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

function formatarHorario(horario: string) {
  return horario.substring(0, 5)
}

interface RegistrosTableProps {
  registros: Registro[]
  isLoading: boolean
  pagina: number
  totalPaginas: number
  onPaginaChange: (pagina: number) => void
}

export function RegistrosTable({
  registros,
  isLoading,
  pagina,
  totalPaginas,
  onPaginaChange,
}: RegistrosTableProps) {
  const [editando, setEditando] = useState<Registro | null>(null)
  const deletar = useDeletarRegistro()

  const excluir = (registro: Registro) => {
    if (confirm('Deseja excluir este registro?')) {
      deletar.mutate(registro.id)
    }
  }

  const columns: ColumnDef<Registro>[] = [
    {
      accessorKey: 'dataPonto',
      header: 'Data',
      cell: ({ row }) => (
        <span className="font-medium tabular-nums">{formatarData(row.original.dataPonto)}</span>
      ),
    },
    {
      accessorKey: 'horarioPonto',
      header: 'Horário',
      cell: ({ row }) => (
        <span className="tabular-nums">{formatarHorario(row.original.horarioPonto)}</span>
      ),
    },
    {
      accessorKey: 'empresa',
      header: 'Empresa',
    },
    {
      accessorKey: 'cnpj',
      header: 'CNPJ',
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs tabular-nums">{row.original.cnpj}</span>
      ),
    },
    {
      accessorKey: 'local',
      header: 'Local',
    },
    {
      accessorKey: 'nomeFuncionario',
      header: 'Funcionário',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <Badge variant={row.original.status === 'Ativo' ? 'default' : 'secondary'}>
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: 'imagem',
      header: 'Comprovante',
      cell: ({ row }) => (
        <a
          href={row.original.imagemUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
        >
          Ver <ExternalLink className="size-3" />
        </a>
      ),
    },
    {
      id: 'acoes',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setEditando(row.original)}
            aria-label="Editar"
          >
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            className="text-destructive hover:text-destructive"
            onClick={() => excluir(row.original)}
            aria-label="Excluir"
          >
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: registros,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
        Carregando registros...
      </div>
    )
  }

  if (registros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-muted-foreground text-sm">Nenhum registro encontrado.</p>
        <p className="text-muted-foreground text-xs mt-1">
          Clique em &ldquo;Novo registro&rdquo; para adicionar o primeiro comprovante.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-3 sm:hidden">
        {registros.map((registro) => (
          <div key={registro.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium tabular-nums">
                  {formatarData(registro.dataPonto)} · {formatarHorario(registro.horarioPonto)}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">{registro.empresa}</p>
              </div>
              <Badge variant={registro.status === 'Ativo' ? 'default' : 'secondary'}>
                {registro.status}
              </Badge>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              <div className="flex flex-col">
                <dt className="text-xs text-muted-foreground">CNPJ</dt>
                <dd className="tabular-nums">{registro.cnpj}</dd>
              </div>
              <div className="flex flex-col">
                <dt className="text-xs text-muted-foreground">Funcionário</dt>
                <dd>{registro.nomeFuncionario}</dd>
              </div>
              <div className="col-span-2 flex flex-col">
                <dt className="text-xs text-muted-foreground">Local</dt>
                <dd>{registro.local || '—'}</dd>
              </div>
            </dl>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <a
                href={registro.imagemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline text-sm"
              >
                Ver comprovante <ExternalLink className="size-3" />
              </a>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setEditando(registro)}
                  aria-label="Editar"
                >
                  <Pencil />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => excluir(registro)}
                  aria-label="Excluir"
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:block rounded-lg border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-muted/50">
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPaginas > 1 && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-muted-foreground">
            Página {pagina} de {totalPaginas}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={pagina <= 1}
              onClick={() => onPaginaChange(pagina - 1)}
            >
              <ChevronLeft />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={pagina >= totalPaginas}
              onClick={() => onPaginaChange(pagina + 1)}
            >
              Próxima
              <ChevronRight />
            </Button>
          </div>
        </div>
      )}

      {editando && (
        <EditarRegistroDialog
          registro={editando}
          onClose={() => setEditando(null)}
        />
      )}
    </>
  )
}

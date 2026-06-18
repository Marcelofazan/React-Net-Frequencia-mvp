import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FiltrosState {
  dataInicio: string
  dataFim: string
  empresa: string
}

interface RegistrosFiltrosProps {
  onFiltrar: (filtros: FiltrosState) => void
}

export function RegistrosFiltros({ onFiltrar }: RegistrosFiltrosProps) {
  const [filtros, setFiltros] = useState<FiltrosState>({
    dataInicio: '',
    dataFim: '',
    empresa: '',
  })

  const handleChange = (campo: keyof FiltrosState, valor: string) => {
    const novo = { ...filtros, [campo]: valor }
    setFiltros(novo)
    onFiltrar(novo)
  }

  const limpar = () => {
    const vazio = { dataInicio: '', dataFim: '', empresa: '' }
    setFiltros(vazio)
    onFiltrar(vazio)
  }

  const temFiltros = filtros.dataInicio || filtros.dataFim || filtros.empresa

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1.5 sm:flex-1">
        <Label htmlFor="dataInicio">Data início</Label>
        <Input
          id="dataInicio"
          type="date"
          value={filtros.dataInicio}
          onChange={(e) => handleChange('dataInicio', e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 sm:flex-1">
        <Label htmlFor="dataFim">Data fim</Label>
        <Input
          id="dataFim"
          type="date"
          value={filtros.dataFim}
          onChange={(e) => handleChange('dataFim', e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-1.5 sm:flex-1">
        <Label htmlFor="empresa">Empresa</Label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            id="empresa"
            placeholder="Filtrar por empresa..."
            value={filtros.empresa}
            onChange={(e) => handleChange('empresa', e.target.value)}
            className="w-full pl-8"
          />
        </div>
      </div>
      {temFiltros && (
        <Button variant="ghost" size="sm" onClick={limpar} className="gap-1.5 sm:self-end">
          <X />
          Limpar
        </Button>
      )}
    </div>
  )
}

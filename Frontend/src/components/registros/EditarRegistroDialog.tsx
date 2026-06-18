import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAtualizarRegistro } from '@/hooks/registros/useAtualizarRegistro'
import type { Registro } from '@/types/registro'

const schema = z.object({
  empresa: z.string().min(1, 'Obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  local: z.string(),
  nomeFuncionario: z.string().min(1, 'Obrigatório'),
  dataPonto: z.string().min(1, 'Obrigatório'),
  horarioPonto: z.string().min(1, 'Obrigatório'),
})

type FormData = z.infer<typeof schema>

interface EditarRegistroDialogProps {
  registro: Registro
  onClose: () => void
}

export function EditarRegistroDialog({ registro, onClose }: EditarRegistroDialogProps) {
  const atualizar = useAtualizarRegistro()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      empresa: registro.empresa,
      cnpj: registro.cnpj,
      local: registro.local,
      nomeFuncionario: registro.nomeFuncionario,
      dataPonto: registro.dataPonto,
      horarioPonto: registro.horarioPonto.substring(0, 5),
    },
  })

  const onSubmit = (data: FormData) => {
    atualizar.mutate(
      { id: registro.id, payload: data },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar registro</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Empresa</Label>
              <Input {...register('empresa')} />
              {errors.empresa && <span className="text-xs text-destructive">{errors.empresa.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>CNPJ</Label>
              <Input {...register('cnpj')} />
              {errors.cnpj && <span className="text-xs text-destructive">{errors.cnpj.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Local</Label>
              <Input {...register('local')} />
            </div>
            <div className="col-span-2 flex flex-col gap-1.5">
              <Label>Funcionário</Label>
              <Input {...register('nomeFuncionario')} />
              {errors.nomeFuncionario && <span className="text-xs text-destructive">{errors.nomeFuncionario.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Data</Label>
              <Input type="date" {...register('dataPonto')} />
              {errors.dataPonto && <span className="text-xs text-destructive">{errors.dataPonto.message}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Horário</Label>
              <Input type="time" {...register('horarioPonto')} />
              {errors.horarioPonto && <span className="text-xs text-destructive">{errors.horarioPonto.message}</span>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" disabled={atualizar.isPending}>
              {atualizar.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

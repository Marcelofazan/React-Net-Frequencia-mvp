import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ImagePlus, X } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCriarRegistro } from '@/hooks/registros/useCriarRegistro'

const schema = z.object({
  empresa: z.string().min(1, 'Obrigatório'),
  cnpj: z.string().min(14, 'CNPJ inválido'),
  local: z.string(),
  nomeFuncionario: z.string().min(1, 'Obrigatório'),
  dataPonto: z.string().min(1, 'Obrigatório'),
  horarioPonto: z.string().min(1, 'Obrigatório'),
})

type FormData = z.infer<typeof schema>

const LEMBRADOS_KEY = 'controlepresenca.ultimoRegistro'
type Lembrados = Pick<FormData, 'empresa' | 'cnpj' | 'local' | 'nomeFuncionario'>

function lerLembrados(): Partial<Lembrados> {
  try {
    return JSON.parse(localStorage.getItem(LEMBRADOS_KEY) ?? '{}') as Partial<Lembrados>
  } catch {
    return {}
  }
}

function salvarLembrados(dados: Lembrados) {
  localStorage.setItem(LEMBRADOS_KEY, JSON.stringify(dados))
}

function valoresIniciais(): FormData {
  return {
    empresa: '',
    cnpj: '',
    local: '',
    nomeFuncionario: '',
    ...lerLembrados(),
    dataPonto: '',
    horarioPonto: '',
  }
}

interface UploadSheetProps {
  aberto: boolean
  onFechar: () => void
}

export function UploadSheet({ aberto, onFechar }: UploadSheetProps) {
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [errImagem, setErrImagem] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const criar = useCriarRegistro()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: valoresIniciais(),
  })

  const handleArquivo = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrImagem('O arquivo deve ser uma imagem.')
      return
    }
    setErrImagem('')
    setArquivo(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleArquivo(file)
  }

  const limpar = () => {
    setArquivo(null)
    setPreview(null)
    setErrImagem('')
    reset(valoresIniciais())
    onFechar()
  }

  const onSubmit = (data: FormData) => {
    if (!arquivo) {
      setErrImagem('Selecione uma imagem do comprovante.')
      return
    }
    criar.mutate(
      { ...data, imagem: arquivo },
      {
        onSuccess: () => {
          salvarLembrados({
            empresa: data.empresa,
            cnpj: data.cnpj,
            local: data.local,
            nomeFuncionario: data.nomeFuncionario,
          })
          limpar()
        },
      },
    )
  }

  return (
    <Sheet open={aberto} onOpenChange={(open) => !open && limpar()}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Novo registro de ponto</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Image upload */}
            <div className="flex flex-col gap-1.5 lg:w-64 shrink-0">
              <Label>Comprovante</Label>
              <div
                className={`relative rounded-lg border-2 border-dashed transition-colors cursor-pointer
                  ${errImagem ? 'border-destructive' : 'border-border hover:border-primary/50'}
                  ${preview ? 'border-solid' : ''}`}
                style={{ aspectRatio: '3/4' }}
                onClick={() => inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 rounded-full bg-background/80 p-1 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation()
                        setArquivo(null)
                        setPreview(null)
                      }}
                    >
                      <X className="size-3.5" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 p-4 text-center">
                    <ImagePlus className="size-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Clique ou arraste a imagem aqui
                    </p>
                  </div>
                )}
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleArquivo(e.target.files[0])}
              />
              {errImagem && <span className="text-xs text-destructive">{errImagem}</span>}
            </div>

            {/* Fields */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <Label>Empresa</Label>
                <Input {...register('empresa')} placeholder="Nome da empresa" />
                {errors.empresa && <span className="text-xs text-destructive">{errors.empresa.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>CNPJ</Label>
                <Input {...register('cnpj')} placeholder="00.000.000/0000-00" />
                {errors.cnpj && <span className="text-xs text-destructive">{errors.cnpj.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Local</Label>
                <Input {...register('local')} placeholder="Local de trabalho" />
              </div>
              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <Label>Funcionário</Label>
                <Input {...register('nomeFuncionario')} placeholder="Seu nome completo" />
                {errors.nomeFuncionario && <span className="text-xs text-destructive">{errors.nomeFuncionario.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Data do ponto</Label>
                <Input type="date" {...register('dataPonto')} />
                {errors.dataPonto && <span className="text-xs text-destructive">{errors.dataPonto.message}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Horário</Label>
                <Input type="time" {...register('horarioPonto')} />
                {errors.horarioPonto && <span className="text-xs text-destructive">{errors.horarioPonto.message}</span>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button type="button" variant="outline" onClick={limpar}>
              Cancelar
            </Button>
            <Button type="submit" disabled={criar.isPending}>
              {criar.isPending ? 'Salvando...' : 'Salvar registro'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

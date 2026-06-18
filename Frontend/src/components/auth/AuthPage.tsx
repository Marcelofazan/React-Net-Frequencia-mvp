import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AxiosError } from 'axios'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'

const schema = z.object({
  nome: z.string().optional(),
  email: z.string().min(1, 'Obrigatório').email('E-mail inválido'),
  senha: z.string().min(8, 'Mínimo de 8 caracteres'),
})

type FormData = z.infer<typeof schema>

export function AuthPage() {
  const { login, register: registrar } = useAuth()
  const [modo, setModo] = useState<'login' | 'cadastro'>('login')
  const [erroApi, setErroApi] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setErroApi('')
    try {
      if (modo === 'login') {
        await login({ email: data.email, senha: data.senha })
      } else {
        if (!data.nome || data.nome.trim().length === 0) {
          setErroApi('Informe seu nome.')
          return
        }
        await registrar({ nome: data.nome, email: data.email, senha: data.senha })
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>
      setErroApi(axiosErr.response?.data?.message ?? 'Não foi possível concluir. Tente novamente.')
    }
  }

  const trocarModo = () => {
    setErroApi('')
    setModo((m) => (m === 'login' ? 'cadastro' : 'login'))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <img src="/icons/icon-192.png" alt="Controle Presença" className="mx-auto mb-2 h-10 w-10 rounded-md" />
          <CardTitle className="text-lg">
            {modo === 'login' ? 'Entrar no Controle Presença' : 'Criar conta'}
          </CardTitle>
          <CardDescription>
            {modo === 'login'
              ? 'Acesse seus registros de ponto'
              : 'Cadastre-se para gerenciar seus comprovantes'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {modo === 'cadastro' && (
              <div className="flex flex-col gap-1.5">
                <Label>Nome</Label>
                <Input {...register('nome')} placeholder="Seu nome completo" autoComplete="name" />
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label>E-mail</Label>
              <Input type="email" {...register('email')} placeholder="voce@exemplo.com" autoComplete="email" />
              {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Senha</Label>
              <Input
                type="password"
                {...register('senha')}
                placeholder="••••••••"
                autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
              />
              {errors.senha && <span className="text-xs text-destructive">{errors.senha.message}</span>}
            </div>

            {erroApi && <span className="text-sm text-destructive">{erroApi}</span>}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting
                ? 'Aguarde...'
                : modo === 'login' ? 'Entrar' : 'Cadastrar'}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {modo === 'login' ? 'Não tem conta?' : 'Já tem conta?'}{' '}
            <button type="button" onClick={trocarModo} className="font-medium text-primary hover:underline">
              {modo === 'login' ? 'Cadastre-se' : 'Entrar'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

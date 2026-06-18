import { createContext, useContext, useState, type ReactNode } from 'react'
import { api, TOKEN_KEY, USUARIO_KEY } from '@/services/api'
import type { AuthResponse, LoginPayload, RegisterPayload, Usuario } from '@/types/auth'

interface AuthContextValue {
  usuario: Usuario | null
  isAutenticado: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function lerUsuarioSalvo(): Usuario | null {
  const bruto = localStorage.getItem(USUARIO_KEY)
  if (!bruto) return null
  try {
    return JSON.parse(bruto) as Usuario
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(lerUsuarioSalvo)

  function persistir({ token, usuario }: AuthResponse) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario))
    setUsuario(usuario)
  }

  async function login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>('/api/v1/auth/login', payload)
    persistir(data)
  }

  async function register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>('/api/v1/auth/register', payload)
    persistir(data)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USUARIO_KEY)
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, isAutenticado: usuario !== null, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}

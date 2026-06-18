export interface Usuario {
  id: string
  nome: string
  email: string
}

export interface AuthResponse {
  token: string
  usuario: Usuario
}

export interface LoginPayload {
  email: string
  senha: string
}

export interface RegisterPayload {
  nome: string
  email: string
  senha: string
}

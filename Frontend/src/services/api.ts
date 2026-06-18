import axios from 'axios'

const TOKEN_KEY = 'controlepresenca.token'
const USUARIO_KEY = 'controlepresenca.usuario'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5283',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const url: string = error.config?.url ?? ''
    const ehRotaAuth = url.includes('/auth/')

    if (status === 401 && !ehRotaAuth && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USUARIO_KEY)
      window.location.reload()
    }

    return Promise.reject(error)
  },
)

export { api, TOKEN_KEY, USUARIO_KEY }

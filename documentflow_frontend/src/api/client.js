import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT || 10000)
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'auth_token'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      window.location.href = '/login'
    }
    if (error.response?.status === 403) {
      window.location.href = '/unauthorized'
    }
    return Promise.reject(error)
  }
)

export default apiClient


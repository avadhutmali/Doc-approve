import apiClient from './client'

export const authApi = {
  register: (userName, password, role = 'USER') =>
    apiClient.post('/auth/register', { userName, password, role }),

  login: (userName, password) =>
    apiClient.post('/auth/login', { userName, password })
}


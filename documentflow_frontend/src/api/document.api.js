import apiClient from './client'

export const documentApi = {
  upload: (title, description, fileUrl, userName) =>
    apiClient.post('/api/documents/upload', { title, description, fileUrl, userName }),

  getByUser: userName =>
    apiClient.get(`/api/documents/username/${userName}`),

  getPending: () =>
    apiClient.get('/api/documents/pending'),

  getById: id =>
    apiClient.get(`/api/documents/${id}`),

  delete: id =>
    apiClient.delete(`/api/documents/${id}`)
}


import apiClient from './client'

export const reviewApi = {
  approve: (docId, data) =>
    apiClient.post(`/api/reviews/approve/${docId}`, data),

  reject: (docId, data) =>
    apiClient.post(`/api/reviews/reject/${docId}`, data),

  getHistory: docId =>
    apiClient.get(`/api/reviews/history/${docId}`)
}


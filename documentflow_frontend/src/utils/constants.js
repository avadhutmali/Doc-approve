export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const ROLES = {
  USER: 'USER',
  REVIEWER: 'REVIEWER',
  ADMIN: 'ADMIN'
}

export const DOCUMENT_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
}

export const REVIEW_DECISION = {
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED'
}


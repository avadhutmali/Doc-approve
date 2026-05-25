import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { documentApi } from '../api/document.api'
import { reviewApi } from '../api/review.api'
import Toast from './common/Toast'
import Spinner from './common/Spinner'
import Card from './common/Card'
import Button from './common/Button'

export default function ReviewerDashboard() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const fetchPendingDocuments = async () => {
      try {
        setLoading(true)
        const response = await documentApi.getPending()
        setDocuments(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to load pending documents'
        setToast({ type: 'error', message })
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }

    fetchPendingDocuments()
  }, [])

  const handleDecision = async decision => {
    if (!comment.trim()) {
      setToast({ type: 'error', message: 'Please add a comment' })
      return
    }

    setSubmitting(true)
    try {
      const payload = { userName: user.username, comment }
      if (decision === 'approve') {
        await reviewApi.approve(selectedDoc.documentId, payload)
      } else {
        await reviewApi.reject(selectedDoc.documentId, payload)
      }
      setToast({ type: 'success', message: `Document ${decision}d.` })
      setSelectedDoc(null)
      setComment('')
      const response = await documentApi.getPending()
      setDocuments(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      const message = error.response?.data?.message || `Failed to ${decision} document`
      setToast({ type: 'error', message })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Pending Reviews</h2>

        {documents.length === 0 ? (
          <Card>
            <div className="text-center py-8 text-gray-500">No pending documents to review</div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {documents.map(doc => (
              <Card key={doc.documentId}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{doc.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{doc.description}</p>
                  </div>
                  <Button onClick={() => setSelectedDoc(doc)} variant="primary">
                    Review
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {selectedDoc && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedDoc.title}</h3>
              <p className="text-gray-600 mb-4">{selectedDoc.description}</p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={comment}
                  onChange={event => setComment(event.target.value)}
                  placeholder="Add your review comment"
                  rows={4}
                  disabled={submitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="success"
                  fullWidth
                  onClick={() => handleDecision('approve')}
                  loading={submitting}
                  disabled={submitting}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  fullWidth
                  onClick={() => handleDecision('reject')}
                  loading={submitting}
                  disabled={submitting}
                >
                  Reject
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    setSelectedDoc(null)
                    setComment('')
                  }}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </>
  )
}

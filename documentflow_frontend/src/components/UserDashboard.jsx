import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { documentApi } from '../api/document.api'
import Toast from './common/Toast'
import Spinner from './common/Spinner'
import Card from './common/Card'
import Button from './common/Button'
import { DOCUMENT_STATUS } from '../utils/constants'

export default function UserDashboard() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true)
        const response = await documentApi.getByUser(user.username)
        setDocuments(Array.isArray(response.data) ? response.data : [])
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to load documents'
        setToast({ type: 'error', message })
        setDocuments([])
      } finally {
        setLoading(false)
      }
    }

    if (user?.username) {
      fetchDocuments()
    }
  }, [user])

  const handleDelete = async docId => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      await documentApi.delete(docId)
      setDocuments(prev => prev.filter(doc => doc.documentId !== docId))
      setToast({ type: 'success', message: 'Document deleted' })
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to delete document' })
    }
  }

  const getStatusColor = status => {
    switch (status) {
      case DOCUMENT_STATUS.PENDING:
        return 'bg-yellow-100 text-yellow-800'
      case DOCUMENT_STATUS.APPROVED:
        return 'bg-green-100 text-green-800'
      case DOCUMENT_STATUS.REJECTED:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <Spinner />

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Your Documents</h2>
          <Button onClick={() => navigate('/create-document')}>+ Upload New</Button>
        </div>

        {documents.length === 0 ? (
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No documents uploaded yet</p>
              <Button onClick={() => navigate('/create-document')}>Upload Your First Document</Button>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {documents.map(doc => (
              <Card key={doc.documentId}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{doc.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{doc.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/document/${doc.documentId}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(doc.documentId)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

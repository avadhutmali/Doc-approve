import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { documentApi } from '../api/document.api'
import { validateDocumentForm } from '../utils/validators'
import { useAuth } from '../hooks/useAuth'
import Toast from '../components/common/Toast'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import Layout from '../components/layout/Layout'

export default function CreateDocument() {
  const [formData, setFormData] = useState({ title: '', description: '', fileUrl: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const formErrors = validateDocumentForm(formData.title, formData.description, formData.fileUrl)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)
    try {
      await documentApi.upload(
        formData.title,
        formData.description,
        formData.fileUrl,
        user.username
      )
      setToast({ type: 'success', message: 'Document uploaded successfully.' })
      setTimeout(() => navigate('/dashboard'), 1200)
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to upload document'
      setToast({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-2xl">
        <Card title="Upload New Document">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Document Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter document title"
              error={errors.title}
              disabled={loading}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your document"
                rows={4}
                disabled={loading}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <Input
              label="File URL"
              name="fileUrl"
              value={formData.fileUrl}
              onChange={handleChange}
              placeholder="https://example.com/document.pdf"
              error={errors.fileUrl}
              disabled={loading}
              required
            />

            <div className="flex gap-4">
              <Button type="submit" fullWidth loading={loading} disabled={loading}>
                {loading ? 'Uploading...' : 'Upload Document'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  )
}

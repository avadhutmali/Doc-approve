import { useState, useEffect } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'

export default function CreateDocument() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [username, setUsername] = useState('')
  const [status, setStatus] = useState(null)
  const navigate = useNavigate()

  // extract username from JWT
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')
    const { sub } = jwt_decode(token)
    setUsername(sub)
  }, [navigate])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await axios.post(
        'http://localhost:8081/api/documents/upload',
        { title, description, fileUrl, userName: username },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      )
      setStatus({ type: 'success', message: 'Document uploaded!' })
      // optionally redirect back to dashboard after a delay
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data || err.message })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl">Upload New Document</h2>

        {status && (
          <div
            className={`p-2 rounded ${
              status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {status.message}
          </div>
        )}

        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded"
          placeholder="File URL"
          value={fileUrl}
          onChange={e => setFileUrl(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Upload
        </button>

        <p className="text-center">
          <Link className="text-blue-500" to="/dashboard">&larr; Back to Dashboard</Link>
        </p>
      </form>
    </div>
  )
}

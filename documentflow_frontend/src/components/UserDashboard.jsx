import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

export default function UserDashboard() {
  const [docs, setDocs] = useState([]) // Always an array
  const [userName, setUserName] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const { sub } = jwt_decode(token)
      setUserName(sub)

      axios.get(`http://localhost:8081/api/documents/username/${sub}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          const result = Array.isArray(res.data) ? res.data : []
          setDocs(result)
        })
        .catch(err => {
          console.error('Error fetching documents:', err)
          setError('Failed to load documents.')
        })
        .finally(() => setLoading(false))

    } catch (err) {
      console.error('Invalid token:', err)
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>
      <p className="mb-4">Logged in as: <span className="font-medium">{userName}</span></p>

      {loading ? (
        <p className="text-gray-500">Loading documents...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : Array.isArray(docs) && docs.length > 0 ? (
        <ul className="space-y-2">
          {docs.map(doc => (
            <li
              key={doc.documentId}
              className="p-2 border rounded shadow-sm flex justify-between items-center"
            >
              <span className="font-medium">{doc.title}</span>
              <span className="text-sm italic">{doc.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No documents uploaded yet.</p>
      )}
    </div>
  )
}

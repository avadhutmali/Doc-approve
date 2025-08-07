import { useEffect, useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate, Link } from 'react-router-dom'

export default function ReviewerDashboard() {
  const [pending, setPending] = useState([])
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

  useEffect(() => {
      const token = localStorage.getItem('token')
      if (!token) return navigate('/login')
      const { sub } = jwt_decode(token)
      setUsername(sub)
    }, [navigate])

  useEffect(() => {
    axios.get('http://localhost:8081/api/documents/pending', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setPending(res.data))
  }, [])

  const handleDecision = (id, decision) => {
    axios.post(`http://localhost:8081/api/reviews/${decision.toLowerCase()}/${id}`,
      { userName:username,comment:"testing" },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    ).then(() => setPending(p => p.filter(d => d.documentId !== id)))
  }

  return (
    <div>
      <h2 className="text-xl mb-4">Pending Reviews</h2>
      <ul>
        {pending.map(d => (
          <li key={d.documentId} className="mb-2">
            {d.title}
            <button onClick={() => handleDecision(d.documentId, 'Approve')} className="ml-2 px-2 bg-green-600 text-white rounded">Approve</button>
            <button onClick={() => handleDecision(d.documentId, 'Reject')} className="ml-2 px-2 bg-red-600 text-white rounded">Reject</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

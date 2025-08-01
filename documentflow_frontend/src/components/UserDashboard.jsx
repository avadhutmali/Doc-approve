import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserDashboard() {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/api/users/docs', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setDocs(res.data))
  }, [])

  return (
    <div>
      <h2 className="text-xl mb-4">Your Documents</h2>
      <ul>
        {docs.map(d => (
          <li key={d.documentId}>{d.title} - {d.status}</li>
        ))}
      </ul>
    </div>
  )
}

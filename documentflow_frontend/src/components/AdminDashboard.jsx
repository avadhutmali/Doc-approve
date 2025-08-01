import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUsers(res.data))
  }, [])

  const assignRole = (id, role) => {
    axios.post('http://localhost:8081/api/admin/assign-role', 
      { userId: id, role },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    ).then(() => {
      setUsers(u => u.map(user => user.userId === id ? { ...user, role } : user))
    })
  }

  return (
    <div>
      <h2 className="text-xl mb-4">User Management</h2>
      <ul>
        {users.map(u => (
          <li key={u.userId} className="mb-2">
            {u.userName} - {u.role}
            <select value={u.role} onChange={e => assignRole(u.userId, e.target.value)} className="ml-2 border p-1">
              <option>USER</option>
              <option>REVIEWER</option>
              <option>ADMIN</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}

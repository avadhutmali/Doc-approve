import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    const res = await axios.post('http://localhost:8081/auth/login', { userName: username, password })
    localStorage.setItem('token', res.data.token)
    navigate('/dashboard')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Login</h2>
        <input 
          className="w-full p-2 mb-3 border rounded" 
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          type="password"
          className="w-full p-2 mb-4 border rounded" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        <p className="mt-4 text-center">
          <Link className="text-blue-500" to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('USER')         // <-- default role
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    // include role in the registration payload
    await axios.post(
      'http://localhost:8081/auth/register',
      { userName: username, password, role }
    )
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-4">Register</h2>

        <input 
          className="w-full p-2 mb-3 border rounded" 
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input 
          type="password"
          className="w-full p-2 mb-3 border rounded" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Role selector */}
        <label className="block mb-3">
          <span className="text-gray-700">Role</span>
          <select
            className="w-full p-2 border rounded mt-1"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="USER">User</option>
            <option value="REVIEWER">Reviewer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>

        <button className="w-full bg-green-600 text-white py-2 rounded mb-4">
          Register
        </button>

        <p className="text-center">
          Already have an account?{' '}
          <Link className="text-blue-500" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}

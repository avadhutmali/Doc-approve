import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authApi } from '../api/auth.api'
import { useAuth } from '../hooks/useAuth'
import { validateLoginForm } from '../utils/validators'
import Toast from '../components/common/Toast'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = event => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()

    const formErrors = validateLoginForm(formData.username, formData.password)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)
    try {
      const response = await authApi.login(formData.username, formData.password)
      login(response.data.token)
      setToast({ type: 'success', message: 'Login successful. Redirecting...' })
      setTimeout(() => navigate('/dashboard'), 800)
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid username or password'
      setToast({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <Card className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">DocApprove</h1>
          <p className="text-gray-600">Document Approval System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            error={errors.username}
            disabled={loading}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            disabled={loading}
            required
          />

          <Button type="submit" fullWidth loading={loading} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Do not have an account?{' '}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authApi } from '../api/auth.api'
import { validateRegisterForm } from '../utils/validators'
import Toast from '../components/common/Toast'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import { ROLES } from '../utils/constants'

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: ROLES.USER
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
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

    const formErrors = validateRegisterForm(
      formData.username,
      formData.password,
      formData.confirmPassword
    )
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)
    try {
      await authApi.register(formData.username, formData.password, formData.role)
      setToast({ type: 'success', message: 'Registration successful. Redirecting to login...' })
      setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed. Try a different username.'
      setToast({ type: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-600">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <Card className="w-full max-w-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join DocApprove</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Choose a username (3-20 chars)"
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
            placeholder="At least 6 characters"
            error={errors.password}
            disabled={loading}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
            disabled={loading}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={ROLES.USER}>User (Upload Documents)</option>
              <option value={ROLES.REVIEWER}>Reviewer (Approve/Reject)</option>
            </select>
          </div>

          <Button type="submit" fullWidth loading={loading} disabled={loading} variant="success">
            {loading ? 'Creating Account...' : 'Register'}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            Login here
          </Link>
        </p>
      </Card>
    </div>
  )
}

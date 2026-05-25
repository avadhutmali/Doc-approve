import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Spinner from './common/Spinner'

export default function ProtectedRoute({ children, requiredRoles }) {
  const { user, loading } = useAuth()

  if (loading) return <Spinner fullScreen />

  if (!user) return <Navigate to="/login" replace />

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}


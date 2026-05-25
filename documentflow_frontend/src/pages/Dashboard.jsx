import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Layout from '../components/layout/Layout'
import UserDashboard from '../components/UserDashboard'
import ReviewerDashboard from '../components/ReviewerDashboard'
import AdminDashboard from '../components/AdminDashboard'
import Spinner from '../components/common/Spinner'
import { ROLES } from '../utils/constants'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!loading) {
      setReady(true)
    }
  }, [loading])

  if (loading) return <Spinner fullScreen />

  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome, <span className="font-semibold">{user?.username}</span>
          </p>
        </div>

        {ready && (
          <>
            {user?.role === ROLES.USER && <UserDashboard />}
            {user?.role === ROLES.REVIEWER && <ReviewerDashboard />}
            {user?.role === ROLES.ADMIN && <AdminDashboard />}
          </>
        )}
      </div>
    </Layout>
  )
}

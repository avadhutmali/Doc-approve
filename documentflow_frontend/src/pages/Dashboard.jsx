import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import Layout from '../components/Layout'
import UserDashboard from '../components/UserDashboard'
import ReviewerDashboard from '../components/ReviewerDashboard'
import AdminDashboard from '../components/AdminDashboard'

export default function Dashboard() {
  const [role, setRole] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decoded = jwt_decode(token)
      setRole(decoded.role)
    }
  }, [])

  return (
    <Layout>
      {role === 'USER' && <UserDashboard />}
      {role === 'REVIEWER' && <ReviewerDashboard />}
      {/* {role === 'ADMIN' && <AdminDashboard />} */}
      {!role && <p>Loading...</p>}
    </Layout>
  )
}

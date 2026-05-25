import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
        <p className="text-xl text-gray-600 mb-8">You do not have permission to access this page</p>
        <Link to="/dashboard">
          <Button>Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
}


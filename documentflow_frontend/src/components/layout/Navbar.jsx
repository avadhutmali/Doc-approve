import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'
import Toast from '../common/Toast'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [toast, setToast] = useState(null)

  const handleLogout = () => {
    logout()
    setToast({ type: 'success', message: 'Logged out successfully' })
    setTimeout(() => navigate('/login'), 800)
  }

  return (
    <>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1
              className="text-2xl font-bold cursor-pointer hover:text-blue-200"
              onClick={() => navigate('/dashboard')}
            >
              DocApprove
            </h1>

            <div className="hidden md:flex gap-6">
              <button onClick={() => navigate('/dashboard')} className="hover:text-blue-200 transition">
                Dashboard
              </button>
              {user?.role !== 'REVIEWER' && (
                <button onClick={() => navigate('/create-document')} className="hover:text-blue-200 transition">
                  Upload Document
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">{user?.role}</span>
            <span className="text-sm">{user?.username}</span>
            <Button variant="secondary" onClick={() => setConfirmLogout(true)}>
              Logout
            </Button>
          </div>
        </div>

        {confirmLogout && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex gap-4">
                <Button variant="danger" onClick={handleLogout}>
                  Yes, Logout
                </Button>
                <Button variant="secondary" onClick={() => setConfirmLogout(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}


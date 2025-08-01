import { Link } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl mb-6">DocFlow</h1>
        <ul>
          <li className="mb-2"><Link to="/dashboard">Dashboard</Link></li>
          <li className="mb-2"><Link to="/create-document">Upload Document</Link></li>
          <li><button onClick={() => { localStorage.removeItem('token'); window.location='/login'; }}>Logout</button></li>
        </ul>
      </nav>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  )
}

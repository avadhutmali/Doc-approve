import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full p-6">{children}</main>
    </div>
  )
}


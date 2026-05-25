import { useEffect } from 'react'

export default function Toast({ type, message, onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'

  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed top-4 right-4 max-w-sm z-50`}>
      <p className="font-medium">{message}</p>
    </div>
  )
}


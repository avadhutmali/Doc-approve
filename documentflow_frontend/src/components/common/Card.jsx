export default function Card({ title, children, className = '' }) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow ${className}`}>
      {title && <h3 className="text-lg font-bold mb-4 text-gray-800">{title}</h3>}
      {children}
    </div>
  )
}


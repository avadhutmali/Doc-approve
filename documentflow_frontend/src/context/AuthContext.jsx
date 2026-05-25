import { createContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'auth_token'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            username: decoded.sub,
            role: decoded.role,
            exp: decoded.exp
          })
        } else {
          localStorage.removeItem(TOKEN_KEY)
        }
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = token => {
    localStorage.setItem(TOKEN_KEY, token)
    const decoded = jwtDecode(token)
    setUser({
      username: decoded.sub,
      role: decoded.role,
      exp: decoded.exp
    })
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


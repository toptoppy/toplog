'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from './types'
import { api, clearToken, getToken, setToken } from './api'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function loadUser() {
      const token = getToken()
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const u = await api.auth.me()
        setUser(u)
      } catch (err) {
        console.error('Session expired or invalid', err)
        clearToken()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = (token: string, u: User) => {
    setToken(token)
    setUser(u)
    router.push('/blogs')
  }

  const logout = () => {
    clearToken()
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

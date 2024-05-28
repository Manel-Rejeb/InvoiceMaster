import { createContext, type JSX, type ReactNode, useContext, useLayoutEffect, useState } from 'react'
import { UserStore, userStore } from '@/providers/store/user-store'
import { useRouter } from 'next/router'
import { query } from '@/util/query'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

interface ComponentProps {
  children: ReactNode
}

export default function UserProvider({ children }: ComponentProps): JSX.Element {
  const { push, pathname } = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStore.isAuthenticated)
  const [user, setUser] = useState<AuthUserProfileType>(userStore.user)

  const login = async (data: LoginFormType) =>
    await query.post('/auth/login', { ...data }).then((res) => {
      setCookie('token', res.data)
      setUser(res.data.user)
      setIsAuthenticated(true)
      push('/dashboard')
    })

  const logout = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        deleteCookie('token')
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  useLayoutEffect(() => {
    if (getCookie('token')) {
      setIsAuthenticated(true)
      if (pathname === '/auth') push('/dashboard')
    } else {
      setIsAuthenticated(false)
      push('/auth')
    }
  }, [])

  return <UserContext.Provider value={{ isAuthenticated, user, login, logout }}>{children}</UserContext.Provider>
}

const UserContext = createContext<UserStore>(userStore)
export const useAuth = () => useContext(UserContext)

import { createContext, type JSX, type ReactNode, useContext, useEffect, useState, useLayoutEffect } from 'react'

import { query } from '@/util/query'
import { useRouter } from 'next/router'
import { UserStore, userStore } from '@/providers/store/user.store'

import { GET } from '@/actions/user-actions'
import { Spin } from 'antd/lib'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'

import { useQuery } from '@tanstack/react-query'

interface ComponentProps {
  children: ReactNode
}

export default function UserProvider({ children }: ComponentProps): JSX.Element {
  const { push, pathname } = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: GET,
    staleTime: 0,
  })

  const [isUserLoading, setUserLoading] = useState<boolean>(true)
  const [user, setUser] = useState<AuthUserProfileType>(userStore.user)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStore.isAuthenticated)

  const login = async (data: LoginFormType) =>
    await query.post('/auth/login', { ...data }).then((res) => {
      setCookie('token', res.data.access_token)
      setIsAuthenticated(true)
      push('/dashboard')
    })

  const logout = (): void => {
    deleteCookie('token')
    setIsAuthenticated(false)
    push('/auth')
  }

  const getCurrentUser = async () => {
    setUserLoading(true)
    await query
      .get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
      })
      .then((res) => {
        setUser(res.data)
        setIsAuthenticated(false)
        setUserLoading(false)
      })
      .catch(() => {
        setUser(userStore.user)
        setIsAuthenticated(userStore.isAuthenticated)
        push('/auth').then(() => setUserLoading(false))
      })
  }

  useEffect(() => {
    getCurrentUser()
  }, [isAuthenticated])

  useLayoutEffect(() => {
    if (getCookie('token')) {
      push('/dashboard')
    } else {
      push('/auth')
    }
  }, [])

  if (isUserLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Spin />
      </div>
    )
  }

  return <UserContext.Provider value={{ data, isLoading, isAuthenticated, user, login, logout }}>{children}</UserContext.Provider>
}

const UserContext = createContext<UserStore>(userStore)
export const disptachUser = () => useContext(UserContext)

export const useAuth = () => useContext(UserContext)

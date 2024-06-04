import { createContext, type JSX, type ReactNode, useContext, useLayoutEffect, useState } from 'react'

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

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(userStore.isAuthenticated)
  const [user, setUser] = useState<AuthUserProfileType>(userStore.user)
  const [isUserLoading, setUserLoading] = useState<boolean>(false)

  const login = async (data: LoginFormType) =>
    await query.post('/auth/login', { ...data }).then((res) => {
      setCookie('token', res.data.access_token)
      setUser(res.data.user)
      setIsAuthenticated(true)
      push('/dashboard')
    })

  const logout = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      try {
        deleteCookie('token')
        setIsAuthenticated(false)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }

  useLayoutEffect(() => {
    if (getCookie('token')) {
      setUserLoading(true)
      query
        .get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${getCookie('token')}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data)
            setIsAuthenticated(true)
          }
          setUserLoading(false)
        })
      setUserLoading(false)
      if (pathname === '/auth') push('/dashboard')
    } else {
      setIsAuthenticated(false)
      push('/auth')
    }
  }, [push, pathname])

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

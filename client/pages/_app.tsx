import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { ConfigProvider } from 'antd/lib'
import { queryClient } from '@/util/react-query-client'
import { QueryClientProvider } from '@tanstack/react-query'

import { DashboardLayout } from '@/layouts/dashboard.layout'

import UserProvider from '@/providers/user-provider'
import Provider from '@/providers'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  const layout = () => {
    if (pathname.includes('/dashboard')) {
      return (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      )
    }

    return <Component {...pageProps} />
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 6,
          fontSize: 16,
        },
      }}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Provider>{layout()}</Provider>
        </UserProvider>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

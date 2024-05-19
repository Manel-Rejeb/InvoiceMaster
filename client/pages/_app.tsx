import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { ConfigProvider } from 'antd/lib'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/util/react-query-client'

import { DashboardLayout } from '@/layouts/dashboard.layout'


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
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{}}>{layout()}</ConfigProvider>
    </QueryClientProvider>
  )
}

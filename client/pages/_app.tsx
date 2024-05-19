import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { useRouter } from 'next/router'

import { ConfigProvider } from 'antd/lib'
import { DashboardLayout } from '@/layout/dashboard.layout'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  if (pathname.includes('/dashboard')) {
    return (
      <ConfigProvider theme={{}}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ConfigProvider>
    )
  }

  return <ConfigProvider theme={{}} ><Component {...pageProps} /></ConfigProvider>
}

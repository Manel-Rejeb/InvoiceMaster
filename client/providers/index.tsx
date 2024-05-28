import type { JSX, ReactNode } from 'react'

import CustomerProvider from '@/providers/customer-provider'

interface ProviderProps {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  return <CustomerProvider>{children}</CustomerProvider>
}

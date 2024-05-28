import { type JSX, type ReactNode, useContext, createContext, useLayoutEffect, useState } from 'react'
import { CustomersStore, customersStore } from '@/providers/store/customer.store'

import { useQuery } from '@tanstack/react-query'

import { GET } from '@/actions/customer-actions'

interface ComponentProps {
  children: ReactNode
}

export default function CustomerProvider({ children }: ComponentProps): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: GET,
    staleTime: 0,
  })

  return (
    <CustomerContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </CustomerContext.Provider>
  )
}

const CustomerContext = createContext<CustomersStore>(customersStore)
export const disptachCustomer = () => useContext(CustomerContext)

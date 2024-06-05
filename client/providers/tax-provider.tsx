import { type JSX, type ReactNode, useContext, createContext } from 'react'
import { taxStore, TaxStore } from '@/providers/store/tax.store'

import { useQuery } from '@tanstack/react-query'

import { GET } from '@/actions/tax-action'

interface ComponentProps {
  children: ReactNode
}

export default function TaxProvider({ children }: ComponentProps): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['taxes'],
    queryFn: GET,
    staleTime: 0,
    initialData: [],
  })

  return (
    <TaxContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </TaxContext.Provider>
  )
}

const TaxContext = createContext<TaxStore>(taxStore)
export const disptachTax = () => useContext(TaxContext)

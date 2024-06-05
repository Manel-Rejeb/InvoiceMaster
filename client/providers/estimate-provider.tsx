import { type JSX, type ReactNode, useContext, createContext } from 'react'

import { EstimateStore, estimateStore } from '@/providers/store/estimate.store'
import { GET } from '@/actions/estimate-actions'
import { useQuery } from '@tanstack/react-query'

interface ComponentProps {
  children: ReactNode
}

export default function EstimateProvider({ children }: ComponentProps): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['estimates'],
    queryFn: GET,
    staleTime: 0,
    initialData: [],
  })

  return (
    <EstimateContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </EstimateContext.Provider>
  )
}

const EstimateContext = createContext<EstimateStore>(estimateStore)
export const disptachEstimate = () => useContext(EstimateContext)

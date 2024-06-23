import { FIND } from '@/actions/settings-actions'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext } from 'react'
import { settingStore, SettingStore } from './store/setting.store'

interface ComponentProps {
  children: ReactNode
}

export default function SettingProvider({ children }: ComponentProps): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: FIND,
    refetchOnMount: true,
  })

  return (
    <SettingContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </SettingContext.Provider>
  )
}

const SettingContext = createContext<SettingStore>(settingStore)
export const disptachSettings = () => useContext(SettingContext)

import type { JSX, ReactNode } from 'react'

import CustomerProvider from '@/providers/customer-provider'
import ProjectProvider from '@/providers/project-provider'
import TaxProvider from '@/providers/tax-provider'
import ArticleProvider from '@/providers/article-provider'
import EstimateProvider from '@/providers/estimate-provider'
import UserProvider from '@/providers/user-provider'
import SettingProvider from './setting-provider'

interface ProviderProps {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  return (
    <TaxProvider>
      <CustomerProvider>
        <ProjectProvider>
          <EstimateProvider>
            <ArticleProvider>
              <SettingProvider>
                <UserProvider>{children}</UserProvider>
              </SettingProvider>
            </ArticleProvider>
          </EstimateProvider>
        </ProjectProvider>
      </CustomerProvider>
    </TaxProvider>
  )
}

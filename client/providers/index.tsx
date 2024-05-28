import type { JSX, ReactNode } from 'react'

import CustomerProvider from '@/providers/customer-provider'
import ProjectProvider from '@/providers/project-provider'
import TaxProvider from '@/providers/tax-provider'
import ArticleProvider from '@/providers/article-provider'

interface ProviderProps {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps): JSX.Element {
  return (
    <CustomerProvider>
      <ProjectProvider>
        <TaxProvider>
          <ArticleProvider> {children}</ArticleProvider>
        </TaxProvider>
      </ProjectProvider>
    </CustomerProvider>
  )
}

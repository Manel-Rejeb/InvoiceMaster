import { type JSX, type ReactNode, useContext, createContext } from 'react'
import { articleStore, ArticleStore } from '@/providers/store/article.store'

import { useQuery } from '@tanstack/react-query'

import { GET } from '@/actions/article-actions'

interface ComponentProps {
  children: ReactNode
}

export default function ArticleProvider({ children }: ComponentProps): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['articles'],
    queryFn: GET,
    staleTime: 0,
    initialData: [],
  })

  return (
    <ArticleContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </ArticleContext.Provider>
  )
}

const ArticleContext = createContext<ArticleStore>(articleStore)
export const disptachArticle = () => useContext(ArticleContext)

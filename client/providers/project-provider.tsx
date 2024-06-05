import { type JSX, type ReactNode, useContext, createContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ProjectStore, projectStore } from '@/providers/store/project.store'

import { GET } from '@/actions/project-actions'

interface ComponentProps {
  children: ReactNode
}

export default function ProjectProvider({ children }: ComponentProps): JSX.Element {
  const { data, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: GET,
    staleTime: 0,
    initialData: [],
  })

  return (
    <ProjectContext.Provider
      value={{
        data,
        isLoading,
      }}>
      {children}
    </ProjectContext.Provider>
  )
}

const ProjectContext = createContext<ProjectStore>(projectStore)
export const disptachProject = () => useContext(ProjectContext)

type ProjectType = {
  id: number
  project_name: string
  project_description: string
  project_start_date: string
  project_end_date: string
  project_status: string
  createdAt: string
  updatedAt: string
  isSoftDelete: boolean
}

type ProjectFormType = Omit<ProjectType, 'createdAt' | 'updatedAt' | 'isSoftDelete'>

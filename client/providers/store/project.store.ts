export interface ProjectStore {
  isLoading: boolean
  data: ProjectType[]
}
export const projectStore: ProjectStore = {
  isLoading: false,
  data: [],
}

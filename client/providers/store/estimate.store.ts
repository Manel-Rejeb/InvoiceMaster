export interface EstimateStore {
  isLoading: boolean
  data: EstimateType[]
}

export const estimateStore: EstimateStore = {
  isLoading: false,
  data: [],
}

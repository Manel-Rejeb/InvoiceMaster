export interface TaxStore {
  isLoading: boolean
  data: TaxType[]
}

export const taxStore: TaxStore = {
  isLoading: false,
  data: [],
}

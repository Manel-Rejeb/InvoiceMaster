export interface CustomersStore {
  isLoading: boolean
  data: CustomerType[]
}

export const customersStore: CustomersStore = {
  isLoading: false,
  data: [],
}

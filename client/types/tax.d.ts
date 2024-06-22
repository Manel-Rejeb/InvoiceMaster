interface TaxType {
  id?: number
  tax_name: string
  tax_percentage: number
  tax_description: string
  isSoftDelete: string
  createdAt?: string
  updatedAt?: string
}

type TaxFormType = Omit<TaxType, 'createdAt' | 'updatedAt'>

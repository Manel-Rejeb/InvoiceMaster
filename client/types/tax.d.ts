interface TaxType {
  id?: number
  tax_name: string
  tax_percentage: number
  tax_description: string
  createdAt?: string
  updatedAt?: string
  isSoftDelete?: boolan
}

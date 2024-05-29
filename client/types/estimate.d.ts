interface EstimateType {
  id: number
  estimate_reference: string // estimate tableheader
  estimate_date: string
  estimate_expiary_date: string
  estimate_currency: string
  estimate_discount: number
  estimate_discount_type: boolean
  estimate_notes: string
  estimate_status: 'DRAFT' | 'PUBLISHED' | 'ACCEPTED' | 'REJECTED' | 'SENT' | 'VIEWED' | 'EXPIRED' | 'CONVERTED'
  estimate_total: number
  items: {
    id: number
    item_name: string
    item_reference: string
    item_price: number
    item_unit: string
    item_quantity: number
    item_tax: number
    item_discount: number
    item_discount_type: boolean
  }[]
  project?: ProjectType
  customer: CustomerType
  estimate_tax_per_item_enabled: boolean
  estimate_tax: number
  createdAt?: string
  udpatedAt?: string
}

type EstimateFormType = Omit<EstimateType, 'createdAt' | 'updatedAt'>

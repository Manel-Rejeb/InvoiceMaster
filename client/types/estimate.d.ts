interface EstimateType {
  id: number
  estimate_reference: string // estimate tableheader
  estimate_date: string
  estimate_expiary_date: string
  estimate_currency: string
  estimate_discount: number
  estimate_notes: string
  estimate_status: 'DRAFT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED' | 'CONVERTED'
  estimate_total: number
  items: ItemEstimateType[]
  project?: ProjectType
  customer: CustomerType
  estimate_tax: number
  createdAt?: string
  udpatedAt?: string
  invoice?: InvoiceType
}

interface ItemEstimateType {
  id: number
  item_price?: number
  item_quantity: number
  item_tax: number
  article?: ArticleType
}

interface InvoiceType {
  id?: number
  invoice_reference: string
  invoice_date: string
  invoice_due_date: string
  invoice_amount: number
  invoice_amount_paid: number
  invoice_amount_remaining: number
  invoice_payment_status: string
}

type EstimateFormType = Omit<EstimateType, 'createdAt' | 'updatedAt'>

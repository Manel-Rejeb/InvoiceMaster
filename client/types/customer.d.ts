interface CustomerType {
  id: number
  customer_email: string
  customer_contact_name: string
  customer_contact_last_name: string
  customer_reference: string
  customer_type: boolean
  customer_phone: string
  customer_country: string
  customer_city: string
  customer_address: string
  customer_zip: string
  createdAt?: string
  updatedAt?: string
  corporate: CorporateType
  projects: ProjectType[]
  estimates: EstimateType[]
}

interface CorporateType {
  id: number
  corporate_TIN: string
  corporate_industry: string
  corporate_website: string
  corporate_logo: string
  corporate_type: string
}

type CustomerFormType = Omit<CustomerType, 'createdAt' | 'updatedAt', 'customer_reference'>

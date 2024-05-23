type CustomerType = {
  id?: number
  type_customer: boolean
  customer_email: string
  customer_number: number
  customer_address: string
  customer_reference: string
  customer_city: string
  customer_country: string
  customer_zip: string
  createdAt: string
  updatedAt: string
  isSoftDelete: boolean
  corporate?: CorporateCustomerType
  individual?: IndividualCustomerType
}

type CorporateCustomerType = {
  id: number
  corporation_name: string
  tax_number: number
  industry: string
  headquarter_address: string
  contact_person_first_name: string
  contact_person_last_name: string
  contact_person_email: string
  contact_person_phone_number: string
  contact_person_job_title: string
}

type IndividualCustomerType = {
  id: number
  first_name: string
  last_name: string
}

interface OrgaConfig {
  id: string
  organization_name: string
  organization_email: string
  organization_phone: string
  organization_country: string
  organization_city: string
  organization_address: string
  organization_zip: string
  organization_TIN: string
  organization_industry: string
  organization_type: string
  organization_website: string
  organization_logo: string
  createdAt?: string
  updatedAt?: string
}

type OrgaConfig = Omit<OrgaConfig, 'createdAt' | 'updatedAt'>

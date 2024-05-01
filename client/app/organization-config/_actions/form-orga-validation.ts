'use client'

import * as yup from 'yup'

export const orgaConfigValidation = yup.object().shape({
  id: yup.string(),
  organization_name: yup.string().required('Organization name is required'),
  organization_email: yup.string().email().required('Organization email is required'),
  organization_phone: yup.string().required('Organization phone is required'),
  organization_logo: yup.string(),
  organization_tax_number: yup.string().required('Organization tax number is required'),
  organization_industry: yup.string().required('Organization industry is required'),
  organization_address: yup.string().required('Organization address is required'),
  organization_country: yup.string().required('Organization country is required'),
  organization_state: yup.string(),
  organization_zip: yup.string().required('Organization post code is required'),
})

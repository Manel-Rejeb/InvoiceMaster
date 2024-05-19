'use client'

import * as yup from 'yup'

export const taxFormValidation = yup.object().shape({
  id: yup.string(),
  tax_name: yup.string().required('Tax name is required'),
  tax_percentage: yup.string().required('Tax value is required'),
  tax_description: yup.string(),
  isSoftDelete: yup.boolean(),
})

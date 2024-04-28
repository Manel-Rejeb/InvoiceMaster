'use client'

import * as yup from 'yup'

export const formIndividualValidation = yup.object().shape({
  id: yup.string(),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  customer_number: yup.number().required('Phone number is required'),
  customer_email: yup.string().email('Invalid email').required('Email is required'),
  customer_address: yup.string().required('Address is required'),
  customer_country: yup.string().required('Country is required'),
  customer_city: yup.string().required('City is required'),
  customer_zip: yup.string().required('Postal code is required'),
  customer_reference: yup.string().required('Reference is required'),
  customer_type: yup.boolean().required(),
  isSoftDelete: yup.boolean(),
})

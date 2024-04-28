'use client'

import * as yup from 'yup'

export const formCoroprateValidation = yup.object().shape({
  id: yup.string(),
  corporation_name: yup.string().required('Corporate name is required'),
  customer_email: yup.string().email('Invalid email').required('Email is required'),
  customer_number: yup.number().required('Phone number is required'),
  customer_address: yup.string().required('Address is required'),
  customer_country: yup.string().required('Country is required'),
  customer_city: yup.string().required('City is required'),
  customer_zip: yup.string().required('Postal code is required'),
  customer_reference: yup.string().required('Reference is required'),
  tax_number: yup.string().required('Tax number is required'),
  industry: yup.string(),
  headquarter_address: yup.string(),
  contact_person_first_name: yup.string().required('First name is required'),
  contact_person_last_name: yup.string().required('Last name is required'),
  contact_person_email: yup.string().email('Invalid email').required('Email is required'),
  contact_person_phone_number: yup.number().required('Phone number is required'),
  contact_person_job_title: yup.string().required('Job title is required'),
  customer_type: yup.boolean().required(),
  isSoftDelete: yup.boolean(),
})

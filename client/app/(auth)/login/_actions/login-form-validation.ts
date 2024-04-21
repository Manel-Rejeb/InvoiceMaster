'use client'
import * as yup from 'yup'

export const loginFormValidation = yup.object().shape({
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(6, 'Password should be at least 8 characters'),
})

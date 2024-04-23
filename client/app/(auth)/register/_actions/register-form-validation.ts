'use client'
import * as yup from 'yup'

export const registerFormValisation = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(6, 'Password should be at least 6 characters'),
})

'use server'

import * as yup from 'yup'
import { loginFormValidation } from './login-form-validation'
import { cookies } from 'next/headers'

type AuthLogin = yup.InferType<typeof loginFormValidation>

export async function POST(data: AuthLogin): Promise<{ access_token: string }> {
  return await fetch('http://localhost:7080/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      cookies().set('token', data.access_token)
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function GET(): Promise<UserLoginType[]> {
  return await fetch('http://localhost:7080/auth/profile', {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function LOGOUT(): Promise<void> {
  cookies().delete('token')
}

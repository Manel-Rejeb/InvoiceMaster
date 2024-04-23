'use server'

import * as yup from 'yup'
import { registerFormValisation } from './register-form-validation'
import { cookies } from 'next/headers'

type AuthRegister = yup.InferType<typeof registerFormValisation>

export async function POST(data: AuthRegister): Promise<{ access_token: string }> {
  return await fetch('http://localhost:7080/auth/register', {
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

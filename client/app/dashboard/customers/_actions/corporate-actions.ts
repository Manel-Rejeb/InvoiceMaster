'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import { formCoroprateValidation } from './form-corporate-validation'

type CorporateForm = yup.InferType<typeof formCoroprateValidation>

export async function POST(corporate: CorporateForm): Promise<CorporateCustomerType> {
  return await fetch('http://localhost:7080/api/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(corporate),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/customers/corporate')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PATCH(id: string): Promise<CorporateCustomerType> {
  return await fetch(`http://localhost:7080/api/customer/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isSoftDelete: true }),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/customers/corporate')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<CorporateCustomerType> {
  return await fetch(`http://localhost:7080/api/customer/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message)
    })
}

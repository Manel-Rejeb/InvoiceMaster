'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import { formIndividualValidation } from './form-individual-valdiation'

type IndividualForm = yup.InferType<typeof formIndividualValidation>

export async function POST(individual: IndividualForm): Promise<IndividualCustomerType> {
  return await fetch('http://localhost:7080/api/customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(individual),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/customers')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PATCH(id: string): Promise<IndividualCustomerType> {
  return await fetch(`http://localhost:7080/api/customer/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isSoftDelete: true }),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/customers')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<IndividualCustomerType> {
  return await fetch(`http://localhost:7080/api/customer/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message)
    })
}

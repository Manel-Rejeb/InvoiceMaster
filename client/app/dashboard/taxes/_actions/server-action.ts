'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import { taxFormValidation } from './form-tax-validation'
import next from 'next'

type TaxForm = yup.InferType<typeof taxFormValidation>
export async function GET(): Promise<TaxType[]> {
  return await fetch(`http://localhost:7080/api/taxes`, {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(tax: TaxForm): Promise<TaxType> {
  return await fetch(`http://localhost:7080/api/taxes`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(tax),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/tax')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<TaxType> {
  return await fetch(`http://localhost:7080/api/taxes/${id}`, {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PATCH(id: string, tax: TaxForm): Promise<TaxType> {
  return await fetch(`http://localhost:7080/api/tax/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tax),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/taxes')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: string): Promise<ProjectType> {
  return await fetch(`http://localhost:7080/api/tax/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/taxes')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

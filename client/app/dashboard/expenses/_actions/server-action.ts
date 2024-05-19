'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import { expenseFormValidation } from '@/app/dashboard/expenses/_actions/form-expense-validation'

type ExpenseForm = yup.InferType<typeof expenseFormValidation>

export async function GET(): Promise<ExpenseType[]> {
  return await fetch('http://localhost:7080/api/expense', {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(expense: ExpenseForm): Promise<ExpenseType> {
  return await fetch('http://localhost:7080/api/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/expenses')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<ExpenseType> {
  return await fetch(`http://localhost:7080/api/expense/${id}`, {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PATCH(id: string, expense: ExpenseForm): Promise<ExpenseType> {
  return await fetch(`http://localhost:7080/api/expense/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/expenses')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: number): Promise<ExpenseType> {
  return await fetch(`http://localhost:7080/api/expense/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/expenses')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

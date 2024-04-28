'use server'

import { revalidatePath } from 'next/cache'

export async function GET(): Promise<CustomerType[]> {
  return await fetch('http://localhost:7080/api/customer', {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: number): Promise<CustomerType> {
  return await fetch(`http://localhost:7080/api/customer/${id}`, {
    method: 'DELETE',
    next: { revalidate: 0 },
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

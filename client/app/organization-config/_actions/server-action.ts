'use server'

import * as yup from 'yup'
import { orgaConfigValidation } from './form-orga-validation'
import { revalidatePath } from 'next/cache'

type OrganizationForm = yup.InferType<typeof orgaConfigValidation>

export async function POST(organization: OrganizationForm): Promise<OrganizationForm> {
  return await fetch('http://localhost:7080/api/organization', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organization),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/organization-config')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PATCH(id: string, organization: OrganizationForm): Promise<OrganizationForm> {
  return await fetch(`http://localhost:7080/api/organization/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(organization),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/organization-config')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<OrganizationForm> {
  return await fetch(`http://localhost:7080/api/organization/${id}`)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message)
    })
}

'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import { projectFormValidation } from './form-article-validation'

type ProjectForm = yup.InferType<typeof projectFormValidation>
export async function GET(): Promise<ProjectType[]> {
  return await fetch(`http://localhost:7080/api/project`, {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}
export async function POST(project: ProjectForm): Promise<ProjectType> {
  return await fetch(`http://localhost:7080/api/project`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/projects')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND(id: string): Promise<ProjectType> {
  return await fetch(`http://localhost:7080/api/project/${id}`, {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function PATCH(id: string, project: ProjectForm): Promise<ProjectType> {
  return await fetch(`http://localhost:7080/api/project/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/projects')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function DELETE(id: string): Promise<ProjectType> {
  return await fetch(`http://localhost:7080/api/project/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/projects')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

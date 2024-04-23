'use server'

import * as yup from 'yup'
import { revalidatePath } from 'next/cache'
import { articleFormValidation } from './form-article-validation'

type ArticleForm = yup.InferType<typeof articleFormValidation>

export async function GET(): Promise<ArticleType[]> {
  return await fetch('http://localhost:7080/api/article', {
    method: 'GET',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function POST(article: ArticleForm): Promise<ArticleType> {
  return await fetch('http://localhost:7080/api/article', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      throw new Error(err.message)
    })
}

export async function FIND() {}

export async function PUT() {}

export async function DELETE(id: number): Promise<ArticleType> {
  return await fetch(`http://localhost:7080/api/article/${id}`, {
    method: 'DELETE',
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .then((data) => {
      revalidatePath('/dashboard/article')
      return data
    })
    .catch((err) => {
      throw new Error(err.message)
    })
}

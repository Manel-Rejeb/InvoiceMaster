import { query } from '@/util/query'

export const GET = async () => await query.get('api/article').then((res) => res.data)

export const FIND = async (id: string) => await query.get(`api/article/${id}`).then((res) => res.data)

export const POST = (data: ArticleFormType) => query.post('api/article', { ...data })

export const PATCH = (id: string, data: ArticleFormType) => query.patch(`api/article/${id}`, { ...data })

export const DELETE = (id: string) => query.delete(`api/article/${id}`)
